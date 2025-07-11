const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const Listing = require("../models/listings.js");
const ExpressError = require("../utils/ExpressError.js");
const { ListingSchema } = require("../schema.js");
const { isLoggedin, ValidateListing, isOwner } = require("../middleware.js");
const ListingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(WrapAsync(ListingController.index))
  .post(
    isLoggedin,
    upload.single("listing[image]"),
    ValidateListing,
    WrapAsync(ListingController.createListing)
  );

router.get("/new", isLoggedin, ListingController.renderNewForm);

router
  .route("/:id")
  .get(WrapAsync(ListingController.showListing))
  .put(
    isLoggedin,
    isOwner,
    upload.single("listing[image]"),
    ValidateListing,

    WrapAsync(ListingController.updateListing)
  )
  .delete(isLoggedin, isOwner, WrapAsync(ListingController.deleteListing));

router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  WrapAsync(ListingController.renderEditForm)
);

module.exports = router;
