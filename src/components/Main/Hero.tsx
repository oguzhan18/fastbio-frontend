import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="hero flex px-8 justify-center items-center pt-40 pb-20">
      <div className="mx-auto max-w-2xl">
        {/* <div className="mb-10 flex justify-center">
        <div className="relative rounded-full px-5 py-1 bg-foreground/10 text-sm leading-6 text-primary ring-1 ring-border">
          {"View public profiles ->"}
        </div>
      </div> */}
        <div className="text-center">
          <h1 className="text-4xl pt-32 sm:leading-[3.5rem] sm:text-5xl font-semibold">
          Create  Profile for Your Sweethearts Now
          </h1>
          <p className="mt-3 md:text-lg md:leading-8 leading-6 text-primary/50">
            Build your awesome profile and easily share it with your connections
            for free! Create a standout online presence that reflects your
            uniqueness.
          </p>
          <div className="mt-12 flex items-center justify-center gap-x-6">
            <Link href="/login">
              <Button className="text-white">{"Get Started -> "}</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
