import { Router, Request, Response } from 'express';
import { Productos } from '../models/products.model';
const ProductsRoutes = Router();


// Crear una aseguradora
ProductsRoutes.post('/create', ( req: Request, res: Response ) => {
    const aseguradora = {
        nombre  : req.body.nombre,
        telefonos   : req.body.telefonos,
        email    : req.body.email,
        webSite: req.body.website,
        contactos: req.body.contacto
    };  
    
      

 
    

  
    Productos.create( aseguradora ).then( aseguradoraDB => {
        
   
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