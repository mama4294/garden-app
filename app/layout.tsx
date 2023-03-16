import { Footer } from "../components/Footer";

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
      <body>{children}</body>
      <Footer />
    </html>
  );
}
