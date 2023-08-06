import mongoose, {Schema} from "mongoose";


const uploadSchema = new Schema(
    {
        name: String,
        size: Number,
        type: String,
        // img: {
        //     data: Buffer,
        //     contentType: String
        // }
    },
    {
        timestamps: true,
    }
);

const Upload = mongoose.models.Upload || mongoose.model("Upload", uploadSchema);

export default Upload;