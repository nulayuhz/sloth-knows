import Link from "next/link";
import { FunctionComponent } from "react";
import { Button, buttonVariants } from "@/components/ui/button";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  return (
    <div className="bg-stone-300 py-2 border-b border-s-stone-600 text-stone-800 fixed w-full">
      <div className="flex items-center justify-between">
        <Link href="/">SlothKnows</Link>
        <Link href="/sign-in" className={buttonVariants()}>
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
