const {Schema, model} = require('mongoose');

const AlumnoSchema = Schema({

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

AlumnoSchema.methods.toJSON = function() {
    const { _id, ...alumno } = this.toObject();
    alumno.uid = _id;
    return alumno;
}

module.exports = model('Alumno', AlumnoSchema);