const axios = require("axios");
const index = (req, res) => {
  res.render("index");
};

const UserController = {
  signup: async (req, res) => {
    try {
      const apiUrl = "http://localhost:3000/api/create/user";
      const requestData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      const response = await axios.post(apiUrl, requestData);
      console.log("Response:", response.data);
      res.status(200).json({ message: "User signed up successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to sign up" });
    }
  },
};

module.exports = {
  index,
  UserController,
};
