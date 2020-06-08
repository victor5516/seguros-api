
import { Schema, model, Document } from 'mongoose';



const aseguradoraSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    telefonos: {
        type: [String],
       
    },
    email: {
    type: String,
    
    required: [ true, 'El correo es necesario' ]
    },
    webSite: {
    type: String,
    
   
        },
    contactos:[{
          
            nombres:{
                type:String,
            },
            telefonos:[{
                type:String,
            }],
            email:{
                    type:String,
                }
           
        }],
    status: {
     type: Boolean,
     default: true,
            
           
                },
});



interface IAseguradora extends Document {
    nombre: string;
    telefonos: [string];
    email: string;
    webSite:string;
    status: boolean;
    contactos:[{
       
        nombres:{
            type:String,
        },
        telefonos:[{
            type:String,
        }],
        email:{
                type:String,
            }
       
    }]
    
   }



export const Aseguradora = model<IAseguradora>('Aseguradora', aseguradoraSchema);