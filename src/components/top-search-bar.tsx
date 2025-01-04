import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "@assets/logo.png";
import { Search } from "lucide-react";

import { Input } from "./ui/input";

const TopSearchBar: FC = () => {
  return (
    <header className="fixed top-0 z-40 flex w-full border-b border-gray-200 bg-white">
      <div className="container flex h-16">
        <div className="flex h-full w-60 items-center border-r border-gray-200">
          <Link href="/" className="px-3">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center px-5">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form className="relative">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                type="search"
                placeholder="Search Tasks"
                className="pl-8 sm:w-full md:w-[300px] lg:w-[400px]"
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopSearchBar;
