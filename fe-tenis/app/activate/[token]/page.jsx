'use client' 
import { title } from "@/components/primitives";
import { useParams } from "next/navigation";

export default function ActivatePage() {
  const params = useParams();
  const {token} = params;

  return (
    <div className="d-flex align-items-center flex-column pt-3">
      <h1 className={title()}>Account activated</h1>
      <p className="d-flex mb-5">🎉 Your account has been created 🎉</p>
      <p className="fw-light text-nexus-dark">
        We have sent an email to -
        <strong className="text-nexus-accent"></strong>- to confirm the
        validity of your email address. After receiving the email follow the
        link provided to complete your registration proccess.
      </p>
    </div>
  );
}