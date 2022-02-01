

const {Schema, model}=require('mongoose');

const AreaSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El area es obligatorio']
    }
});
AreaSchema.methods.toJSON = function(){
    const {__v, ...area}= this.toObject();
    return area;
}
module.exports = model('Area', AreaSchema) 