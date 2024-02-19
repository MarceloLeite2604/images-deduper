import fs from 'original-fs';
import path from 'path';
import crypto from 'crypto';
import isImage from 'is-image';
import { OpenDialogReturnValue } from 'electron';
import { updateStatus } from './updateStatus';

interface Context {
  images: {
    paths: string[],
    total:
    processed: number,
    hashes: Map<string, string[]>
  },
  hash: crypto.Hash
}

function filterImageFilesOnly(dirEnts: fs.Dirent[]) {
  return dirEnts.filter(dirEnt => dirEnt.isFile() && isImage(path.resolve(dirEnt.path, dirEnt.name)));
}

async function retrieveImagesFromDirectory(directoryPath: string) {
  return fs.promises.readdir(directoryPath, {
    withFileTypes: true,
    recursive: true
  })
    .then(filterImageFilesOnly)
    .then(dirents => dirents.map(dirent => path.resolve(dirent.path, dirent.name)));
};

async function checksumFile(hash: crypto.Hash, path: string) {
  return new Promise((resolve, reject) => {

    const stream = fs.createReadStream(path);
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
};

export async function processImages(result: OpenDialogReturnValue) {
  retrieveImagesFromDirectory(result.filePaths[0])
    .then(imagePaths => {

      const context: Context = {
        images: {
          paths: imagePaths,
          total: imagePaths.length
          processed: 0,
          hashes: new Map<string, string[]>()
        },
        hash: crypto.createHash('sha1')
      };

      let images = 0;
      imagePaths.forEach(() => {
        updateStatus({
          progress: (++images / totalImages) * 100
        });
        // displayImage(imagePath);
      });
    });
};
