const connection = require('../config/Sequelize');
const Sequelize = require('sequelize');
const destination = connection.define('destination', {
    nombre: {
        type: Sequelize.STRING,
    }
})
destination.sync({
 logging: console.log(),
 /*force:true,*/ // esto lo que hace es tirar la tabla si no existe y la crea si no existe. Esto no es recomendable porque si ya hay una creada la sobrescribe
}).then(() => {
console.log('destination model has been syncronized with destination bases');
}).catch(console.log)

module.exports = destination;