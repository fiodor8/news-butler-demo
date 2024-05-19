import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"

import { redirect } from "next/navigation"
import LoginForm from "./loginForm"

const signUpPage = async () => {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect("/");
    }

    return (
        <section className="max-w-md w-full px-4 flex justify-center items-center ">
            <LoginForm/>
        </section>
    )
}

export default signUpPage