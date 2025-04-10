"use client";

// Packages
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

// Local imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { loginWithEmailAndPassword, ServerResType } from "@/actions/login";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string(),
});

export default function LoginForm() {
  const [loading, setLoading] = useState<true | false>(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    startTransition(() => {
      loginWithEmailAndPassword(values)
        .then((res: ServerResType) => {
          console.log(res);
          if (res.success) {
            setLoading(true);
            toast.success("Login successfull 🎉", {
              position: "bottom-right",
              richColors: true,
            });
            router.push("/");
            router.refresh();
          } else {
            toast.error(res.message, {
              position: "top-right",
              richColors: true,
            });
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "top-right",
            richColors: true,
          });
        });
    });
  }

  return (
    <div className="mt-[40px]">
      {/* <SocialLogin /> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-[16px] pt-[24px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-[14px] font-medium leading-[16.94px] text-[#111827]">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@gmail.com"
                    className="h-[48px] rounded-[10px] border-[1px] border-[#F4F0EB] font-inter"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-[14px] font-medium leading-[16.94px] text-[#111827]">
                  Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter Password"
                    {...field}
                    className="h-[48px] rounded-[10px] border-[1px] border-[#F4F0EB] font-inter"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Link
              href="/onboarding/forget-password"
              className="font-inter text-[14px] font-medium leading-[16.94px] text-[#1D3557] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="relative mt-[24px] h-[48px] w-full rounded-[10px] bg-[#1D3557] transition-colors duration-300 hover:bg-[#1D3557]/90 disabled:opacity-60"
            disabled={loading || isPending}
          >
            Log In
            {loading ||
              (isPending && (
                <Loader2 className="absolute right-5 animate-spin" />
              ))}
          </Button>
        </form>
      </Form>
    </div>
  );
}
