import mongoose from 'mongoose';
const { Schema } = mongoose;
//This is the way how we show mongoose how my data look like
const NoteSchema = new Schema({
    title: { type: String, required: true}, 
    description: { type: String, required: true}, 
    date: { type: Date, default: Date.now}, // add the actual date when the note was created
    user: { type: String }, // bind the user id with his notes
});

export default mongoose.model('Note', NoteSchema);
