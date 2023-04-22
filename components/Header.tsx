import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../redux/basketSlice";
import { signIn, signOut, useSession } from "next-auth/react";
import Logo from "../assets/images/TTKlogoZöldÉsFehér.svg";
import LogoHover from "../assets/images/TTKLogoZöldÉsKék.png";
import Search from "./Search";

interface Props {
  products: Product[];
  categories: Category[];
}

function Header({ products, categories }: Props) {
  const { data: session } = useSession();
  const items = useSelector(selectBasketItems);
  const [showSearch, setShowSearch] = useState(false);
  // // const [hovered, setHovered] = useState(false);

  // const handleHover = () => {
  //   setHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setHovered(false);
  // };

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4">
      {/* <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-32 w-32 cursor-pointer transition">
            {hovered ? (
              <Image
                src={LogoHover}
                className="layout-fill h-32 w-32 object-contain "
                alt={""}
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
              />
            ) : (
              <Image
                src={Logo}
                className="layout-fill h-48 w-48 object-contain"
                alt={""}
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
              />
            )}
          </div>
        </Link>
      </div> */}
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-32 w-32 cursor-pointer opacity-100 transition hover:opacity-90">
            <Image src={LogoHover} layout="fill" objectFit="contain" />
          </div>
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a className="headerLink">Product</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">About</a>
      </div>
      <div className="flex items-center justify-center gap-x-4 md:w-1/5">
        {!showSearch ? (
          <SearchIcon
            className="headerIcon"
            onClick={() => setShowSearch(true)}
          />
        ) : (
          <Search
            products={products}
            setShowSearch={setShowSearch}
            categories={categories}
          />
        )}

        <Link href="/checkout">
          <div className="relative cursor-pointer">
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-[#158342] to-[#104f60] text-[10px] text-white">
                {items.length}
              </span>
            )}
            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>

        {session ? (
          <Image
            src={
              session.user?.image ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt=""
            className="cursor-pointer rounded-full"
            width={34}
            height={34}
            onClick={() => signOut()}
          />
        ) : (
          <UserIcon className="headerIcon" onClick={() => signIn()} />
        )}
      </div>
    </header>
  );
}

export default Header;
