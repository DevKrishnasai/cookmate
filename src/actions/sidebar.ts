"use server";
import { db } from "@/lib/db";

export async function sideBarData(userId: string) {
  try {
    const userStats = await db.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        image: true,
        _count: {
          select: {
            recipes: true,
            Ratings: true,
            favorites: true,
          },
        },
      },
    });

    if (!userStats) {
      return null;
    }

    return userStats;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return null;
  }
}

export type SideBarType = Awaited<ReturnType<typeof sideBarData>>;
