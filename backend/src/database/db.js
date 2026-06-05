import mongoose from "mongoose";
const conectarBanco = async () => {
  
    console.log("Aguarde conectando com o banco de dados");

    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Atlas conectado"))
    .catch((error) => console.log(error))
   
};

export default conectarBanco;
