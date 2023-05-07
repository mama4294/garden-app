import "../styles/globals.css";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { SessionProvider as ClientProvider } from "../components/ClientProvider";
import { getServerSession } from "next-auth";

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
        <ClientProvider session={session}>
          <Navbar session={session} />
          <div className="flex flex-1 overflow-hidden">{children}</div>
          {/* <Footer /> */}
        </ClientProvider>
      </body>
    </html>
  );
}
