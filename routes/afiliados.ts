import { Router, Request, Response } from 'express';
import { Afiliado } from '../models/afiliados.model';

const afiliadosRoutes = Router();


// Crear un afiliado
afiliadosRoutes.post('/create/:userID', ( req: Request, res: Response ) => {

    const afiliado = {
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
        parentesco: req.body.parentesco, 
        usuario: req.params.userID
    
    }; 
    
 
  
    Afiliado.create( afiliado ).then(  async afiliadoDB => {
        
        await afiliadoDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            afiliadoDB,
        });


    }).catch( err => {
        res.json({
            ok: false,
            err,
            afiliado
        });
    });




});

afiliadosRoutes.get('/:userID', ( req: Request, res: Response ) => {
    const userID = req.params.userID;
    Afiliado.find({ usuario: userID },( err, afiliadoDB ) => {
        if ( err ) throw err;
        if(!afiliadoDB){

            return res.json({
                ok: false,
                mensaje: 'afiliado no existe'
            });
        }else{
         return  res.json({
           ok: true,
           afiliadoDB
        })
        }
     
    })
});
afiliadosRoutes.get('/afiliado/:userID', ( req: Request, res: Response ) => {
    const userID = req.params.userID;
    Afiliado.findById( userID,( err, afiliadoDB ) => {
        if ( err ) throw err;
        if(!afiliadoDB){

            return res.json({
                ok: false,
                mensaje: 'afiliado no existe'
            });
        }else{ 
         return  res.json({
           ok: true,
           afiliadoDB 
        })
        }
     
    })
});
afiliadosRoutes.post('/update/:afiliadoID', ( req: Request, res: Response ) => {
    const afiliadoID = req.params.afiliadoID;
   const afiliado = {

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
        parentesco: req.body.parentesco, 
        
    }
    Afiliado.findByIdAndUpdate(afiliadoID, afiliado, { new: true }, (err, afiliadoDB) => {
        
        if ( err ) throw err;

        if ( !afiliadoDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un afiliado con ese ID'
            });
        }else{
            return   res.json({
            ok: true, 
            afiliado: afiliadoDB
        });
    }

    })


});


afiliadosRoutes.delete('/delete/:id', ( req: Request, res: Response ) => {

    Afiliado.findByIdAndRemove(req.params.id, (err, data) => {
        if ( err ) throw err;
        res.json({
            ok:true,
            msg: data
          
        });
    });

});

export default afiliadosRoutes;