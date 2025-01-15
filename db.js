const mongoose = require('mongoose');

const uri ='mongodb+srv://admin:<db_password>@cluster0.dedej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectDB = async () => {
    try{
        await mongoose.connect(uri)
        .then(() => console.log("established a connection to the database"))
        .catch(err => console.log("something went wrong when connecting to the database, err"));
        }  catch(error){
            console.error('erreur de cconexion à mongodb:',error.message);
            process.exit(1); //arret le processus sin la connection échoue
        }
        
};
module.exports = connectDB;