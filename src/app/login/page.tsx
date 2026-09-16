import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Suspense } from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Login;
