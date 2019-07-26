const Sequelize = require('sequelize'); //se crea la función de Sequelize para llamar a la función.

const connection = new Sequelize('travelagency', 'root', '',{ //se crea un nuevo sequelize (como un Schema). Primero creamos la base de datos donde trabajamos, luego el nombre de usuario que le hemos puesto (en SQL) y la contraseña que hemos puesto(En este caso no le hemos puesto). Siempre hay que acabar con una coma.
    host: 'localhost',
    dialect: 'mysql',
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

connection.authenticate() //devuelve una promesa de autentificación.
.then(() => {
console.log(' MYSQL Connection has been established successfully.'); //si todo va bien, se consoleará este mensaje
})
.catch(err => {console.error('Unable to connect to the database:', err); // en caso de error, el catch recogerá el error y consoleará el mensaje.
});

module.exports = connection;

/*Hay que copiar require('./config/Sequelize'); en el archivo app.js una vez creado todo esto para que funcione*/ 
