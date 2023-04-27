import { getServerSession } from "next-auth";
import { SignIn } from "../../components/SignIn";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { PlanterMobileList } from "./PlanterMobileItem";
import { Sibebar } from "./Sidebar";

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
          <div className="border-transparent border-r-base-300 border-2 md:flex overflow-hidden hidden ">
            <Sibebar />
          </div>
          <div className="flex-1 overflow-hidden hidden md:block">
            {children}
          </div>
          <div className="flex-1 overflow-hidden md:hidden">
            <PlanterMobileList />
          </div>
        </main>
      ) : (
        <SignIn />
      )}
    </>
  );
}
