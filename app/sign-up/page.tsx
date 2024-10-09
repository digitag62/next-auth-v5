import React from "react";
import { FormSignup } from "@/components/form-signup";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="flex flex-col gap-2 items-center">
        <h2>Sign up</h2>
        <FormSignup />
      </main>
    </div>
  );
};

export default SignUp;
