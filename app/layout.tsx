import "../styles/globals.css";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { authOptions } from "../pages/api/auth/[...nextAuth]";
import { SessionProvider } from "../components/SessionProvider";
import { getServerSession } from "next-auth";
import HomePage from "../components/HomePage";

export const metadata = {
  title: "Garden Designer",
  description: "An app for designing garden planters",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <SessionProvider session={session}>
          {session ? (
            <>
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
            </>
          ) : (
            <HomePage />
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
