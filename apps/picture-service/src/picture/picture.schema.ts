import * as mongoose from 'mongoose';

const pointSchema = new mongoose.Schema({
  x: Number,
  y: Number
})

const mouseEventSchema = new mongoose.Schema({
  type: String,
  x: Number,
  y: Number,
  pictureId: String
})

export const PictureSchema = new mongoose.Schema({
  id: String,
  name: String,
  strokes: [{
    begin: pointSchema,
    end: pointSchema,
    color: String
  }],
  points: [
    pointSchema
  ],
  lastEvent: {
    time: Date,
    data: mouseEventSchema,
    color: String
  } 
});
