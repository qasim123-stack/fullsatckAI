import AIAgent from "../models/aiagent.model.js"


export const createaiagent = async (req, res) => {
    try {
        const y=req.body.conversationConfig;
        const ai = new AIAgent({
            userId: req.userId,
            conversationConfig: {
                welcomeMessage:y.welcomeMessage,
                questions: [], // Initialize empty questions array
                faqs: [] // Initialize empty FAQs array
                // escalationRule can be added later when uncommented in model
            }
        });

        const savedAI = await ai.save();
        res.status(201).json(savedAI);
    } catch (err) {
        console.error("Error creating AI agent:", err);
        res.status(500).json({
            message: "Failed to create AI agent",
            error: err.message
        });
    }
}

