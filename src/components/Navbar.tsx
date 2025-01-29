import Link from "next/link";
import { FunctionComponent } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NavSignOutButton from "./NavSignOutButton";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = async () => {
  const session = await getServerSession(authOptions);
  // console.log("navbar", session?.user);
  return (
    <div className="bg-stone-300 py-2 z-50 border-b border-s-stone-800 text-stone-800 fixed w-full">
      <div className="flex items-center justify-between">
        <Link href="/">SlothKnows</Link>
        {session?.user ? (
          <NavSignOutButton />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
