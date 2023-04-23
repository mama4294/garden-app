"use client";

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

export function SessionProvider({ children, session }: Props) {
  return (
    <Provider session={session}>
      <Toaster position="top-right" />
      {children}
    </Provider>
  );
}
