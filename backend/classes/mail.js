var nodemailer = require("nodemailer");

const Mail = class {
  constructor() {}
  generatePassword() {
    var length = 12,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  sendRandomPassword(toEmail) {
    const password = this.generatePassword();
    console.log(process.env.email, process.env.password);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "example@gmail.com",
        pass: "<password>",
      },
    });

    var mailOptions = {
      from: this.email,
      to: toEmail,
      subject: "Password",
      text: `Hi, This is your system genertaed password ${password}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return password;
  }
};

module.exports = Mail;
