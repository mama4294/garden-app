import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import "../styles/globals.css";

export const metadata = {
  title: "Garden Designer",
  description: "An app for designing garden planters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
