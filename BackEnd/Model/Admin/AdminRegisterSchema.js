const mongoose=require('mongoose')
const {Schema}=mongoose

const AdminRegLoginSchema=new Schema({
    admin_id:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

module.exports=mongoose.model('admin-register',AdminRegLoginSchema);
