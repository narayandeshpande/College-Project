import mongoose from "mongoose";
const workInfoSchema=mongoose.Schema({
        workname:{
                type:String,
                require:true
        },
        date:{
                type:Date,
                require:true
        },
        stime:{
                type:String,
                require:true
        },
        ftime:{
                type:String,
                require:true
        },
        place:{
                type:String,
                require:true
        },
        money:{
                type:String,
                require:true
        },
        phone:{
                type:String,
                require:true
        },
        maplink:{
                type:String,
                require:true
        },
        noOfBrahman:{
                type:String,
                require:true
        },
        noOfBramhanrequired:{
                type:Number,
                require:true
        },
        noOfBramhanweave:{
                type:Number,
                require:true
        },
        note:{
                type:String,
                require:false
        },
        bramhan: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Brahman', // Referencing the User model by name
                default:[]
            }],

            createdByuser:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            createdBybramhin:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Brahman'
            }


},{timestamps:true})
const workInfo=mongoose.model("Workinfo",workInfoSchema)
export default workInfo
