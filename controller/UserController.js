const UserModel = require("../models/UserModel");

const login = async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
   
    const createUser =await UserModel.create({
      username: body.username,
      password: body.password,
    });
    console.log(createUser);

    return res.json(createUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error occured" });
  }
};
module.exports = login;
