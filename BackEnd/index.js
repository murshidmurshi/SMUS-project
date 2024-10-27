const express=require("express")
const cors=require("cors")
const ConnectMongo=require('./db')
ConnectMongo()

const app=express();
app.use(express.json())
app.use(cors())

const PORT=3000;

app.use('/api/admin',require('./Routes/Admin_routes'))
app.use('/api/student',require('./Routes/Student_routes'))
app.use('/api/teacher',require('./Routes/Teacher_routes'))

app.listen(PORT,()=>(
    console.log(`Successfully Running on Port `+PORT)
))


// app.get('/get',(req,res)=>{
//     res.json({message:'this is Get'})
//     console.log('this is Get Method to get the data');
// })
