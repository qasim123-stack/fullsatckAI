// MongoDB Schema (AIAgent.js)
import mongoose from "mongoose";
const { Schema } = mongoose;
const AIAgentSchema = new Schema({
    // ...existing fields
    userId: {
        type: String,
        required: true,
      },
    
    conversationConfig: {
      welcomeMessage: String,

       
    


      questions: [{
        question: String,
        key: String, // e.g., "budget", "projectType"
        validation: String // optional regex/type validation
      }],
      faqs: [{
        question: String,
        answer: String
      }],
    //   escalationRule: {
    //     triggerKeywords: [String], // e.g., ["talk to human", "help"]
    //     message: String // "Transferring you to the seller..."
    //   }
    }
  });

  export default mongoose.model('AIAgent', AIAgentSchema);