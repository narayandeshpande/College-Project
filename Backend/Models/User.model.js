import mongoose  from "mongoose";
const userSchema=mongoose.Schema({
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
        workInfos: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'workInfo', // References the Workinfo model
                    default:[]
                },
            ],
            phone:{
                type:String,
                require:true
        },
        address:{
                type:String,
                require:true 
        },


},{timestamps:true})
const User=mongoose.model("User",userSchema)
export default User