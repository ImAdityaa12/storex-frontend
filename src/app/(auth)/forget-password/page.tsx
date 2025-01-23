"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState<"email" | "otp" | "reset">("email");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}users/forgot-password`,
        { email }
      );
      setStage("otp");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to send OTP");
      setIsLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}users/verify-otp`,
        { email, otp }
      );
      setStage("reset");
    } catch (err) {
      console.log(err);
      setError("Invalid OTP");
    }
  };

  const resetPassword = async (newPassword: string) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}users/reset-password`,
        { email, newPassword }
      );
      router.push("/login");
    } catch (err) {
      console.log(err);
      setError("Password reset failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {stage === "email" && (
        // <div>
        //   <input
        //     type="email"
        //     value={email}
        //     onChange={(e) => setEmail(e.target.value)}
        //     placeholder="Enter your email"
        //   />
        //   <button onClick={sendOtp}>Send OTP</button>
        // </div>
        <Card className="max-sm:max-w-[350px] w-[500px]">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription>
              Enter your email to receive a one-time password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={sendOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {stage === "otp" && (
        // <div>
        //   <input
        //     type="text"
        //     value={otp}
        //     onChange={(e) => setOtp(e.target.value)}
        //     placeholder="Enter OTP"
        //   />
        //   <button onClick={verifyOtp}>Verify OTP</button>
        // </div>
        <Card className="max-sm:max-w-[350px] w-[500px]">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription>Enter the OTP sent to your email</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={verifyOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">One-Time Password</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Verify OTP"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {stage === "reset" && <ResetPasswordForm onReset={resetPassword} />}

      {error && <p>{error}</p>}
    </div>
  );
}

// Separate component for password reset
function ResetPasswordForm({
  onReset,
}: {
  onReset: (password: string) => void;
}) {
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const handleSubmit = () => {
  //   if (newPassword !== confirmPassword) {
  //     setPasswordError("Passwords do not match");
  //     return;
  //   }
  //   onReset(newPassword);
  // };
  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
    } else if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      // Here you would typically call an API to reset the password
      onReset(newPassword);
      setPasswordError("");
      // Clear the form
      setNewPassword("");
      setConfirmPassword("");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    // <div>
    //   <input
    //     type="password"
    //     value={newPassword}
    //     onChange={(e) => setNewPassword(e.target.value)}
    //     placeholder="New Password"
    //   />
    //   <input
    //     type="password"
    //     value={confirmPassword}
    //     onChange={(e) => setConfirmPassword(e.target.value)}
    //     placeholder="Confirm Password"
    //   />
    //   <button onClick={handleSubmit}>Reset Password</button>
    //   {passwordError && <p>{passwordError}</p>}
    // </div>
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <div className="relative">
            <Input
              id="new-password"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <Button onClick={handleSubmit} className="w-full">
          Reset Password
        </Button>
        {passwordError && (
          <Alert variant="destructive" className="w-full">
            <AlertDescription>{passwordError}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
