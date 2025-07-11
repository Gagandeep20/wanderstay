const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listings.js");
const { isLoggedin, isAuthor, ValidateReview } = require("../middleware.js");
const ReviewController = require("../controllers/reviews.js");

router.post(
  "/",
  ValidateReview,
  isLoggedin,
  WrapAsync(ReviewController.createReview)
);

router.delete(
  "/:reviewid",
  isLoggedin,
  isAuthor,
  WrapAsync(ReviewController.destroyReview)
);

module.exports = router;
