"use client";

import { FunctionComponent, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const NavSignOutButton: FunctionComponent = () => {
  return (
    <Button
      onClick={() => signOut({ redirect: true, callbackUrl: "/sign-in" })}
      variant={"destructive"}
    >
      Sign out
    </Button>
  );
};

export default NavSignOutButton;
