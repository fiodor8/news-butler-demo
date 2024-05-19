'use client'

import { useRouter } from 'next/navigation'

import React, { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"
import Link from 'next/link'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { Toaster } from '@/components/ui/sonner'
import { toast } from "sonner";

const formSchema = z
    .object({
        name: z
            .string()
            .min(1, {
                message: "This field has to be filled.",
            })
            .max(300, {
                message: "Name can't be longer than 300 characters.",
            }),
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
            .min(6, { message: "Has to be at least 6 characters long." }),
            confirmPassword: z.string().min(6, {
                message: "Has to be at least 6 characters long.",
            }),
            rememberMe: z.
                boolean(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ["confirmPassword"],
            });
        }
    });

const SignUpForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            rememberMe: false
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

        setIsLoading(true)

        const response = await fetch(`/api/auth/signUp`, {
            method: "POST",
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if (data.error) {
            toast.error(data.error)
            setIsLoading(false)
        }
        else {
            setIsLoading(false)
            toast.success("Account created!");
            setTimeout(() => {
                router.push('/');
            }, 1000);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <h1 className="text-3xl font-semibold">Sign up to NewsButler</h1>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className=''>
                                <FormControl>
                                    <Input placeholder="Full Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className=''>
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
                                    <Input type="password" placeholder='Password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" placeholder='Comfirm Password' {...field} />
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
                    <Button type="submit" className='w-full'>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign Up</Button>
                </form>
            </Form>
            <Toaster />
        </>
    )
}

export default SignUpForm