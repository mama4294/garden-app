import { PlanterList } from "./PlanterList";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <div>
        <PlanterList />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}
