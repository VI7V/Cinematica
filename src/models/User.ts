import mongoose, { Schema, Document } from "mongoose";

export interface WatchlistItem {
  tmdbId: number;
  title: string;
  type: "movie" | "tv";
  status: "watching" | "watched" | "plan_to_watch";
  poster: string;
  addedAt: Date;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  watchlist: WatchlistItem[];
  createdAt: Date;
}

const WatchlistItemSchema = new Schema<WatchlistItem>({
  tmdbId: { type: Number, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ["movie", "tv"], required: true },
  status: { type: String, enum: ["watching", "watched", "plan_to_watch"], default: "plan_to_watch" },
  poster: { type: String, default: "" },
  addedAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    watchlist: [WatchlistItemSchema],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
