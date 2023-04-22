import Image from "next/image";
import React, { useEffect, useState } from "react";
import pteT from "../assets/images/pteT.png";
import Button from "./Button";

function Landing() {
  return (
    <section className="sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8">
      <div className="space-y-8 ">
        <h1 className="space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl">
          <span className="block bg-gradient-to-r from-[#158342] to-[#104f60] bg-clip-text text-transparent text-white">
            PTE TTK Official Shop
          </span>
          <span className="block">All your Favourite</span>
          <span className="block">TTK Merch</span>
        </h1>

        <div className="space-x-8">
          <Button title="Buy Now" />
          <a className="link">Learn More</a>
        </div>
      </div>
      <div className="relative hidden h-[450px] w-[450px] transition-all duration-500 md:inline lg:h-[650px] lg:w-[600px]">
        <Image className="object-contain" layout="fill" src={pteT} alt={""} />
      </div>
    </section>
  );
}

export default Landing;
