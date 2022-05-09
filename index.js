require('dotenv').config()
const sequelize = require('./db')
const app = require('./app');
const models = require('./models/models');
const port = process.env.port || 5000;
const start = async() =>{
    try{
       await sequelize.authenticate();
       await sequelize.sync();
        app.listen(port, function(){
            console.log(`API get started port ${port}`)
        })
    }
    catch(e){
        console.log(e);
    }
 }
start()