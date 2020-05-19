
import { Schema, model, Document } from 'mongoose';



const afiliadoSchema = new Schema({

    nombres: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    apellidos: {
        type: String,
        required: [ true, 'El apellido es necesario' ]
    },

    documentoID: {
        type: String,
       
        required: [ true, 'El documento es necesario' ]
    },
    tipoDocumento: {
        type: String,
      
        required: [ true, 'El documento es necesario' ]
    },
    genero: {
        type: String,
      
        
    },
    telefono: {
        type: String,
       
        
    },
    fechaNacimiento: {
        type: Date,
        
        
    },
    provincia: {
        type: String,
      },
      canton: {
        type: String,
      },
      distrito: {
        type: String,
      },
  
    email: {
        type: String,
        
        required: [ true, 'El correo es necesario' ]
    },
    parentesco: {
        type: String,
        required:[true,'El paretensco es necesario']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    }
 
});






interface IAfiliado extends Document {
    nombres: string;
    apellidos: string;
    documentoID: string;
    tipoDocumento: string;
    genero:string;
    telefono:string;
    fechaNacimiento:Date;
    provincia: string;
    canton: string;
    distrito:string;
    email: string;
    parentesco:string;
    usuario:string;
   


   
}



export const Afiliado = model<IAfiliado>('Afiliado', afiliadoSchema);
