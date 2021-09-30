import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) return null;

    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await client.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error("User not found");
  }
};

export const protectdResolver =
  (ourResolver) => (parent, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please login to perform that action",
      };
    }

    return ourResolver(parent, args, context, info);
  };
