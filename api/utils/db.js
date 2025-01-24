const mongoose=require('mongoose');

const Uri=process.env.MONGODB_URI;

async function connection() {
    try {
        await mongoose.connect(Uri);
        console.log("Connection to database is successful");
        
    } catch (error) {
        console.log(error);
    }
}

module.exports=connection;