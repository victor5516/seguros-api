import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';


const usuarioSchema = new Schema({

    nombres: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    apellidos: {
        type: String,
        required: [ true, 'El apellido es necesario' ]
    },
    avatar: {
        type: String,
        default: 'av-1.png'
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
      roles: {
        type: [String],
        default: ['user'],
      },
      verificado: {
        type: Boolean,
        default: true,
      },
    email: {
        type: String,
        unique: true,
        required: [ true, 'El correo es necesario' ]
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es necesaria']
    }

});


usuarioSchema.method('compararPassword', function( password: string = ''): boolean {

    if (  bcrypt.compareSync( password, this.password ) ) {
        return true;
    } else {
        return false;
    }

});



interface IUsuario extends Document {
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
    roles: string;
    verificado: boolean;
    email: string;
    password: string;
    avatar: string;


    compararPassword(password: string): boolean;
}



export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
