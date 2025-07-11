const mongoose = require("mongoose");
const Review = require("./models/review.js"); // adjust if path is different

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  console.log("Connected to DB");

  const reviews = await Review.find({ comments: { $exists: true } });

  for (let r of reviews) {
    r.comment = r.comments;
    r.comments = undefined;
    await r.save();
    console.log(` Fixed review ${r._id}`);
  }

  console.log(" All done!");
  process.exit();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
