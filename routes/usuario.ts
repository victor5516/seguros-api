import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcryptjs';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();


// Login
userRoutes.post('/login', (req: Request, res: Response ) => {

    const body = req.body;

    Usuario.findOne({ email: body.email }, ( err, userDB ) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }

        if ( userDB.compararPassword( body.password ) ) {

            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombres: userDB.nombres,
                apellidos: userDB.apellidos,
                documentoID: userDB.documentoID,
                tipoDocumento: userDB.tipoDocumento,
                genero: userDB.genero,
                telefono: userDB.telefono,
                fechaNacimiento: userDB.fechaNacimiento,
                provincia: userDB.provincia,
                canton: userDB.canton,
                distrito: userDB.distrito,

                email: userDB.email,
                avatar: userDB.avatar,
               

            });

          const  user = {
            fullName: userDB.nombres,
            email: userDB.email,
            id: userDB._id,
            }

            res.json({
                ok: true,
                token: tokenUser,
                user
                
            });

        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos ***'
            });
        }


    })


});



// Crear un usuario
userRoutes.post('/create', ( req: Request, res: Response ) => {

    const user = {
        nombres  : req.body.firstName,
        apellidos   : req.body.lastName,
        documentoID: req.body.documentID,
        tipoDocumento: req.body.documentType,
        genero: req.body.gender,
        telefono:  req.body.phoneNumber,
        fechaNacimiento:   new Date(req.body.fechaNacimiento),
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        email    : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10),
        avatar   : req.body.avatar
    };
    
    Usuario.create( user ).then( userDB => {

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombres: userDB.nombres,
            apellidos: userDB.apellidos,
            documentoID: userDB.documentoID,
            tipoDocumento: userDB.tipoDocumento,
            genero: userDB.genero,
            telefono: userDB.telefono,
            fechaNacimiento: userDB.fechaNacimiento,
            provincia: userDB.provincia,
            canton: userDB.canton,
            distrito: userDB.distrito,

            email: userDB.email,
            avatar: userDB.avatar,
            password: userDB.password,
        });

        res.json({
            ok: true,
            token: tokenUser
        });


    }).catch( err => {
        res.json({
            ok: false,
            err,
            user
        });
    });




});

//Obtener Usuario
userRoutes.get('/:userid', (req: any, res: Response ) => {

    const userId = req.params.userid;
   
    Usuario.findById(userId, function(err, userDB ) {
        if (err) throw err;
        const user = {
            _id: userDB!._id,
            nombres: userDB!.nombres,
            apellidos: userDB!.apellidos,
            documentoID: userDB!.documentoID,
            tipoDocumento: userDB!.tipoDocumento,
            genero: userDB!.genero,
            telefono: userDB!.telefono,
            fechaNacimiento: userDB!.fechaNacimiento,
            provincia: userDB!.provincia,
            canton: userDB!.canton,
            distrito: userDB!.distrito,

            email: userDB!.email,
            avatar: userDB!.avatar,
            password: userDB!.password,
        };
    
        res.json({
            ok: true,
            user
        });
        
    })
 

});

// Actualizar usuario
userRoutes.post('/update/:userid', (req: any, res: Response ) => {
    const userId = req.params.userid;
    const user = {
        nombres  : req.body.firstName,
        apellidos   : req.body.lastName,
        documentoID: req.body.documentID,
        tipoDocumento: req.body.documentType,
        genero: req.body.gender,
        telefono:  req.body.phoneNumber,
        fechaNacimiento:   new Date(req.body.birthDate),
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        email    : req.body.email,
        
    };

    Usuario.findByIdAndUpdate(userId, user, { new: true }, (err, userDB) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombres: userDB.nombres,
            apellidos: userDB.apellidos,
            documentoID: userDB.documentoID,
            tipoDocumento: userDB.tipoDocumento,
            genero: userDB.genero,
            telefono: userDB.telefono,
            fechaNacimiento: userDB.fechaNacimiento,
            provincia: userDB.provincia,
            canton: userDB.canton,
            distrito: userDB.distrito,

            email: userDB.email,
            avatar: userDB.avatar,
        
        });

        res.json({
            ok: true,
            token: tokenUser
        });


    });

});


export default userRoutes;