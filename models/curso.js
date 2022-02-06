const {Schema, model} = require('mongoose');

const CursoSchema = Schema({

    nombre_curso:{
        type: String,
        required: [true, 'Campo obligatorio']
    },
    profesor:{
        type: Schema.Types.ObjectId,
        ref: 'Profesor',
        required: true
    }

});

CursoSchema.methods.toJSON = function() {
    const { _id, ...curso } = this.toObject();
    curso.uid = _id;
    return curso;
}

module.exports = model('Curso', CursoSchema);