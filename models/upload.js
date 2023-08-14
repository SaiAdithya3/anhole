import mongoose, {Schema} from "mongoose";


const uploadSchema = new Schema(
    {
        name: String,
        size: Number,
        type: String,

    },
   
);

const Upload =  mongoose.model("images", uploadSchema);

export default Upload;