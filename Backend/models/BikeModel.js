const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
name :{
    type:String,
    required:[true,"Please enter Product Name"]
},


description:{
    type:String,
    required:[true,"Please enter Product Description"]

},

price:{

    type:Number,
    require:[true,"Please Enter product Price"],
    maxLength:[8,"Price cannot be more than 8 characters"]
},
ratings:{
    type:Number,
    default:0
},
images:[
{
        public_id:{
            type:String,
            required:true
    
        },
        url:{
            type:String,
            required:true
        }
    
}
],
category:{
    type:String,
    required:[true,"Please enter Product Category"]
},
Stock:{
    type:Number,
    required:[true,"Please enter product Stock"],
    maxLength:[4, "Stock cannot exceed 4 characers"],
    default:1
},
numofReviews:{
    type:Number,
    default:0
},
reviews:[
{
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    
    name:{
        type:String,
        required:true
    },

    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    }

}
],
user:
{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true

},

createdAt:{
    type:Date,
    default:Date.now
}    
})

module.exports = mongoose.model("Product", productSchema);
