import {Schema,model} from "mongoose";

const productSchema = new Schema({
    name:{type:String, required: true},
    price:{type: Number, required:true},
    offert:{type:Boolean, required: true},
    description:{type:String, required:true},
    img:{type:String, required:true}
})

export default model("Product", productSchema)