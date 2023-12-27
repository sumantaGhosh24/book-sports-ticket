import Image from "next/image";
import Link from "next/link";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";

import MobileNav from "./MobileNav";
import NavItems from "./NavItems";
import {Button} from "./ui/button";

const Header = ({role}: {role: string}) => {
  return (
    <header className="w-full border-b bg-primary">
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image src="/logo.png" width={50} height={50} alt="Sport logo" />
        </Link>
        <SignedIn>
          <nav className="md:flex hidden w-full max-w-xs text-white">
            <NavItems role={role} />
          </nav>
        </SignedIn>
        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav role={role} />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
