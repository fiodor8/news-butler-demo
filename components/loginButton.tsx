'use client'

import { signOut } from "next-auth/react"
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react"

export default function LoginButton () {

    const pathname = usePathname();
    const { data: session, status } = useSession();

    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: '/login' });
    };

    const user = session?.user

    return (
        <>
            {status === "loading" && (
                null
            )}
            {status ==="unauthenticated" && pathname !== '/login' && (
                <Button size="sm" className="rounded-full"><Link href={"/login"}>Login</Link></Button>
            )}
            {status ==="unauthenticated" && pathname === '/login' && (
                <Button size="sm" className="rounded-full"><Link href={"/signup"}>Sign Up</Link></Button>
            )}
            {status === "authenticated" && (
                <Button size="sm" className="rounded-full" onClick={handleSignOut}>Log Out</Button>
            )}
        </>
    )
}