import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const metadata = {
  title: "Gardening",
  description: "An app for garden planter planning",
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
