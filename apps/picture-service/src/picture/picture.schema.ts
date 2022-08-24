import * as mongoose from 'mongoose';

const pointSchema = new mongoose.Schema({
  x: Number,
  y: Number
})

export const PictureSchema = new mongoose.Schema({
  id: String,
  name: String,
  strokes: [{
    begin: pointSchema,
    end: pointSchema,
  }],
  points: [
    pointSchema
  ],
  color: String
});
