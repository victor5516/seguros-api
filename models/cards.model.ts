import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
const cardSchema = new Schema({
    number: {
        type: String,
        required: [ true, 'El numero es necesario' ]
    },  
    nombre:{
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    cvc:{
        type: String,
        required: [ true, 'El numero es necesario' ]
    },
    fechaV:{
        type: Date,
        required: [ true, 'La fecha es necesaria' ]
    },
    type:{
        type: String,
        required: [ true, 'La fecha es necesaria' ]
    },
    
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    },
});

interface ICard extends Document{
    numero: string;
    nombre:string;
    cvc:string;
    fechaV:Date;
    type:string;
    usuario:string;
}

export const Card = model<ICard>('Card', cardSchema);