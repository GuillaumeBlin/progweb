import { Schema, model } from 'mongoose';

// Setup schema
const userSchema = new Schema({
    email: { type: String },
    password:  { type: String }
});

export default model('User', userSchema);
