"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";

export const DashboardHeader = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center p-7">
      <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
        <Image
          src={session?.user?.image || ""}
          alt="Profile"
          unoptimized
          width={64}
          height={64}
          className="object-cover"
        />
      </div>
      <h1 className="text-3xl font-medium text-slate-700">
        {session?.user?.name ? session?.user.name : "not logged in"}
      </h1>
    </div>
  );
};
