import User from "../schema/user.schema.js";
import CrudRepositories from "./crud.repositories.js";

const userCrudRepositories = {
  ...CrudRepositories(User),

  getUserByUserName: async function (username: string) {
    const user = await User.findOne({ username });
    return user;
  },

  getUserByEmail: async function (email: string) {
    const user = await User.findOne({ email });
    return user;
  },

  getUserByEmailWithPassword: async function (email: string) {
    return User.findOne({ email }).select("+password");
  }
};
export default userCrudRepositories;
