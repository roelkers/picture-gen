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
  width: Number,
  height: Number,
  name: String,
  strokes: [{
    begin: pointSchema,
    end: pointSchema,
    color: String,
    width: String
  }],
  points: [
    pointSchema
  ],
  lastEvent: {
    time: Date,
    data: mouseEventSchema,
    color: String,
    width: String
  } 
});
