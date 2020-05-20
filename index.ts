import Server from './classes/server';
import userRoutes from './routes/usuario';
import afiliadosRoutes from './routes/afiliados';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import Helmet from "helmet";
import * as helmet from 'helmet';
import fileUpload from 'express-fileupload'
import cardRoutes from './routes/cards';
const server = new Server();
server.app.use(Helmet());

// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );
// CORS config
server.app.use( cors ({ origin:true, credentials:true}))

// Rutas de mi app
server.app.use('/user', userRoutes );
server.app.use('/afiliados',  afiliadosRoutes);
server.app.use('/cards',  cardRoutes);
//FileUpload
server.app.use(fileUpload({useTempFiles:true}));

// Conectar DB
mongoose.connect('mongodb://localhost:27017/autoExpediblesApi', 
                { useNewUrlParser: true, useCreateIndex: true }, ( err ) => {

   if ( err ) throw err;

   console.log('Base de datos ONLINE');
})

// Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});