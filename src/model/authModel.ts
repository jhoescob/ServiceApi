import { db } from "@/drizzle/db";
import { eq, and } from "drizzle-orm";
import { User } from "@/schemas/drizzle/schema";
import { v4 as uuidv4 } from "uuid";
type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
};

type Users = User[];

type UserInfo = {
  username: string;
  email: string;
};

type UserInfos = UserInfo[];

export const createUser = async (
  email: string,
  username: string,
  hashedPassword: string
) => {
  try {
    await db.insert(User).values({
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      role: "user",
    });
    return "OK";
  } catch (err: any) {
    if (err.code === "23505") {
      return "Email already exists";
    } else {
      return "something went wrong";
    }
  }
};

export const getUserByEmail = async (email: string): Promise<Users> => {
  return await db.select().from(User).where(eq(User.email, email));
};

export const getUserById = async (id: string): Promise<UserInfos> => {
  return await db
    .select({
      username: User.username,
      email: User.email,
    })
    .from(User)
    .where(eq(User.id, id));
};
