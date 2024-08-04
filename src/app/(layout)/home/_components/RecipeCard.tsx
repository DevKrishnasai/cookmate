"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClockIcon, Heart, HeartIcon, StarIcon } from "lucide-react";
import { SearchResultsType } from "@/actions/recipe";
import Link from "next/link";
import { cn } from "@/lib/utils";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { Skeleton } from "@/components/ui/skeleton";

const RecipeCard = ({ recipe }: { recipe: any }) => (
  <Link href={`/recipe/${recipe.title.trim().split(" ").join("-")}`}>
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          {recipe.title}
        </h3>
        <div className="flex w-full items-center justify-between mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(recipe.averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              ({recipe.averageRating.toFixed(1)})
            </span>
          </div>
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <HeartIcon className="h-4 w-4 fill-red-500" />
            {recipe._count.favorated}
          </span>
        </div>
        <div className="flex justify-between items-center w-full text-sm text-gray-600">
          <span className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            {recipe.cookTime} mins
          </span>
          <span>
            {recipe.noOfServings} Serving{recipe.noOfServings > 1 ? "s" : ""}
          </span>
          <span className="capitalize">{recipe.difficulty}</span>
        </div>
      </CardFooter>
    </Card>
  </Link>
);

const SkeletonCard = () => (
  <Card className="w-full">
    <CardContent className="p-0">
      <Skeleton className="w-full h-48 rounded-t-lg" />
    </CardContent>
    <CardFooter className="flex flex-col items-start p-4">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <div className="flex w-full items-center justify-between mb-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="flex justify-between items-center w-full">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </CardFooter>
  </Card>
);

interface RecipeComponentProps {
  recipes: SearchResultsType;
  isHome?: boolean;
  isLoading?: boolean;
}

const RecipeComponent = ({
  recipes,
  isHome = true,
  isLoading = false,
}: RecipeComponentProps) => {
  return (
    <div className={cn(" mx-auto p-2", !isHome && "p-0")}>
      {isHome && (
        <>
          <GradualSpacing
            className="font-display text-left text-2xl font-bold tracking-[-0.1em] text-black dark:text-white md:text-4xl md:leading-[5rem] text-wrap"
            text="Learn, Cook, & Eat your food"
          />
          {/*
          <div className="flex justify-between items-center mb-6 mt-3 lg:mt-0">
            <Tabs value={selectedTab} onValueChange={toggleCategory}>
              <TabsList>
                <TabsTrigger value="Rice">Rice</TabsTrigger>
                <TabsTrigger value="Burger">Burger</TabsTrigger>
                <TabsTrigger value="Pasta">Pasta</TabsTrigger>
                <TabsTrigger value="pizza">Pizza</TabsTrigger>
                <TabsTrigger value="Curry">Curry</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          */}
        </>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full lg:h-[calc(100vh-228px)] overflow-y-auto">
        {isLoading
          ? Array(8)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)
          : recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
      </div>
    </div>
  );
};

export default RecipeComponent;
