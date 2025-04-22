
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import AuthForm, { FormField } from "@/components/AuthForm";
import { toast } from "@/components/ui/use-toast";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fields: FormField[] = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      icon: "user",
      validation: {
        required: true,
        minLength: 2
      }
    },
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
        required: true,
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        patternMessage: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
      }
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
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
    
    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Password Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      console.log("Registration data:", data);
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const footer = (
    <>
      <div className="mb-4 text-xs text-gray-600 text-left">
        By registering, you agree to our{" "}
        <Link to="/terms" className="font-medium text-purple-600 hover:text-purple-500">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy" className="font-medium text-purple-600 hover:text-purple-500">
          Privacy Policy
        </Link>
        .
      </div>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
          Sign in here
        </Link>
      </p>
    </>
  );

  return (
    <AuthLayout 
      title="Create your account" 
      subtitle="Register with your details to get started"
    >
      <AuthForm
        fields={fields}
        submitText={isLoading ? "Creating Account..." : "Create Account"}
        onSubmit={handleSubmit}
        footer={footer}
      />
    </AuthLayout>
  );
};

export default Register;
