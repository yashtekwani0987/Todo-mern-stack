import mongoose from "mongoose";
const {Schema} = mongoose

const TodoSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
            type:String,
            required:true
    },
    done:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true}
)

const Note = mongoose.model('note' , TodoSchema)
export default Note