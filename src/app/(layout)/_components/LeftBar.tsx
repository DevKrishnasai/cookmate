"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavLinks from "./NavLinks";
import { CookingPot, Star, Heart, User, X } from "lucide-react";
import { getUserElseCreate } from "@/actions/user";
import { sideBarData, SideBarType } from "@/actions/sidebar";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
interface LeftBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftBar = ({ open, setOpen }: LeftBarProps) => {
  const [user, setUser] = useState<SideBarType | null>(null);
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserElseCreate();
        if (userData && userData.id) {
          console.log("userData", userData);
          const response = await sideBarData(userData.id);
          console.log("response", response);
          if (response) {
            setUser(response);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className=" w-full h-[calc(100vh-50px)] bg-green-50 lg:bg-white border-2 rounded-lg m-6 mr-3 flex flex-col justify-between shadow-xl overflow-y-auto z-40">
        <div>
          <Skeleton className="h-10 w-3/4 mx-auto mt-6" />
          <div className="flex flex-col items-center w-full mx-auto mt-10 px-4">
            <Skeleton className="w-32 h-32 rounded-full" />
            <Skeleton className="h-6 w-1/2 mt-4" />
            <Skeleton className="h-4 w-1/3 mt-2" />
            <div className="flex justify-around w-full mt-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Skeleton className="w-10 h-10 rounded-full mb-1" />
                  <Skeleton className="h-4 w-16 mt-1" />
                  <Skeleton className="h-3 w-12 mt-1" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-10 w-3/4 mx-auto mt-4" />
            ))}
          </div>
        </div>
        <div className="p-2">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4 mx-auto mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className=" sticky top-5 left-0 w-full max-h-[calc(100vh-50px)] bg-green-50 lg:bg-white border-2 rounded-lg m-6 mr-3 flex flex-col justify-between shadow-xl overflow-y-auto z-50">
      <div>
        {open && (
          <X
            size={30}
            className="lg:opacity-0 absolute top-0 right-0  bg-red-500 rounded-full"
            onClick={() => setOpen(false)}
          />
        )}

        <Link href="/">
          <h2 className="text-center font-bold text-3xl mt-6 text-green-600">
            COOKMATE
          </h2>
        </Link>
        <div className="flex flex-col items-center w-full mx-auto mt-10 px-4">
          <Avatar className="w-32 h-32 border-4 border-green-500 shadow-lg">
            {user && <AvatarImage src={user.image} />}
            <AvatarFallback>
              {user ? user.name.slice(0, 2).toUpperCase() : "GU"}
            </AvatarFallback>
          </Avatar>
          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {user ? user.name : "Guest User"}
            </h1>
            <p className="text-green-600 font-medium">
              {user ? user.email : "Welcome to Cookmate!"}
            </p>
          </div>
          <div className="flex justify-around w-full mt-6">
            <UserStat
              icon={<CookingPot size={20} />}
              label="Recipes"
              value={user ? user._count.recipes : "-"}
            />
            <UserStat
              icon={<Star size={20} />}
              label="Ratings"
              value={user ? user._count.Ratings : "-"}
            />
            <UserStat
              icon={<Heart size={20} />}
              label="Favorites"
              value={user ? user._count.favorites : "-"}
            />
          </div>
        </div>
        <div className="mt-10">
          <NavLinks setOpen={setOpen} />
        </div>
      </div>
      <div className="p-2 mt-10">
        {isSignedIn ? (
          <SignOutButton>
            <button className="flex items-center justify-center w-full h-12 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg">
              Sign Out
            </button>
          </SignOutButton>
        ) : (
          <SignInButton>
            <button className="flex items-center justify-center w-full h-12 border bg-black text-white  font-bold rounded-lg">
              Sign In
            </button>
          </SignInButton>
        )}
        <p className="text-center text-gray-500 text-sm mb-4 mt-4">
          © {new Date().getFullYear()} COOKMATE. All rights reserved.
        </p>
      </div>
    </div>
  );
};

const UserStat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}) => (
  <div className="flex flex-col items-center">
    <div className="bg-green-100 p-2 rounded-full mb-1">{icon}</div>
    <span className="font-bold text-gray-800">{value}</span>
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

export default LeftBar;
