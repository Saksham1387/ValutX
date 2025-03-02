"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Vault } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <nav className="w-full bg-black border-b border-gray-800 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="flex items-center flex-row gap-3 cursor-pointer">
            <Vault className="text-white" />
            <div>
              <span className="text-xl font-bold text-white">ValutX</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          {session ? (
            <Button
              variant="outline"
              className="text-black border-white "
              onClick={() => signOut()}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="outline"
              className="text-black border-white "
              onClick={() => router.push("/auth")}
            >
              Login
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
