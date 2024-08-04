"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavLinks from "./NavLinks";
import { CookingPot, Star, Heart, User } from "lucide-react";
import { getUserElseCreate } from "@/actions/user";
import { sideBarData, SideBarType } from "@/actions/sidebar";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const LeftBar = () => {
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
      <div className="w-full h-[calc(100vh-50px)] bg-green-50 lg:bg-white border-2 rounded-lg m-6 mr-3 flex flex-col justify-center items-center shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-50px)] bg-green-50 lg:bg-white border-2 rounded-lg m-6 mr-3 flex flex-col justify-between shadow-xl overflow-y-auto z-50">
      <div>
        <h2 className="text-center font-bold text-3xl mt-6 text-green-600">
          COOKMATE
        </h2>
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
          <NavLinks />
        </div>
      </div>
      <div className="p-2">
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
