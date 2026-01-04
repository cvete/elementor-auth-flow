'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AuthLayout from "@/components/AuthLayout";
import AuthForm, { FormField } from "@/components/AuthForm";
import { toast } from "@/components/ui/use-toast";
import SocialLoginButtons from "@/components/SocialLoginButtons";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { language } = useLanguage();
  const t = getTranslation(language);

  const fields: FormField[] = [
    {
      id: "email",
      label: t.email,
      type: "email",
      placeholder: "name@company.com",
      icon: "mail",
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: t.emailInvalid
      }
    },
    {
      id: "password",
      label: t.password,
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

      console.log("Login result:", result);

      if (result?.error) {
        toast({
          title: t.loginFailed,
          description: "Invalid email or password",
          variant: "destructive",
        });
        return;
      }

      if (!result?.ok) {
        toast({
          title: t.loginFailed,
          description: "Invalid email or password",
          variant: "destructive",
        });
        return;
      }

      // Redirect to dashboard after successful login
      // Use window.location for a full page reload to ensure session is loaded
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: t.loginFailed,
        description: error.message || t.somethingWentWrong,
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
            {t.rememberMe}
          </label>
        </div>
        <div className="text-sm">
          <Link href="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
            {t.forgotPassword}
          </Link>
        </div>
      </div>
      <p>
        {t.noAccount}{" "}
        <Link href="/register" className="font-medium text-purple-600 hover:text-purple-500">
          {t.registerHere}
        </Link>
      </p>
    </>
  );

  return (
    <AuthLayout
      title={t.loginTitle}
      subtitle={t.loginSubtitle}
    >
      <SocialLoginButtons />
      <AuthForm
        fields={fields}
        submitText={isLoading ? t.signingIn : t.signIn}
        onSubmit={handleSubmit}
        footer={footer}
      />
    </AuthLayout>
  );
}
