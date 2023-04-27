"use client";

import { doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

export const PlanterSidebarItem = ({ id }: { id: string }) => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const [selected, setSelected] = useState(false);
  const [data] = useDocumentData(
    doc(db, "users", session?.user?.email!, "planters", id)
  );

  //sets which planter is selected based on the URL so that the background color changes
  useEffect(() => {
    if (!pathName) return;
    setSelected(pathName === `/planters/${id}`);
  }, [pathName]);

  return (
    <Link
      href={`/planters/${id}`}
      className={`card w-full cursor-pointer hover:shadow p-4 rounded-md hover:bg-base-200  ${
        selected && "bg-base-200 shadow"
      }`}
    >
      <p className="text-sm md:text-base font-bold">{data?.name}</p>
    </Link>
  );
};
