// const User = require("../models/user");

// exports.getUsers = (request, response, next) => {
//   if (request.role != "admin")
//     throw new Error("Are you an admin? ");

//   User.find()
//     .then((data) => {
//       if (data == null) {
//         throw new Error("There is no users");
//       }

//       response.json(data);
//     })
//     .catch((error) => {
//       next(error.message);
//     });
// };
