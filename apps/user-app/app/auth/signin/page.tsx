"use client";
import { useState } from "react";

import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [phone, setPhone] = useState("0");
  const [password, setPassword] = useState("");

  const create = async () => {
    return signIn("credentials", {
      phone,
      password,
      redirect: true,
      callbackUrl: callbackUrl || "localhost:3000/dashboard",
    });
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="mx-auto min-w-[300px] max-w-[500px]">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>Enter your phone number to login</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" type="number" required onChange={e=>setPhone(e.target.value)}/>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required   onChange={e=>setPassword(e.target.value)}/>
            </div>
            <Button type="submit" className="w-full" onClick={create}>
              Login
            </Button>
          </div>
          {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
