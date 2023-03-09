const mongoose=require('mongoose')
const connectdb=()=>{
    try {
        mongoose.connect(process.env.mongo_url)
        console.log('database succesfully connected')
    } catch (error) {
        console.log('database is not connected')
    }
}

module.exports=connectdb