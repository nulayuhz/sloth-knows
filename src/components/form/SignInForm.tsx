"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";

// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  //   .min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
  password: z.string().min(1, "Password is required"),
});

function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    console.log(signInData);
    if (signInData?.error) {
      console.log(signInData.error);
    } else {
      router.replace("/admin");
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full mt-6" type="submit">
          Sign In
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly">
        or
      </div>
      <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don't have an account, please{" "}
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          sign up
        </Link>
      </p>
    </Form>
  );
}

export default SignInForm;
