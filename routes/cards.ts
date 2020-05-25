import { Router, Request, Response } from 'express';
import { Card } from '../models/cards.model';


const cardRoutes = Router();


// Crear un card
cardRoutes.post('/create/:userID', ( req: Request, res: Response ) => {
    const body = req.body;
    const card = {
       
        number   : req.body.number,
        nombre : req.body.nombre,
        cvc: req.body.cvc,
        type: req.body.type,
        fechaV:   new Date(req.body.fechaV),
        usuario: req.params.userID
    
    }; 
    Card.create( card ).then(  async cardDB => {
        
        await cardDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            cardDB,
        });


    }).catch( err => {
        res.json({
            ok: false,
            err,
            card,
            
        });
    });

});
cardRoutes.get('/listar/:userID', ( req: Request, res: Response ) => { 

    const userID = req.params.userID;
    Card.find({ usuario: userID },( err, cardDB ) => {
        if ( err ) throw err;
        if(!cardDB){
 
            return res.json({
                ok: false,
                mensaje: 'afiliado no existe'
            });
        }else{
         return  res.json({
           ok: true,
           cardDB
        })
        }
     
    })
});

cardRoutes.get('/:userID', ( req: Request, res: Response ) => {
    const userID = req.params.userID;
    Card.findById( userID,( err, cardDB ) => {
        if ( err ) throw err;
        if(!cardDB){

            return res.json({
                ok: false,
                mensaje: 'afiliado no existe'
            });
        }else{ 
         return  res.json({
           ok: true,
           cardDB 
        })
        }
     
    })

});

cardRoutes.post('/update/:tarjetaID', ( req: Request, res: Response ) => {
    const tarjetaID = req.params.tarjetaID;
    const card = {
       
        number   : req.body.number,
        nombre : req.body.nombre,
        cvc: req.body.cvc,
        type: req.body.type,
        fechaV:   new Date(req.body.fechaV),
        
    
    }; 
        
        Card.findByIdAndUpdate(tarjetaID, card, { new: true }, (err, cardDB) => {
        
            if ( err ) throw err;
    
            if ( !cardDB ) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe un afiliado con ese ID'
                });
            }else{
                return   res.json({
                ok: true, 
                card: cardDB
            });
        }
    
        })
});



cardRoutes.delete('/delete/:id', ( req: Request, res: Response ) => {

    Card.findByIdAndRemove(req.params.id, (err, data) => {
        if ( err ) throw err;
        res.json({
            ok:true,
            msg: data
          
        });
    });

});

export default cardRoutes;