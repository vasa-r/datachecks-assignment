"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoughNotation } from "react-rough-notation";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import BtnLoader from "@/components/btn-loader";
import { useRouter } from "next/navigation";
import { registerUser } from "@/api/auth";

const signupSchema = z
  .object({
    fullName: z.string().min(7, "Please provide full name"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setLoading(true);
    const { fullName, email, password } = data;

    try {
      const response = await registerUser(fullName, email, password);
      console.log(response);
      if (response.success && response.data) {
        toast.success(response.data?.message || "Signup successful!");
        router.push("signin");
      } else {
        toast.error(response.data.message || "Signup failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          Create your{" "}
          <RoughNotation
            type="highlight"
            animate
            show
            color="#009689"
            animationDuration={1000}
            key={Object.keys(errors).length}
          >
            <span className="font-merienda text-2xl text-white font-bold">
              Blogi
            </span>
          </RoughNotation>{" "}
          Account
        </h1>
        <p className="text-muted-foreground text-sm text-center">
          Enter your details below to get started
        </p>
      </div>

      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="userName">Full Name</Label>
          <Input
            id="userName"
            type="text"
            placeholder="john_104"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="error">{errors.fullName.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Enter same password again"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full mt-3" disabled={loading}>
          {loading ? <BtnLoader /> : "Sign Up"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/signin">
          <RoughNotation
            type="underline"
            animate
            show
            color="#009689"
            strokeWidth={2}
            animationDuration={700}
            key={Object.keys(errors).length}
          >
            Sign In
          </RoughNotation>
        </Link>
      </div>
    </form>
  );
}
