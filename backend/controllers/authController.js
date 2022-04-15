const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendEmail = require("../service/emailTransptor");
const Seller = require("../models/seller");
const bcrypt = require("bcrypt");
const { redirect } = require("express/lib/response");
var ls = require("local-storage");
const res = require("express/lib/response");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

exports.userLogin = (request, response, next) => {
  console.log(request.body);
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }

  User.findOne({ email: request.body.email })
    .then((data) => {
      if (data == null) {
        throw new Error("email not found1");
      }
      console.log("2");
      encrypted = data.password;

      bcrypt.compare(request.body.password, encrypted).then(function (result) {
        if (result) {
          let accessToken = jwt.sign(
            {
              role: data.role,
              id: data._id,
              email: data.email,
            },
            process.env.SECRET_KEY,
            { expiresIn: "365d" }
          );
          response.json({ data, accessToken });
          // response.redirect("http://127.0.0.1:5500/index.html")
        } else {
          next(new Error("wrong pass"));
        }
      });
    })
    .catch((error) => {
      next(error.message);
    });
};

exports.changePass = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  // console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnn")
  // console.log(ls("token"))

  // console.log("TOKEN TESTS");
  // console.log("Req.role: ", request.role);
  // console.log("Req.id: ", request.id); //working
  User.findOne({ email: request.body.email })

    .then((data) => {
      if (data.role != request.role || data.email != request.email)
        next(Error("login first plz"));
      if (data == null) {
        throw new Error("email not found");
      }

      let matched = bcrypt.compareSync(request.body.password, data.password);
      if (
        matched &&
        request.body.newPassword == request.body.newPasswordConfirm
      ) {
        User.findByIdAndUpdate(data._id, {
          $set: {
            password: bcrypt.hashSync(request.body.newPassword, 10),
          },
        }).then((data) => {
          if (data == null) next(new Error("User not found"));
          response.json({ message: "password changed" });
          // else response.redirect("http://127.0.0.1:5500/index.html")
        });
      } else {
        throw new Error("password in incorrect or not matched");
      }
    })
    .catch((error) => {
      // error.message = "error happened while login3";
      next(error.message);
    });
};

exports.register = asyncHandler(async (request, response, next) => {
  //Validation
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }

  let hashed = bcrypt.hashSync(request.body.password, 10);
  const user = new User({
    name: request.body.name,
    email: request.body.email,
    password: hashed,
  });

  try {
    const newUser = await user.save();
    response.status(201).json(newUser);
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

exports.updateUser = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  // console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnn")
  // console.log(ls("token"))

  // console.log("TOKEN TESTS");
  // console.log("Req.role: ", request.role);
  // console.log("Req.id: ", request.id); //working
  User.findOne({ email: request.body.email })

    .then((data) => {
      if (data.role != request.role || data.email != request.email)
        next(Error("login first plz"));
      if (data == null) {
        throw new Error("email not found");
      }

      User.findByIdAndUpdate(data._id, {
        $set: {
          address: request.body.address,
          phone: request.body.phone,
          name: request.body.name,
        },
      }).then((data) => {
        if (data == null) next(new Error("User not fount"));
        response.json({ message: "data updated" });
        // else response.redirect("http://127.0.0.1:5500/index.html")
      });
    })
    .catch((error) => {
      // error.message = "error happened while login3";
      next(error.message);
    });
};

//send verification email
exports.sendVerificationEmail = async (req, res, next) => {
  try {
    const infoHash = {};
    const user = req.user;
    infoHash.user = user;
    infoHash.id = user._id;
    console.log(user);
    const key = eval(process.env.mail_key);
    const token = jwt.sign(infoHash, key, { expiresIn: "24h" });
    const link = `${process.env.BASE_URL}/user/verify/${user._id}/${token}`;
    //generate html code
    const html = `<h3 style="color:blue;">Hello, ${user.fullName}</h3>
    <p>E-mail verification was requested for this email address ${user.email}. If you requested this verification, click the link below :</p>
    <p>
    <p style="color:red;">This link is expired with in 24 hrs</p>
      <a style="background-color:blue; color:white;padding:10px 20px;text-decoration:none; font-weight:bold;border-radius:7px" href="${link}">Verify Your Email</a>
    </p>`;
    await sendEmail(user.email, "Verify Email", html);
    res.status(201).json({
      data: "Registration successful ,An Email sent to your account please verify",
      token,
    });
  } catch (error) {
    next(error);
  }
};
//verify email on link sent
exports.emailVerify = async (req, res, next) => {
  try {
    const key = process.env.mail_key;
    const user = await userVerify(req, key);
    await user.update({ verified: true });
    res.status(200).json("mail verified success");
  } catch (error) {
    next(error);
  }
};
