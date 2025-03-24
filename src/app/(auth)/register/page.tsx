"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/cookieFunction";

// Zod schema for the first step
const firstStepSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Zod schema for the second step
const secondStepSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

// Combined schema for the entire form
const formSchema = firstStepSchema.merge(secondStepSchema);

type FormData = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: FormData) => {
    const isValid = await trigger();
    const toastId = toast.loading("Registering...");
    if (isValid) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}users/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: data.userName,
              email: data.email,
              password: data.password,
              image: image || null,
              role: "user",
              name: data.name,
              phoneNumber: data.phoneNumber,
            }),
            credentials: "include",
          }
        );
        const responseJson = await response.json();
        if (response.ok) {
          setCookie("token", responseJson?.token);
          toast.success(responseJson?.message, { id: toastId });
          router.push("/shop");
        } else {
          toast.error(responseJson?.message, { id: toastId });
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An error occurred during registration",
          { id: toastId }
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNext = async () => {
    const touchedFirstStepFields = Object.keys(touchedFields).filter((field) =>
      ["userName", "email", "password"].includes(field)
    );
    const isValid = await trigger(
      touchedFirstStepFields as Array<keyof FormData>,
      {
        shouldFocus: true,
      }
    );
    if (isValid) setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append("image", file);

      const message = toast.loading("Uploading image...");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}upload/image`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Image upload failed");
        }

        const data = await response.json();
        setImage(data?.result?.url);
        toast.success("Image uploaded successfully", {
          id: message,
          duration: 3000,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image", { id: message, duration: 3000 });
      }
    }
  };

  const fadeInOut = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <Card className="sm:min-w-[500px] max-sm:w-full">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" {...fadeInOut}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="userName">Username</Label>
                      <Input id="userName" {...register("userName")} />
                      {touchedFields.userName && errors.userName && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {errors.userName.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register("email")} />
                      {touchedFields.email && errors.email && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {errors.email.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        {...register("password")}
                      />
                      {touchedFields.password && errors.password && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {errors.password.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                  <Button
                    className="mt-4 w-full"
                    onClick={handleNext}
                    type="button"
                  >
                    Next
                  </Button>
                </motion.div>
              ) : (
                <motion.div key="step2" {...fadeInOut}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Firm Name</Label>
                      <Input id="name" {...register("name")} />
                      {touchedFields.name && errors.name && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {errors.name.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input id="phoneNumber" {...register("phoneNumber")} />
                      {touchedFields.phoneNumber && errors.phoneNumber && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {errors.phoneNumber.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="image">Image</Label>
                      <Input
                        id="image"
                        type="file"
                        onChange={handleImageUpload}
                      />
                      {imagePreview && (
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="mt-2 max-w-full h-auto"
                        />
                      )}
                      {touchedFields.image && errors.image && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {errors.image.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      type="button"
                    >
                      Back
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Registering..." : "Register"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
