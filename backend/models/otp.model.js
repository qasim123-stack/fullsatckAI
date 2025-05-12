import mongoose from "mongoose";
const { Schema } = mongoose;

const otpSchema = new Schema(
    {
         userid: {
            type: String,
            required: true,
          },
          otp : {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
          expiresAt: {
            type: Date,
            default: Date.now,
            }
    });

    export default mongoose.model('Otp', otpSchema);
    
