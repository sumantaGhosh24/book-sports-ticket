import {Menu} from "lucide-react";
import Image from "next/image";

import NavItems from "./NavItems";
import {Separator} from "./ui/separator";
import {Sheet, SheetContent, SheetTrigger} from "./ui/sheet";

const MobileNav = ({role}: {role: string}) => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="flex items-center justify-center">
          <Menu size={30} className="cursor-pointer text-white" />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <Separator className="border border-gray-50" />
          <NavItems role={role} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
