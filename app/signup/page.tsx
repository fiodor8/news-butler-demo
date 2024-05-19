import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"

import { redirect } from "next/navigation"
import SignUpForm from "./signUpForm"

const signUpPage = async () => {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect("/");
    }

    return (
        <section className="flex max-w-screen-xl w-full mx-auto items-center px-4 xl:space-x-16">
            <div className="flex-1 hidden xl:block">
                <div className="bg-slate-600 h-full aspect-video rounded-[3rem]"/>
            </div>
            <div className="w-full xl:w-1/3">
                <section className="max-w-[460px] mx-auto w-full justify-center items-center ">
                    <SignUpForm />
                </section>
            </div>
        </section>
    )
}

export default signUpPage