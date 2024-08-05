import { getUserElseCreate } from "@/actions/user";
import { db } from "@/lib/db";
import React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { HeartIcon, StarIcon, UserIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <div className=" min-h-full  w-full border-2 rounded-lg shadow-xl lg:m-6 lg:ml-0 p-3  space-y-3">
      <header className="mb-10 mt-10 lg:mt-3 ml-1 lg:ml-0">
        <h1 className="text-2xl  lg:text-4xl font-bold text-gray-900 ">
          Settings
        </h1>
        <p className="text-sm lg:text-lg text-gray-600">
          Manage your favorites and recipes
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        <main className="md:col-span-2 ">
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

const RecipeCard = ({ recipe }: { recipe: any }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "from-green-400 to-green-600";
      case "medium":
        return "from-yellow-400 to-yellow-600";
      case "hard":
        return "from-red-400 to-red-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  return (
    <Link href={`/recipe/${recipe.title.trim().split(" ").join("-")}`}>
      <Card
        className={`w-full overflow-hidden rounded-xl shadow-md transition-all duration-300 ease-in-out
          hover:shadow-2xl hover:scale-[1.02] bg-white`}
      >
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-56 object-cover transition-transform duration-300"
          />
        </div>
        <CardContent className="p-0">
          <div
            className={` p-4
            bg-gradient-to-t ${getDifficultyColor(recipe.difficulty)}
            text-white`}
          >
            <h3 className="font-bold text-xl mb-2 truncate">{recipe.title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(recipe.averageRating)
                        ? "text-yellow-300"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 font-semibold">
                  {recipe.averageRating.toFixed(1)}
                </span>
              </div>
              <span className="flex items-center gap-1 font-semibold">
                <HeartIcon className="h-5 w-5 fill-red-500" />
                {recipe._count.favorated}
              </span>
            </div>
            <div className="flex  justify-between items-center gap-2 mt-3 text-sm font-medium">
              <Badge
                variant="outline"
                className="flex items-center px-3 py-1 truncate"
              >
                <ClockIcon className="h-4 w-4 mr-1 " />
                {recipe.cookTime} mins
              </Badge>
              <Badge variant="outline" className="px-3 py-1 truncate ">
                {recipe.noOfServings} P
              </Badge>
              <Badge variant="outline" className="px-3 py-1 truncate ">
                {recipe.calories} Kcal
              </Badge>
              <Badge
                variant="outline"
                className={`capitalize  py-1
              ${getDifficultyColor(recipe.difficulty)} truncate text-clip`}
              >
                {recipe.difficulty}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
