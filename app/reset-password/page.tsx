'use client';

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import AuthForm, { FormField } from "@/components/AuthForm";
import { toast } from "@/components/ui/use-toast";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false);
        setIsValidToken(false);
        return;
      }

      try {
        const response = await fetch(`/api/reset-password?token=${token}`);
        const result = await response.json();

        if (result.valid) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
          toast({
            title: "Invalid Token",
            description: "This password reset link is invalid or has expired.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setIsValidToken(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const fields: FormField[] = [
    {
      id: "password",
      label: "New Password",
      type: "password",
      placeholder: "Enter your new password",
      icon: "lock",
      validation: {
        required: true,
        minLength: 8
      }
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your new password",
      icon: "lock",
      validation: {
        required: true,
        minLength: 8
      }
    }
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: data.password
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been reset. You can now log in with your new password.",
        });
        setIsSuccess(true);

        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to reset password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const footer = (
    <p>
      Remember your password?{" "}
      <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
        Back to login
      </Link>
    </p>
  );

  if (isValidating) {
    return (
      <AuthLayout
        title="Reset Your Password"
        subtitle="Validating your reset link..."
      >
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </AuthLayout>
    );
  }

  if (!token || !isValidToken) {
    return (
      <AuthLayout
        title="Invalid Reset Link"
        subtitle="This password reset link is invalid or has expired"
      >
        <div className="bg-red-50 border border-red-100 rounded-md p-6 mt-8">
          <div className="flex flex-col items-center text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">Invalid or Expired Link</h3>
            <p className="mt-2 text-sm text-gray-500">
              This password reset link is no longer valid. Please request a new one.
            </p>
            <div className="mt-6 space-x-4">
              <Link
                href="/forgot-password"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                Request New Link
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium text-purple-600 hover:text-purple-500"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (isSuccess) {
    return (
      <AuthLayout
        title="Password Reset Successful"
        subtitle="Your password has been changed"
      >
        <div className="bg-green-50 border border-green-100 rounded-md p-6 mt-8">
          <div className="flex flex-col items-center text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">Password Changed Successfully</h3>
            <p className="mt-2 text-sm text-gray-500">
              You can now log in with your new password. Redirecting to login...
            </p>
            <div className="mt-6">
              <Link
                href="/login"
                className="text-sm font-medium text-purple-600 hover:text-purple-500"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your new password below"
    >
      <AuthForm
        fields={fields}
        submitText={isLoading ? "Resetting Password..." : "Reset Password"}
        onSubmit={handleSubmit}
        footer={footer}
      />
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <AuthLayout
        title="Reset Your Password"
        subtitle="Loading..."
      >
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </AuthLayout>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
