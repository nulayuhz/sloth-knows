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
    <div className="bg-stone-300 py-2 z-50 border-b border-s-stone-800 text-stone-800 fixed top-0 w-full">
      <div className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
        <Link className="flex" href="/">
          SlothKnows
        </Link>
        <div className="flex">
          {session?.user ? (
            <NavSignOutButton />
          ) : (
            <Link href="/sign-in" className={buttonVariants()}>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
