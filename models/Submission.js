import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    carModel: { type: String, required: true, minlength: 3 },
    price: { type: Number, required: true },
    phoneNumber: { type: String, required: true, length: 11 },
    city: { type: String, required: true },
    imageUrls: [{ type: String }],
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
