import React from "react";
import { FormSignin } from "@/components/form-signin";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="flex flex-col gap-2 items-center">
        <h2>Sign in</h2>
        <FormSignin />
        <p>or</p>
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <Button type="submit">Signin with GitHub</Button>
        </form>
        
      </main>
    </div>
  );
};

export default SignIn;
