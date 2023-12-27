"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

const NavItems = ({role}: {role: string}) => {
  const headerLinks =
    role === "admin"
      ? [
          {
            label: "Home",
            route: "/",
          },
          {
            label: "My Profile",
            route: "/profile",
          },
          {
            label: "Create Sport",
            route: "/sports/create",
          },
          {
            label: "Manage Orders",
            route: "/orders",
          },
        ]
      : [
          {
            label: "Home",
            route: "/",
          },
          {
            label: "My Profile",
            route: "/profile",
          },
        ];

  const pathname = usePathname();

  return (
    <ul className="flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-primary-500"
            } flex-center whitespace-nowrap`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
