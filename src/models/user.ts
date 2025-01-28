import ERROR from "@/utils/error";
import Bun from "bun";
import Elysia, { t } from "elysia";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const UserDB = mongoose.model("User", userSchema);

const elysia = new Elysia().model({
  user: t.Object({
    username: t.String({
      error: ERROR.INVALID_TYPE_USERNAME,
    }),
    password: t.String({
      error: ERROR.INVALID_TYPE_PASSWORD,
    }),
  }),
});

const findById = async (id: string) => {
  return await UserDB.findById(id);
};

const findByUsername = async (username: string) => {
  return await UserDB.findOne({
    username,
  });
};

const create = async ({ username, password }: { username: string; password: string }) => {
  if (await findByUsername(username)) {
    throw new Error(ERROR.USER_ALREADY_EXISTS);
  }
  const user = new UserDB({
    username: username,
    password: await Bun.password.hash(password),
  });
  await user.save();
  return user;
};

const User = {
  findById,
  findByUsername,
  create,
  elysia,
};

export default User;
