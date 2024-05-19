import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import LoginButton from "@/components/loginButton";

const home = async () => {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signup")
  }

  const user = session?.user

  return (
    <main>
      Hello, {user?.name}!
    </main>
  );
}

export default home