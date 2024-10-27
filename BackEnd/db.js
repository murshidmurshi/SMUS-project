const mongoose=require('mongoose');


const MONGO_URL='mongodb://localhost:27017/Yen-Project';

const ConnectMongo=async(req,res)=>{
   await  mongoose.connect(MONGO_URL)
    console.log('Mongoose Connected Successfuly');

}

module.exports=ConnectMongo




