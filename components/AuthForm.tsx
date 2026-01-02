'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, UserRound, Mail, Lock } from "lucide-react";

export interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: "user" | "mail" | "lock";
  validation?: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    patternMessage?: string;
  };
}

interface AuthFormProps {
  fields: FormField[];
  submitText: string;
  onSubmit: (data: Record<string, string>) => void;
  footer: React.ReactNode;
}

const AuthForm = ({ fields, submitText, onSubmit, footer }: AuthFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const getIcon = (icon: string) => {
    switch (icon) {
      case "user":
        return <UserRound className="h-4 w-4 text-gray-500" />;
      case "mail":
        return <Mail className="h-4 w-4 text-gray-500" />;
      case "lock":
        return <Lock className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateField = (field: FormField, value: string): string => {
    const { validation } = field;
    if (!validation) return "";

    if (validation.required && !value) {
      return `${field.label} is required`;
    }

    if (validation.minLength && value.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`;
    }

    if (validation.pattern && !validation.pattern.test(value)) {
      return validation.patternMessage || `${field.label} is invalid`;
    }

    return "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      const error = validateField(field, formData[field.id] || "");
      if (error) {
        newErrors[field.id] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="space-y-1">
            <Label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
              {field.label}
            </Label>
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {getIcon(field.icon)}
              </div>

              <Input
                id={field.id}
                name={field.id}
                type={field.type === "password" && showPassword[field.id] ? "text" : field.type}
                placeholder={field.placeholder}
                className={`block w-full pl-10 ${errors[field.id] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'}`}
                value={formData[field.id] || ""}
                onChange={handleChange}
              />

              {field.type === "password" && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(field.id)}
                    className="text-gray-500 focus:outline-none"
                  >
                    {showPassword[field.id] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              )}
            </div>
            {errors[field.id] && (
              <p className="text-xs text-red-500 mt-1">{errors[field.id]}</p>
            )}
          </div>
        ))}
      </div>

      <Button
        type="submit"
        className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-md focus:ring-4 focus:ring-purple-300 transition duration-300"
      >
        {submitText}
      </Button>

      <div className="text-center text-sm text-gray-600 mt-4">
        {footer}
      </div>
    </form>
  );
};

export default AuthForm;
