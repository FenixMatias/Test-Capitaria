const {Schema, model} = require('mongoose');

const ProfesorSchema = Schema({

    rut:{
        type: Number,
        required: [true, 'Campo obligatorio']
    },
    nombre:{
        type: String,
        required: [true, 'Campo obligatorio']
    },
    apellido_paterno:{
        type: String,
        required: [true, 'Campo obligatorio']
    },
    apellido_materno:{
        type: String,
        required: [true, 'Campo obligatorio']
    },
    telefono:{
        type: Number,
        required: [true, 'Campo obligatorio']
    },
    direccion:{
        type: String,
        required: [true, 'Campo obligatorio']
    },
    email:{
        type: String,
        required: [true, 'Campo obligatorio'],
        unique: true
    },
    comuna:{
        type: Schema.Types.ObjectId,
        ref: 'Comuna',
        required: true
    }

});

ProfesorSchema.methods.toJSON = function() {
    const { _id, ...profesor } = this.toObject();
    profesor.uid = _id;
    return profesor;
}

module.exports = model('Profesor', ProfesorSchema);