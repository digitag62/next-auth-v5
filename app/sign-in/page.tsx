import React from "react";
import { FormSignin } from "@/components/form-signin";

const SignIn = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="flex flex-col gap-2 items-center">
        <h2>Sign in</h2>
        <FormSignin />
      </main>
    </div>
  );
};

export default SignIn;
