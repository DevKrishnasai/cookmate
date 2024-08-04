import { getUserElseCreate } from "@/actions/user";
import { db } from "@/lib/db";
import React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { HeartIcon, StarIcon, UserIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = async () => {
  const user = await getUserElseCreate();
  if (!user) {
    return (
      <div className="flex w-full items-center justify-center h-screen">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Login Required
          </h1>
          <p className="text-gray-600 mb-6">
            You need to log in to view your settings and favorites.
          </p>
          <Link href="/sign-in">
            <Button className="w-full">Log In</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const userSettings = await db.user.findUnique({
    where: { id: user.id },
    include: {
      favorites: {
        include: {
          recipe: {
            include: {
              _count: { select: { favorated: true, Ratings: true } },
              Ratings: { select: { stars: true } },
            },
          },
        },
      },
      _count: { select: { Ratings: true } },
    },
  });

  if (!userSettings) {
    return (
      <div className="flex w-full items-center justify-center h-screen bg-gray-100">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            User Not Found
          </h1>
          <p className="text-gray-600">
            We couldn&apos;t find your user profile.
          </p>
        </Card>
      </div>
    );
  }

  const favorites = userSettings.favorites.map((fav) => {
    const recipe = fav.recipe;
    const totalStars = recipe.Ratings.reduce(
      (sum, rating) => sum + rating.stars,
      0
    );
    const averageRating =
      recipe.Ratings.length > 0 ? totalStars / recipe.Ratings.length : 0;
    return {
      ...recipe,
      averageRating: parseFloat(averageRating.toFixed(1)),
      Ratings: undefined,
    };
  });

  return (
    <div className=" h-full md:h-[calc(100vh-50px)] w-full border-2 rounded-lg shadow-xl m-6 ml-0 p-5 space-y-3">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Profile</h1>
        <p className="text-lg text-gray-600">
          Manage your favorites and see your activity
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
        <aside className="md:col-span-1">
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              {user.image ? (
                <img
                  src={user.image}
                  className="h-12 w-12 rounded-full text-gray-400"
                />
              ) : (
                <UserIcon className="h-12 w-12 text-gray-400" />
              )}
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Ratings</span>
                <span className="font-semibold">
                  {userSettings._count.Ratings}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Favorites</span>
                <span className="font-semibold">{favorites.length}</span>
              </div>
            </div>
          </Card>
        </aside>

        <main className="md:col-span-2 h-full overflow-y-auto">
          {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Favorites
          </h2> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;

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
