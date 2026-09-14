"use client";
import { Button } from "@/components/ui/button";
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
import { registerValidationSchema } from "./registerValidation";
import { toast } from "sonner";
import { registerUser } from "@/services/authService";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerValidationSchema)
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await registerUser(data);
      if (response.success) {
        toast.success(response.message || "Registration successful");
      } else {
        toast.error(
          response.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      toast.error("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    placeholder="Name"
                    type="text"
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
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Register"}
          </Button>
        </form>
        <p className="text-sm text-gray-600 text-center my-3">
          Already have an account ?
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default RegisterForm;
