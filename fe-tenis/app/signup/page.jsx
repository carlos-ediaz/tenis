'use client' 

import { useState } from 'react';
import { title } from "@/components/primitives";
import {Button, Divider, Input} from "@nextui-org/react";
import { ErrorMessage, Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import React from "react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";

const signUpSchema = z
    .object({
        name: z.string().min(3, { message: "Must be 3 or more characters long" }),
        lastname: z.string().min(3, { message: "Must be 3 or more characters long" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: "Must be 8 or more characters long" }),
        confirmpassword: z.string(),
    })
    .refine((data) => data.confirmpassword === data.password, {
        path: ["confirmpassword"],
        message: "Passwords don't match"
      })
const initialValues = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    }
    
export default function SignUpPage() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<div>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(false);
                    console.log(values)
                }}
                validationSchema={toFormikValidationSchema(signUpSchema)}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
                    <>
                        <h1 className={title()}>Sign Up</h1>
                        <Divider className="my-4" />
                        <Form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
                            <Input 
                                type="text"
                                name="name" 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                value={values.name} 
                                label="Name" 
                                className={` mt-3 ${touched.name && errors.name ? 'is-invalid invalid-feedback' : ''}`}
                                errorMessage={errors.name}
                                placeholder="Enter your name" />
                            <Input 
                                type="text"
                                name="lastname" 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                value={values.lastname} 
                                label="Lastname" 
                                className={` mt-3 ${touched.lastname && errors.lastname ? 'is-invalid invalid-feedback' : ''}`}
                                errorMessage={errors.lastname}
                                placeholder="Enter your lastname" />
                            <Input 
                                type="email"
                                name="email" 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                value={values.email} 
                                label="Email" 
                                className={` mt-3 ${touched.email && errors.email ? 'is-invalid invalid-feedback' : ''}`}
                                errorMessage={errors.email}
                                placeholder="Enter your email" />
                            <Input
                                label="Password"
                                name="password"
                                variant="bordered"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password} 
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                                className={`max-w-xs ${touched.email && errors.email ? 'is-invalid invalid-feedback' : ''}`}
                                errorMessage={errors.password}
                            />
                            <Input
                                label="Confirm Password"
                                name="confirmpassword"
                                variant="bordered"
                                placeholder="Confirm you password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmpassword} 
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                                className={`max-w-xs ${touched.confirmpassword && errors.confirmpassword ? 'is-invalid invalid-feedback' : ''}`}
                                errorMessage={errors.confirmpassword}
                            />

                            <Button type="submit" disabled={isSubmitting}>SIGN UP</Button>

                        </Form>
                    </>
                )}
            </Formik>
		</div>
	);
}
