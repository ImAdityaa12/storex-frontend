"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Loader } from "lucide-react";
import { toast } from "sonner";
import { setCookie } from "@/lib/cookieFunction";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    phoneOremail: string;
    password: string;
  }>({
    phoneOremail: "",
    password: "",
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneOrEmail: formData.phoneOremail,
          password: formData.password,
        }),
        credentials: "include",
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      setCookie("token", data?.token);
      window.location.href = "/shop";
      toast.success(data?.message);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error(data?.message);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="sm:min-w-[500px] max-sm:w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Phone / Email</Label>
              <Input
                id="email"
                // type="email"
                placeholder="m@example.com or 9517234567"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) =>
                  setFormData({ ...formData, phoneOremail: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="password">Password</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="password"
                  type={visible ? "text" : "password"}
                  disabled={isLoading}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <span
                  className="text-muted-foreground cursor-pointer"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <Eye /> : <EyeOff />}
                </span>
              </div>
            </div>
            <Button className="w-full mt-4" type="submit" disabled={isLoading}>
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="bg-blue-500 px-3 py-1 text-black rounded-xl hover:bg-blue-600 transition duration-300 inline-block"
            >
              Create New Account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
