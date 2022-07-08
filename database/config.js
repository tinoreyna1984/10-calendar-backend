const mongoose = require("mongoose");

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('DB ONLINE')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la base de datos');
    }
}

module.exports = { dbConnection };
