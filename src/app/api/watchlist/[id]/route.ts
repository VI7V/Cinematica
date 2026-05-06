import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// PATCH /api/watchlist/[id] — update status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { status } = await req.json();
  const validStatuses = ["watching", "watched", "plan_to_watch"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const item = user.watchlist.id(params.id);
  if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  item.status = status;
  await user.save();

  return NextResponse.json({ message: "Status updated", item });
}

// DELETE /api/watchlist/[id] — remove item
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  user.watchlist = user.watchlist.filter(
    (item: any) => item._id.toString() !== params.id
  );
  await user.save();

  return NextResponse.json({ message: "Removed from watchlist" });
}
