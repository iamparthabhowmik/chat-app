import { mongoose } from "mongoose";

const chatModel = mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pic: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-group-icon-png-image_1796653.jpg",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

export default Chat;
