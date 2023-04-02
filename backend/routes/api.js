const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Car = require("../models/car");
const User = require("../models/user");
const Mail = require("../classes/mail");
const auth = require("../middleware/auth");

// router.get('/eco', (req, res, next) => {
//   // This will return all the data, exposing only the id and action field to the client

// let response = null;
// new Promise(async (resolve, reject) => {
//   try {

//     response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=QTC',
//     {
//       headers: {
//         'X-CMC_PRO_API_KEY': 'ca6b7e02-7f64-4d77-86a2-729d02afa10b',
//       },
//     });
//   } catch(ex) {
//     response = null;
//     // error
//     console.log(ex);
//     reject(ex);
//   }
//   if (response) {
//     // success
//     const json = response.data;
//     // console.log(json);

//     resolve(json);
//     res.json(json);
//   }
// });

// });
router.post("/verifyauth", auth, (req, res) => {
  res.json({
    code: "200",
    type: "Success",
    message: "Welcome",
  });
});

router.post("/sign-up", (req, res, next) => {
  console.log(req.body);
  const { first_name, last_name, email } = req.body;

  // Validate user input
  if (!(email && first_name && last_name)) {
    res.json({
      type: "Error",
      message: "All inputs are required",
    });
    return;
  }
  User.find({ email: req.body.email })
    .then(async (data) => {
      console.log("Data", data);
      if (data.length == 0) {
        let mail = new Mail();
        const password = mail.sendRandomPassword(req.body.email);
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: encryptedPassword,
        };
        User.create(user).then((data) => {
          res.json({
            type: "Success",
            message:
              "You are successfully Registered.Check your email for password",
          });
        });
      } else {
        res.json({
          type: "Error",
          message: "Email already exist",
        });
      }
    })
    .catch(next);
});

router.post("/sign-in", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.json({
        type: "Error",
        message: "All inputs are required",
      });
      return;
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "120s",
        }
      );

      // save user token
      user.token = token;

      // user
      res.json(user);
      return;
    }
    res.json({
      type: "Error",
      message: "Invalid Credentials",
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/car", (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client

  Car.find({})
    .then((data) => {
      res.json(data);
    })
    .catch(next);
});

router.put("/car", (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client

  const update = req.body;
  Car.findByIdAndUpdate(update._id, { $set: update }, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch(next);
});

router.post("/car", (req, res, next) => {
  Car.create(req.body)
    .then((data) => {
      res.json(data);
    })

    .catch(next);
});

router.post("/deletecar", (req, res, next) => {
  const { id } = req.body;
  Car.findOneAndDelete({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch(next);
});

module.exports = router;
