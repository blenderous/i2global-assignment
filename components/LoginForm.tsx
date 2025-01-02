"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().nonempty({ message: "Password is required" }),
  });

  type LoginSchemaType = z.infer<typeof LoginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <Button type="submit" className="w-full">
        Login
      </Button>
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
