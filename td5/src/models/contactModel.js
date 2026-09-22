import { Schema, model } from 'mongoose';

// Setup schema
const contactSchema = new Schema({
    name: { type: String },
    age:  { type: Number }
});

export default model('Contact', contactSchema);