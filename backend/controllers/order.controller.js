import Order from "../models/orders.model.js";
import Gig from "../models/gigs.model.js";

export const createOrder=async(req,res)=>{
    try{
        const gig=await Gig.findById(req.params.gigId);
        if(!gig) return res.status(404).send("Gig not found");
        if(gig.userId===req.userId) return res.status(403).send("You cannot buy your own gig");


    
    const newOrder=new Order({
        gigId:gig._id,
        img:gig.img,
        title:gig.title,
        price:gig.price,
        sellerId:gig.userId,
        buyerId:req.userId,
        isCompleted:false,
        payment_intent:"temporary",
    })
    await newOrder.save();
    res.status(201).send("Order created successfully");
}catch(error){
    res.status(500).send("Error creating order");
}
}

export const getOrders=async(req,res)=>{
    try{
        const orders=await Order.find({
            ...(req.isSeller && {sellerId:req.userId}),
            ...(!req.isSeller && {buyerId:req.userId}),
        });
        res.status(200).send(orders);
    }catch(error){
        res.status(500).send("Error getting orders");
    }
}