import mongoose from "mongoose";
const BramhanSchema=mongoose.Schema({
        fullname:{
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
        worksaceept:[
                {
                        type:mongoose.Schema.Types.ObjectId,
                        ref:'workInfo',
                        default:[]
                }
        ],
        workscreate:[
                {
                        type:mongoose.Schema.Types.ObjectId,
                        ref:'workInfo',
                        default:[]
                }
        ]   

},{timestamps:true})
const Brahman=mongoose.model("Bramahn",BramhanSchema)
export default Brahman