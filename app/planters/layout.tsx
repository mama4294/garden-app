import { getServerSession } from "next-auth";
import { SignIn } from "../../components/SignIn";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { PlanterList } from "./PlanterList";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session ? (
        <main className="flex flex-1 overflow-hidden">
          <div className="border-transparent border-r-base-300 border-2 flex overflow-hidden">
            <PlanterList />
          </div>
          <div className="flex-1 overflow-hidden">{children}</div>
        </main>
      ) : (
        <SignIn />
      )}
    </>
  );
}
