
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import AuthForm, { FormField } from "@/components/AuthForm";
import { toast } from "@/components/ui/use-toast";
import SocialLoginButtons from "@/components/SocialLoginButtons";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fields: FormField[] = [
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "name@company.com",
      icon: "mail",
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: "Please enter a valid email address"
      }
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
      icon: "lock",
      validation: {
        required: true
      }
    }
  ];

  const handleSubmit = (data: Record<string, string>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Login data:", data);
      
      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const footer = (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <Link to="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
            Forgot your password?
          </Link>
        </div>
      </div>
      <p>
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
          Register here
        </Link>
      </p>
    </>
  );

  return (
    <AuthLayout 
      title="Sign in to your account" 
      subtitle="Enter your credentials to access your account"
    >
      <SocialLoginButtons />
      <AuthForm
        fields={fields}
        submitText={isLoading ? "Signing In..." : "Sign In"}
        onSubmit={handleSubmit}
        footer={footer}
      />
    </AuthLayout>
  );
};

export default Login;
