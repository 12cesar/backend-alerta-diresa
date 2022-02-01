const {Schema, model}=require('mongoose');

const AlertaSchema = Schema({
    personal:{
        type: String,
        required: [true, 'El personal es obligatorio']
    },
    area:{
        type: Schema.Types.ObjectId,
        ref:'Area',
        required:true
    },
    descripcion:{
        type: String,
        required: [true, 'La descripcion es obligatorio']
    },
    estado:{
        type: Boolean,
        default: false,
    },
    atendido:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:false
    }
});
AlertaSchema.methods.toJSON = function(){
    const {__v, ...alerta}= this.toObject();
    return alerta;
}
module.exports = model('Alerta', AlertaSchema) 