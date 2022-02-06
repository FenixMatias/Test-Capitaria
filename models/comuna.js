const {Schema, model} = require('mongoose');

const ComunaSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'Campo obligatorio']
    },
    region:{
        type: Schema.Types.ObjectId,
        ref: 'Region',
        required: true
    }

});

ComunaSchema.methods.toJSON = function() {
    const { _id, ...comuna } = this.toObject();
    comuna.uid = _id;
    return comuna;
}

module.exports = model('Comuna', ComunaSchema);