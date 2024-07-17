const User = require("../Models/User");
const Category = require("../Models/Category");
const SubCategory = require("../Models/Sub-Category");
const Product = require("../Models/Product");
const Permissions = require("../Models/Permission");
const Role = require("../Models/Role");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const saltRounds = 10;

const UserController = {
  create: async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Check if the user already exists in the database

      const oldUser = await User.findOne({ email });

      if (oldUser) {
        if (oldUser.status === false) {
          return res.status(402).json({
            message:
              "User already exists. Please verify your OTP sent to your email.",
          });
        } else {
          return res.status(200).json({ message: "User Already Verified! " });
        }
      }

      // Generate a random verification code
      const otp = Math.floor(100000 + Math.random() * 900000);

      // Create a new verification code entry in the database
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        confirm_password: hashedPassword,
        code: otp,
        status: false,
      });

      await newUser.save();

      // Send verification email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "syedanasahmed15@gmail.com",
          pass: "cyukxjmlipjrmzig",
        },
      });

      const mailOptions = {
        from: "Boutique <syedanasahmed15@gmail.com>",
        to: email,
        subject: "Email Verification",
        text: `Your verification code is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ error: "Failed to send verification email" });
        } else {
          res.status(200).json({ message: "Verification email sent" });
        }
      });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ error: "Failed to sign up" });
    }
  },

  listing: async (req, res) => {
    try {
      const users = await User.find({}, "-password"); // Exclude the password field from the results
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching users." });
    }
  },

  verification: async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      // User not found in the database
      return res.status(404).json({ error: "User not found" });
    }

    if (otp === user.code) {
      // Verification successful, update the status field to true
      user.status = true;

      try {
        // Save the updated user in the database
        await user.save();
        return res
          .status(200)
          .json({ message: "Verification successful. Status updated to true" });
      } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Failed to update user status" });
      }
    } else {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  },
};

const CategoryController = {
  create: async (req, res) => {
    const { title, description } = req.body;
    try {
      const categories = await Category.findOne({ title });
      if (!categories) {
        const newCategory = new Category({
          title: title,
          description: description,
        });
        const category = await newCategory.save();
        res.status(201).json(category);
      } else {
        res.status(400).json({ error: "Category Already Exist" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something Went Wrong While Creating Category" });
    }
  },
  listing: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(201).json(category);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something Went Wrong While Fetching the Categories" });
    }
  },
};

const SubCategoryController = {
  create: async (req, res) => {
    const { title, description } = req.body;
    const category = req.body.id;

    try {
      const subcategories = await SubCategory.findOne({ title });
      if (!subcategories) {
        const subcat = new SubCategory({
          title: title,
          description: description,
          category: category,
        });
        const subcategory = await subcat.save();
        res.status(201).json(subcategory);
      } else {
        res.status(400).json({ error: "Sub Category Already Exist " });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something Went Wrong While Creating a Sub Category" });
    }
  },
  listing: async (req, res) => {
    try {
      const subcategory = await SubCategory.find();
      res.status(201).json(subcategory);
    } catch (error) {
      res.status(500).json({
        error: "Something Went Wrong While Fetching the Sub Categories",
      });
    }
  },
};

const ProductController = {
  create: async (req, res) => {
    const { title, description, price } = req.body;
    const subcategory = req.body.id;

    try {
      const products = await Product.findOne({ title });
      if (!products) {
        const newProduct = new Product({
          title: title,
          description,
          description,
          price: price,
          subcategory: subcategory,
        });
        const product = await newProduct.save();
        res.status(201).json(product);
      } else {
        res.status(400).json({ error: "Product Already Exist" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something Went Wrong While Creating a Product" });
    }
  },
  listing: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(201).json(products);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something Went Wrong While Fetching Products" });
    }
  },
};

const PermissionController = {
  create: async (req, res) => {
    const { title } = req.body;
    try {
      const permissions = await Permissions.findOne({ title });
      if (!permissions) {
        const newPermission = new Permissions({
          title: title,
        });
        const permission = await newPermission.save();
        res.status(201).json(permission);
      } else {
        res.status(400).json({ erro: "Permission Already Exist" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something Went Wrong While Creating a Permission" });
    }
  },
  listing: async (req, res) => {
    try {
      const permissions = await Permissions.find();
      res.status(201).json(permissions);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something Went Wrong While Fetching a Permissions" });
    }
  },
};

const RoleController = {
  create: async (req, res) => {
    const { title } = req.body;
    const permission = req.body.id;
    try {
      const roles = await Role.findOne({ title });
      if (!roles) {
        const newRole = new Role({
          title: title,
          permission: permission,
        });
        const role = await newRole.save();
        res.status(201).json(role);
      } else {
        res.status(400).json({ error: "Role Already Exist" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something Went Wrong While Creating a Role" });
    }
  },
  listing: async (req, res) => {
    try {
      const roles = await Role.find();
      res.status(201).json(roles);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something Went Wrong While Fetching a Roles" });
    }
  },
};

module.exports = {
  UserController,
  CategoryController,
  SubCategoryController,
  ProductController,
  PermissionController,
  RoleController,
};
