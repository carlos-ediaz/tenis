'use client' 
import { activateUser } from "@/app/api/users";
import { title } from "@/components/primitives";
import { useParams } from "next/navigation";
import {Card, CardBody} from "@nextui-org/react";
import {Spinner} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ActivatePage() {
  const params = useParams();
  const {token} = params;

  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function activate(userToken) {
    setLoading(true);
    setError('');

    try {
      await activateUser(userToken);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (token) {
      activate(token);
    }
  }, [token]);

  return (
    <div className="d-flex align-items-center flex-column pt-3">
      <h1 className={title()}>Account activation</h1>
      {error && 
        <Card>
          <CardBody>
            <p>{error}</p>
          </CardBody>
        </Card>
      }
      {
        loading ? (
          <Spinner size="lg" />
        ) : success ? (
          <p className="d-flex mb-5">
            🎉 Your account has been activated. Go to {' '}🎉
            <Link href="/signin" isBlock showAnchorIcon color="primary" >Sign In</Link>
          </p>
        ): (
          <p>Your account could not be activated, verify your email</p>
        )
      }

    </div>
  );
}