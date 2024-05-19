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
        <section className="flex h-full max-w-screen-xl w-full mx-auto items-center px-4 xl:space-x-16">
            {/*<div className="flex-1 hidden xl:block">
                <div className="h-full aspect-video rounded-[2rem] relative overflow-hidden">
                    <div className="w-full h-full  z-10"/>
                    <Image src="/UI-Mockups.png" objectFit="cover" fill alt="ui mockup" className="-z-10"/>
                </div>
            </div> xl:w-1/3 xl:w-1/3*/}
            <div className="w-full">
                <section className="max-w-[460px] mx-auto w-full justify-center items-center ">
                    <LoginForm />
                </section>
            </div>
        </section>
    )
}

export default signUpPage