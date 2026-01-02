'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AuthLayout from "@/components/AuthLayout";
import AuthForm, { FormField } from "@/components/AuthForm";
import { toast } from "@/components/ui/use-toast";
import SocialLoginButtons from "@/components/SocialLoginButtons";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (data: Record<string, string>) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
      });

      // Redirect to dashboard after successful login
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Failed to log in. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          <Link href="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
            Forgot your password?
          </Link>
        </div>
      </div>
      <p>
        Don't have an account?{" "}
        <Link href="/register" className="font-medium text-purple-600 hover:text-purple-500">
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
}
