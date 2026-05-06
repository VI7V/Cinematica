import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// GET /api/watchlist — fetch current user's watchlist
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email }).select("watchlist");
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ watchlist: user.watchlist });
}

// POST /api/watchlist — add item to watchlist
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tmdbId, title, type, poster } = await req.json();
  if (!tmdbId || !title || !type) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Prevent duplicates
  const exists = user.watchlist.find(
    (item: any) => item.tmdbId === tmdbId && item.type === type
  );
  if (exists) {
    return NextResponse.json({ error: "Already in watchlist" }, { status: 409 });
  }

  user.watchlist.push({
    tmdbId,
    title,
    type,
    poster: poster || "",
    status: "plan_to_watch",
    addedAt: new Date(),
  });

  await user.save();
  return NextResponse.json({ message: "Added to watchlist" }, { status: 201 });
}
