const {Schema, model} = require('mongoose');

const RegionSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'Campo obligatorio']
    }

});

RegionSchema.methods.toJSON = function() {
    const { _id, ...region } = this.toObject();
    region.uid = _id;
    return region
}

module.exports = model('Region', RegionSchema);