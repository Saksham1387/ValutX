import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="w-full bg-black border-b border-gray-800 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold text-white">ValutX</span>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="text-black border-white ">
            Login
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
