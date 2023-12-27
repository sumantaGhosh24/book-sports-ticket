import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              className="h-10"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Help
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Services
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Contact
          </Link>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm">
            &copy; 2023 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
