const {Schema, model} = require('mongoose');

const NotaSchema = Schema({

    nota_1:{
        type: Number,
        required: [true, 'Campo obligatorio']
    },
    nota_2:{
        type: Number,
        required: [true, 'Campo obligatorio']
    },
    nota_3:{
        type: Number,
        required: [true, 'Campo obligatorio']
    },
    nota_4:{
        type: Number,
        required: [true, 'Campo obligatorio']
    },
    nota_5:{
        type: Number,
        required: [true, 'Campo obligatorio']
    },
    promedio:{
        type: Number,
        required: [true, 'Campo obligatorio']
    },
    alumno:{
        type: Schema.Types.ObjectId,
        ref: 'Alumno',
        required: true
    },
    curso:{
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    }
    
    

});

NotaSchema.methods.toJSON = function() {
    const { _id, ...nota } = this.toObject();
    nota.uid = _id;
    return nota;
}

module.exports = model('Nota', NotaSchema);