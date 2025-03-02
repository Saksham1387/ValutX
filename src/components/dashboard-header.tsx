"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"

 

export const DashboardHeader = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  
  // Animated shimmer effect class for skeletons
  const shimmer = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent";

  return (
    <div className="flex items-center p-7">
      {isLoading ? (
        // Skeleton loader for profile image
        <div className={`w-16 h-16 rounded-full bg-slate-200 mr-4 ${shimmer}`}></div>
      ) : (
        // Actual profile image when loaded
        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 mr-4">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="User profile"
              className="w-full h-full object-cover"
            />
          ) : (
            // Placeholder avatar when no image is available
            <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      )}

      {isLoading ? (
        // Skeleton loader for username
        <div className={`h-9 w-48 bg-slate-200 rounded-md ${shimmer}`}></div>
      ) : (
        // Actual username when loaded
        <h1 className="text-3xl font-medium text-slate-700">
          {session?.user?.name || "Not logged in"}
        </h1>
      )}
    </div>
  );
};