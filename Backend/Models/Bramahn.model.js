import mongoose from "mongoose";
const BramhanSchema=mongoose.Schema({
        fullName:{
                type:String,
                require:true
        },
        email:{
                type:String,
                require:true,
                unique:true
        },
        password:{
                type:String,
                require:true
        },
        phone:{
                type:String,
                require:true
        },
        address:{
                type:String,
                require:true 
        },    
        works:[
                {
                        type:mongoose.Schema.Types.ObjectId,
                        ref:'workInfo',
                        default:[]
                }
        ]  

},{timestamps:true})
const Brahman=mongoose.model("Bramahn",BramhanSchema)
export default Brahman