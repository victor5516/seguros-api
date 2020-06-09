import { Router, Request, Response } from 'express';
import { Aseguradora } from '../models/aseguradoras.model';
const AseguradorasRoutes = Router();



// Crear una aseguradora
AseguradorasRoutes.post('/create', ( req: Request, res: Response ) => {
    const aseguradora = {
        nombre  : req.body.nombre,
        telefonos   : req.body.telefonos,
        email    : req.body.email,
        webSite: req.body.website,
        contactos: req.body.contacto
    };  
    
      

 
    

  
    Aseguradora.create( aseguradora ).then( aseguradoraDB => {
        
   
        res.json({
            ok: true,
            aseguradoraDB,
        });


    }).catch( err => {
        res.json({
            ok: false,
            err,
            aseguradora
        });
    });




});


//detalle de aseguradora
AseguradorasRoutes.get('/:aseguradoraID', ( req: Request, res: Response ) => {
    const aseguradoraID = req.params.aseguradoraID;
    Aseguradora.findById( aseguradoraID ,( err, aseguradoraDB ) => {
        if ( err ) throw err;
        if(!aseguradoraDB){

            return res.json({
                ok: false,
                mensaje: 'afiliado no existe'
            });
        }else{
         return  res.json({
           ok: true,
           aseguradoraDB
        })
        }
     
    })
});







//listas  de aseguradora
AseguradorasRoutes.get('/', async (req: any, res: Response) => {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const aseguradoras = await Aseguradora.find()
                            .sort({ _id: -1 })
                            .skip( skip )
                            .limit(10)
                            .exec();


    res.json({
        ok: true,
        pagina,
        aseguradoras
    });


});


AseguradorasRoutes.post('/update/:aseguradoraID', ( req: Request, res: Response ) => {
    const afiliadoID = req.params.aseguradoraID;
    const aseguradora = {
        nombre  : req.body.nombre,
        telefonos   : req.body.telefonos,
        email    : req.body.email,
        webSite: req.body.website,
        contactos: req.body.contacto
    };  
    

    Aseguradora.findByIdAndUpdate(afiliadoID, aseguradora, { new: true }, (err, aseguradoraDB) => {
        
        if ( err ) throw err;

        if ( !aseguradoraDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un afiliado con ese ID'
            });
        }else{
            return   res.json({
            ok: true, 
            afiliado: aseguradoraDB
        });
    }

    })

});



AseguradorasRoutes.delete('/delete/:id', ( req: Request, res: Response ) => {

    Aseguradora.findByIdAndRemove(req.params.id, (err, data) => {
        if ( err ) throw err;
        res.json({
            ok:true,
            msg: data
          
        });
    });

});

export default AseguradorasRoutes;