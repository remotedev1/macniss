import { auth } from "@/auth";
export const currentUser = async () => (await auth())?.user ?? null;
