import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { AlbumDocument, AlbumModel } from '../src/album';
import { ValidationError } from 'mongoose';

let expect = chai.expect;
chai.use(chaiAsPromised);

describe('mongoose ', () => {
  let album: AlbumDocument;

  it('should save albums', async () => {
    let now = new Date();
    album = new AlbumModel({
      title: 'My Title',
      artist: 'My Artist',
      date: now,
      genre: 'Pop',
      song: []
    });
    let savedAlbum = await album.save();
    expect(savedAlbum.title).to.equal('My Title');
    expect(savedAlbum.artist).to.equal('My Artist');
    expect(savedAlbum.date).to.equal(now);
    expect(savedAlbum.genre).to.equal('Pop');
    expect(savedAlbum.song).to.eql([]);
  });

  it('should throw an error when not including required fields', async () => {
    album = new AlbumModel({
      artist: 'My Artist',
      date: new Date(),
      genre: 'Pop',
      song: []
    });
    expect(album.save()).to.eventually.be.rejectedWith(ValidationError);

    album = new AlbumModel({
      title: 'My Title',
      artist: 'My Artist',
      date: new Date(),
      genre: 'Pop',
      song: []
    });
    expect(album.save()).to.eventually.be.rejectedWith(ValidationError);

    album = new AlbumModel({
      title: 'My Title',
      date: new Date(),
      genre: 'Pop',
      song: []
    });
    expect(album.save()).to.eventually.be.rejectedWith(ValidationError);

    album = new AlbumModel({
      title: 'My Title',
      artist: 'My Artist',
      genre: 'Pop',
      song: []
    });
    expect(album.save()).to.eventually.be.rejectedWith(ValidationError);

    album = new AlbumModel({
      title: 'My Title',
      artist: 'My Artist',
      date: new Date(),
      song: []
    });
    expect(album.save()).to.eventually.be.rejectedWith(ValidationError);

    album = new AlbumModel({
      title: 'My Title',
      artist: 'My Artist',
      date: new Date(),
      genre: 'Pop'
    });
    expect(album.save()).to.eventually.be.rejectedWith(ValidationError);
  });

  describe('title', () => {
    it('should throw an error when including a title longer than 100 characters', async () => {
      album = new AlbumModel({
        title: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
        artist: 'My Artist',
        date: new Date(),
        genre: 'Pop',
        song: []
      });
      expect(album.save()).to.eventually.be.rejectedWith(ValidationError);
    });

    it('should trim whitespace', async () => {
      album = new AlbumModel({
        title: ' My Title ',
        artist: 'My Artist',
        date: new Date(),
        genre: 'Pop',
        song: []
      });
      let savedAlbum = await album.save();
      expect(savedAlbum.title).to.equal('My Title');
    });
  });
});
