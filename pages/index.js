import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession();

  if(!session){
    return (
    <div className="bg-sky-800 w-screen h-screen flex items-center">
      <div className="text-center w-full">
        <button onClick={() => signIn('google')} className="bg-white p-2 rounded-lg px-4">Login with Google</button>
      </div>
    </div>
    );
  }

  return (
    <div>logged In {session.user.email}</div>
  );
}
