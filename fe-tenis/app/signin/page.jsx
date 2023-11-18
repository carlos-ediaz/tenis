'use client' 

import { useContext, useState } from 'react';
import { title } from "@/components/primitives";
import {Button, Divider, Input} from "@nextui-org/react";
import { ErrorMessage, Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import React from "react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";
import UserContext from '../context/UserContext';

const signInSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: "Must be 8 or more characters long" }),
    })
const initialValues = {
    email: '',
    password: '',
    }
    
export default function SignInPage() {
    const { user, setUser } = useContext(UserContext);
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<div>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(false);
                    console.log(values);
                    setUser(
                        values
                    )
                }}
                validationSchema={toFormikValidationSchema(signInSchema)}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
                    <>
                        <h1 className={title()}>Sign In</h1>
                        <Divider className="my-4" />
                        <Form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
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
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                            />
                            <Button type="submit" disabled={isSubmitting}>SIGN IN</Button>

                        </Form>
                    </>
                )}
            </Formik>
		</div>
	);
}
