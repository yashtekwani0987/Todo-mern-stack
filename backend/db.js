import mongoose from "mongoose";

const URL = 'mongodb://localhost:27017/todo'

const connectMongo = ()=>{
    mongoose.connect(URL , ()=>{
        console.log('connected to Mongo')
    })
}
export default connectMongo