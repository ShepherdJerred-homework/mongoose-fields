import * as mongoose from 'mongoose';

export interface Song {
  title: string;
  length: string;
}

export interface SongDocument extends Song, mongoose.Document {
}

export let SongSchema: mongoose.Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  length: {
    type: String,
    required: true,
    match: /^[0-9]{2}:[0-9]{2}/
  }
});

export let GuessModel: mongoose.Model<SongDocument> = mongoose.model<SongDocument>('Song', SongSchema);
