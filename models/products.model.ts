import { Schema, model, Document } from 'mongoose';
import { Aseguradora } from './aseguradoras.model';




const ProductsSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    categoria: {
        type: String,
        required: [ true, 'La categoria es necesaria' ]
    },
    descripcion: {
        type: String,
        required: [ true, 'La categoria es necesaria' ]
    },
    precio: {
        type: Number,
        required: [ true, 'El precio es necesario' ]
    },
    terminos: {
        type: String,
        required: [ true, 'El precio es necesario' ]
    },
  
    status: {
        type: Boolean,
        required: [ true, 'El precio es necesario' ],
        default:true
    },
    aseguradora: {
        type: Schema.Types.ObjectId,
        ref: 'Aseguradora',
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    }
 
   
});


interface IProductos extends Document {
    nombre: string;
    categoria: [string];
    descripcion: string;
    precio:number;
    terminos: string;
    status: boolean;
    aseguradora:string
   }



export const Productos = model<IProductos>('Producto', ProductsSchema);