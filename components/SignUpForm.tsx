"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignUpForm() {
  const SignUpSchema = z
    .object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(3).max(20),
      confirmPassword: z.string().min(3).max(20),
    })
    .superRefine((val, ctx) => {
      if (val.password !== val.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords are not the same",
          path: ["confirmPassword"],
        });
      }
    });

  type SignUpSchemaType = z.infer<typeof SignUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          {...register("name")}
        />
        {errors.name && (
          <span className="block mt-2 text-sm text-red-500">
            {errors.name.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <span className="block mt-2 text-sm text-red-500">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && (
          <span className="block mt-2 text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="block mt-2 text-sm text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
