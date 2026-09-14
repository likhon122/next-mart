"use client";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginValidationSchema } from "./loginValidation";
import { toast } from "sonner";
import { loginUser, verifyRecaptcha } from "@/services/authService";
import { recaptchaClientKey } from "@/app/config";
import { useState } from "react";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginValidationSchema)
  });

  const [recaptchaValue, setRecaptchaValue] = useState(false);
  const { isSubmitting } = form.formState;

  const handleRecaptcha = async (value: string | null) => {
    if (value) {
      const recaptchaResponse = await verifyRecaptcha(value);
      if (recaptchaResponse.success) {
        setRecaptchaValue(true);
      }
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await loginUser(data);
      if (response.success) {
        toast.success(response.message || "Login successful");
      } else {
        toast.error(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during Login. Please try again.");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <ReCAPTCHA sitekey={recaptchaClientKey} onChange={handleRecaptcha} />

          <Button disabled={isSubmitting || !recaptchaValue} type="submit">
            {isSubmitting ? "Loading..." : "Login"}
          </Button>
        </form>
        <p className="text-sm text-gray-600 text-center my-3">
          Do&apos;t have an account ?
          <Link href="/register" className="text-primary">
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default LoginForm;
