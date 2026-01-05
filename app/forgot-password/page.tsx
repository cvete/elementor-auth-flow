'use client';

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import AuthForm, { FormField } from "@/components/AuthForm";
import { toast } from "@/components/ui/use-toast";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    }
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Password Reset Link Sent",
          description: result.message || "If an account exists with this email, you'll receive a password reset link.",
        });
        setIsSubmitted(true);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send reset link. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending password reset:", error);
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

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a reset link"
    >
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-100 rounded-md p-6 mt-8">
          <div className="flex flex-col items-center text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">Check your email</h3>
            <p className="mt-2 text-sm text-gray-500">
              We've sent a password reset link to your email address.
            </p>
            <div className="mt-6">
              <Link
                href="/login"
                className="text-sm font-medium text-purple-600 hover:text-purple-500"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <AuthForm
          fields={fields}
          submitText={isLoading ? "Sending Reset Link..." : "Send Reset Link"}
          onSubmit={handleSubmit}
          footer={footer}
        />
      )}
    </AuthLayout>
  );
}
