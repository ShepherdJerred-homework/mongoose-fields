import * as mongoose from 'mongoose';
import './mongoose';
import { Song, SongSchema } from './song';

export interface Album {
  title: string;
  artist: string;
  date: Date;
  genre: string;
  song: Song[];
}

export interface AlbumDocument extends Album, mongoose.Document {
}

export let AlbumSchema: mongoose.Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  artist: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    index: true
  },
  date: {
    type: Date,
    required: true,
    default: () => new Date(),
    min: new Date(1900, 0, 1),
    validate: {
      validator: (date: Date) => date <= new Date(),
      message: "{VALUE} is after now"
    }
  },
  genre: {
    type: String,
    required: true,
    enum: [
      'Pop',
      'Rock',
      'Jazz',
      'Blues',
      'Country',
      'Classical',
      'Reggae',
      'Disco'
    ]
  },
  song: {
    type: [SongSchema],
    required: true,
    ref: 'Song'
  }
});

export let AlbumModel: mongoose.Model<AlbumDocument> = mongoose.model<AlbumDocument>('Album', AlbumSchema);
