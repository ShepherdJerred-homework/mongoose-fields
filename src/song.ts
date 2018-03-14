import * as mongoose from 'mongoose';

export interface Song {
  title: string;
  length: string;
}

export interface SongDocument extends Song, mongoose.Document {
}

export let SongSchema: mongoose.Schema = new mongoose.Schema({
  title: String,
  length: String
});

export let GuessModel: mongoose.Model<SongDocument> = mongoose.model<SongDocument>('Song', SongSchema);
