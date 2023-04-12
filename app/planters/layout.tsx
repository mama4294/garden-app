import { PlanterList } from "./PlanterList";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-full">
      <div className="border-transparent border-r-base-300 border-2">
        <PlanterList />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </main>
  );
}
