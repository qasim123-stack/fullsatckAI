import { title } from "process";
import Gig from "../models/gigs.model.js";


export const createGig=async(req,res)=>{
    console.log(req.body);
    if (!req.isSeller)
        return res.status(403).json("Only sellers can create gigs");
      
      const gig=new Gig({
        userId:req.userId,
        
        ...req.body,
      });
      try{
       
        const result = await gig.save();
        res.status(201).send("Gig created successfully");
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

export const deleteGig=async(req,res)=>{
    try{
    const gig=await Gig.findbyId(req.params.id);
    if(!gig) return res.status(404).json("Gig not found");
    if(gig.userId!==req.userId) return res.status(403).json("You can delete only your gig");
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).json("Gig deleted successfully");
}catch(error){
    res.status(500).json({message:error.message});
}
}
export const getGig = async (req, res, next) => {
    try {
      const gig = await Gig.findById(req.params.id);
      if (!gig) next(createError(404, "Gig not found!"));
      res.status(200).send(gig);
    } catch (err) {
      res.status(500).json({message:err.message});
    }
  };
  export const getGigs = async (req, res, next) => {
    const q=req.query;
    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.cat && { cat: q.cat }),
        ...((q.min || q.max) && {
          price: {
            ...(q.min && { $gt: q.min }),
            ...(q.max && { $lt: q.max }),
          },
        }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
      };
    try{
        const gigs=await Gig.find(filters)
        res.status(200).send(gigs);
    }catch(error){
        res.status(500).json({message:error.message});
    }


  };






