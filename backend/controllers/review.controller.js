import Review from "../models/reviews.model.js";
import Gig from "../models/gigs.model.js";

export const createReview = async (req, res) => {
  if (req.isSeller)
    return res.status(403).send("you are not allowed to create a review")

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
//     const review = await Review.findOne({
//       gigId: req.body.gigId,
//       userId: req.userId,
//     });

//     if (review){
//         console.log("You have already created a review for this gig!");
//         return res.status(403).send("You have already created a review for this gig!")
       
//     };

    //TODO: check if the user purchased the gig.

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
   console.log(err);
    res.status(500).send(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
    
  }
