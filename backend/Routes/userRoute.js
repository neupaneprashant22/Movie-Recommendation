const express = require("express");
const User = require("../Model/user");
const router = express.Router();

const inputValidator = require("../validation/inputValidator");

router.post("/register", async (req, res, next) => {
  const { isValid, errors } = inputValidator(req.body, "register-user");

  if (!isValid) {
    return res.status(400).json({
      status: "error",
      errors,
    });
  }
  console.log(isValid, errors);

  const foundUser = await User.findOne({ email: req.body.email });

  if (foundUser) {
    return res.status(400).json({
      status: "error",
      errors: {
        email: "Email already exists",
      },
    });
  }

  const users = await User.find();
  const idNumber = users.length + 610;
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    userId: idNumber,
  });
  await newUser.save();
  res.status(200).json({
    status: "success",
    newUser,
  });
});

router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { isValid, errors } = inputValidator(req.body);

  if (!isValid) {
    return res.status(400).json({
      status: "error",
      errors,
    });
  }
  console.log(isValid, errors);

  const foundUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (!foundUser) {
    return res.status(400).json({
      status: "error",
      errors: {
        email: "Invalid credential",
      },
    });
  }

  res.status(200).json({
    status: "success",
    foundUser,
  });
});

module.exports = router;
