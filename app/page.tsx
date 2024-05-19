import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const home = async () => {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signup")
  }

  const user = session?.user

  return (
    <main className="max-w-screen-xl px-4 mx-auto w-full mt-20">
      <h1 className="text-6xl uppercase font-bold tracking-tight">{user?.name}’s news</h1>
    </main>
  );
}

export default home