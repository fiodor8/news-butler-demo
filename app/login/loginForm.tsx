"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"

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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Toaster } from '@/components/ui/sonner'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: "This field has to be filled.",
        })
        .email("This is not a valid email")
        .max(300, {
            message: "Password can't be longer than 300 characters.",
        }),
    password: z
        .string()
        .min(6, { message: "Password has to be at least 6 characters long." }),
    rememberMe: z.
        boolean(),
});

const LoginForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        },
    });

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {

        setIsLoading(true)

        const response = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });

        if (!response?.error) {
            setIsLoading(false)
            toast.success("You are now signed in!");
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } else {
            setIsLoading(false)
            toast.error("Wrong email or password")
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <h1 className="text-3xl font-semibold">Login to NewsButler</h1>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
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
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem className="flex flex-row pl-2 py-2 space-x-2 space-y-0 rounded-md items-center">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Remember me
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-full'>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Login</Button>
                    <Button variant="link" className="ml-4 p-0 m-0"><Link href="/signup" className="">Haven&apos;t registered yet?</Link></Button>
                </form>
            </Form>
            <Toaster />
        </>
    );
};

export default LoginForm