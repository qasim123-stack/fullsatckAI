
import User from "../models/user.model.js";


export const deleteUser=async(req,res)=>{
    const user=await User.findById(req.params.id);
    if (req.userId !== user._id.toString()) {
        return next(createError(403, "You can delete only your account!"));
      }
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("deleted.");
    
        // await User.findByIdAndDelete(req.params.id);
        // res.status(200).send("user deleted successfully")

        
    
        
    
}


export const getUser=async(req,res)=>{
    
        const user=await User.findById(req.params.id);
        if(!user){
                return res.status(404).send("user not found");
                console.log("user not found");
        }
        res.status(200).send(user);
};

