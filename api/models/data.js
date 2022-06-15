import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dataSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true},
    value: {
        amps: { type: Number, required: true, default: 0},
        voltage: { type: Number, required: true, default: 0},
        torque: { type: Number, required: true, default: 0}
    },
    date: {type: String, required: true}
})

export default mongoose.model('Data', dataSchema);