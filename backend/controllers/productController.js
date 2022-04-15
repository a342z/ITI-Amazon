const mongoose = require("mongoose");
const Products = require("./../models/product");
const express = require("express");
const { validationResult } = require("express-validator");

exports.show_products_category = (request, response, next) => {
  Products.find({ category_id: request.params.category_id })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
//--------------------------------------------------------------------------------------------
exports.show_products = (request, response, next) => {
  Products.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
//-----------------------------------------------------------------------------------------------
exports.random_products = (request, response, next) => {
  Products.find({})
    .limit(8)
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
//-----------------------------------------------------------------------------------------------
exports.search_products = (request, response, next) => {
  const s = request.body.word;
  const regex = new RegExp(s, "i");
  if (request.body.category_id == "") {
    Products.find({ name: { $regex: regex } })
      .then((data) => {
        response.status(200).json({ data });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    Products.find({
      name: { $regex: regex },
      category_id: request.body.category_id,
    })
      .then((data) => {
        response.status(200).json({ data });
      })
      .catch((error) => {
        next(error);
      });
  }
};
//-----------------------------------------------------------------------------------------------
exports.add_product = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  if (request.role == "admin" || request.role == "seller") {
    let object = new Products({
      name: request.body.name,
      price: request.body.price,
      brand: request.body.brand,
      category_id: request.body.category_id,
      discount: request.body.discount,
      reviews: request.body.reviews,
      description: request.body.description,
      images: request.body.images,
      properties: request.body.properties,
      quantity: request.body.quantity,
      rating: 5,
    });
    object
      .save()
      .then((data) => {
        response.status(201).json({ message: "added", data });
      })
      .catch((error) => next(error));
  } else {
    response
      .status(404)
      .json({ mesg: "You should be admin or seller to add product" });
  }

  // });
};
//--------------------------------------------------------------------------------------------------
//Deleting with id in body
// exports.delete_product = (request, response, next) => {
// if (request.role == "admin") {
//   Products.findByIdAndDelete({ _id: request.body.id })
//     .then((data) => {
//       response.status(201).json({ message: "deleted", data });
//     })
//     .catch((error) => {
//       next(error);
//     });
// } else if (request.role == "seller") {
//     Products.findById({ _id: request.body.id }).then((data) => {
//       if (request.id == data.seller.userID) {
//         Products.findByIdAndDelete({ _id: request.body.id })
//           .then((data) => {
//             response.status(201).json({ message: "deleted", data });
//           })
//           .catch((error) => {
//             next(error);
//           });
//       } else {
//         response.status(404).json({ message: "You dont owne this product " });
//       }
//     });
//   } else {
//     response
//       .status(404)
//       .json({ message: "You should be admin or seller to delete product " });
//   }
// };

//Deleting with id in params
exports.delete_product = (request, response, next) => {
  console.log("delete product function");
  if (request.role == "admin") {
    console.log("role is okay");
    Products.findByIdAndDelete({ _id: request.params.id })
      .then((data) => {
        console.log("id:", request.params.id);
        response.status(201).json({ message: "deleted", data });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    response.status(403).json({ message: "Not Autorized" });
  }
};

//-------------------------------------------------------------------------------------------------------
exports.update_stock = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  Products.findById({ _id: request.body.id })
    .then((data) => {
      console.log(data);
      if (data.quantity - request.body.amount >= 0) {
        Products.findByIdAndUpdate(
          { _id: request.body.id },
          {
            $set: {
              quantity: data.quantity - request.body.amount,
            },
          }
        )
          .then((data) => {
            response.status(201).json({ message: "stock updated", data });
          })
          .catch((error) => {
            next(error);
          });
      } else {
        response
          .status(201)
          .json({ message: "Not engouh in stock", "In Stock": data.quantity });
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.update_product = async (req, res) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
//-------------------------------------------------------------------------------------------------------------
// exports.update_product = (request, response, next) => {
//   if (request.role == "admin") {
//     Products.findByIdAndUpdate(
//       { _id: request.body.id },
//       {
//         $set: {
//           name: request.body.name,
//           price: request.body.price,
//           brand: request.body.brand,
//           category_id: request.body.category_id,
//           discount: request.body.discount,
//           reviews: request.body.reviews,
//           description: request.body.description,
//           images: request.body.images,
//           properties: request.body.properties,
//           quantity: request.body.quantity,
//           rating: request.body.rating,
//         },
//       }
//     )
//       .then((data) => {
//         response.status(201).json({ message: " updated", data });
//       })
//       .catch((error) => {
//         next(error);
//       });
//   } else if (request.role == "seller") {
//     Products.findById({ _id: request.body.id }).then((data) => {
//       if (request.id == data.seller.userID) {
//         Products.findByIdAndUpdate(
//           { _id: request.body.id },
//           {
//             $set: {
//               name: request.body.name,
//               price: request.body.price,
//               brand: request.body.brand,
//               category_id: request.body.category_id,
//               discount: request.body.discount,
//               reviews: request.body.reviews,
//               description: request.body.description,
//               images: request.body.images,
//               properties: request.body.properties,
//               quantity: request.body.quantity,
//               rating: request.body.rating,
//             },
//           }
//         )
//           .then((data) => {
//             response.status(201).json({ message: " updated", data });
//           })
//           .catch((error) => {
//             next(error);
//           });
//       } else {
//         response.status(404).json({ message: "You dont owne this product " });
//       }
//     });
//   } else {
//     response
//       .status(404)
//       .json({ message: "You should be admin or seller to delete product " });
//   }
// };
//------------------------------------------------------------------------------------------------------------
// exports.update_product = (request, response, next) => {
//   if (request.role == "admin") {
//     Products.findByIdAndUpdate(
//       { _id: request.body.id },
//       {
//         $set: {
//           name: request.body.name,
//           price: request.body.price,
//           brand: request.body.brand,
//           category_id: request.body.category_id,
//           discount: request.body.discount,
//           reviews: request.body.reviews,
//           description: request.body.description,
//           images: request.body.images,
//           properties: request.body.properties,
//           quantity: request.body.quantity,
//           seller: request.body.seller,
//         },
//       }
//     )
//       .then((data) => {
//         response.status(201).json({ message: " updated", data });
//       })
//       .catch((error) => {
//         next(error);
//       });
//   } else if (request.role == "seller") {
//     Products.findById({ _id: request.body.id }).then((data) => {
//       if (request.id == data.seller.userID) {
//         Products.findByIdAndUpdate(
//           { _id: request.body.id },
//           {
//             $set: {
//               name: request.body.name,
//               price: request.body.price,
//               brand: request.body.brand,
//               category_id: request.body.category_id,
//               discount: request.body.discount,
//               reviews: request.body.reviews,
//               description: request.body.description,
//               images: request.body.images,
//               properties: request.body.properties,
//               quantity: request.body.quantity,
//               seller: request.body.seller,
//             },
//           }
//         )
//           .then((data) => {
//             response.status(201).json({ message: " updated", data });
//           })
//           .catch((error) => {
//             next(error);
//           });
//       } else {
//         response.status(404).json({ message: "You dont owne this product " });
//       }
//     });
//   } else {
//     response
//       .status(404)
//       .json({ message: "You should be admin or seller to delete product " });
//   }
// };
//------------------------------------------------------------------------------------------------------------
exports.show_product = (request, response, next) => {
  Products.find({ _id: request.params.id })
    .populate("category_id")
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
//----------------------------------------------------------------------------------------------------------
exports.add_review = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  console.log(request.role);
  if (request.role == "customer") {
    Products.updateOne(
      { _id: request.body.id },
      { $push: { reviews: request.body.new_review } }
    )
      .then((data) => {
        response.status(201).json({ message: "review added", data });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    response.status(404).json({ message: "your are not signed as customer" });
  }
};
//-----------------------------------------------------------------------------------------------------------
exports.show_reviews = (request, response, next) => {
  Products.find({ "reviews.userID": request.body.id }, { "reviews.$": 1 })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
//------------------------------------------------------------------------------------------------------------
exports.edit_review = (request, response, next) => {
  Products.updateOne(
    { "reviews._id": request.body.id },
    {
      $set: {
        "reviews.$.title": request.body.title,
        "reviews.$.description": request.body.description,
        "reviews.$.rating": request.body.rating,
      },
    }
  )
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
//-----------------------------------------------------------------------------------------------------------
exports.delete_review = (request, response, next) => {
  Products.updateOne(
    { "reviews._id": request.body.id },
    {
      $pull: { reviews: { _id: request.body.id } },
    }
  )
    .then((data) => {
      response.status(200).json({ message: "deleted", data });
    })
    .catch((error) => {
      next(error);
    });
};
