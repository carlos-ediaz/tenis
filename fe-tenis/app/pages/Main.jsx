import React from 'react'
import { Link } from "@nextui-org/link";
import { title, subtitle } from "@/components/primitives";
import { button as buttonStyles } from "@nextui-org/theme";

export default function Main() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title()}>Join to&nbsp;</h1>
            <h1 className={title({ color: "violet" })}>tennis tournaments&nbsp;</h1>
            <br />
            <h1 className={title()}>
                when you want.
            </h1>
            <h2 className={subtitle({ class: "mt-4" })}>
                If it is your first time, signup.
            </h2>
        </div>

        <div className="flex gap-3">
            <Link
                isExternal
                onClick={() => router.push('/signin')}
                className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
            >
                Sign In
            </Link>
            <Link
                isExternal
                onClick={() => router.push('/signup')}
                className={buttonStyles({ variant: "bordered", radius: "full" })}
            >
                Sign Up
            </Link>
        </div>
    </section>
  )
}
