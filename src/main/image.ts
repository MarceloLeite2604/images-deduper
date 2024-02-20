import fs from 'original-fs';
import path from 'path';
import crypto from 'crypto';
import isImage from 'is-image';
import { OpenDialogReturnValue } from 'electron';
import { updateStatus } from './updateStatus';

interface Context {
  images: {
    paths: string[],
    total: number,
    processed: number,
    hashes: Map<string, string[]>
  }
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
}

async function calculateFileChecksum(path: string) {
  return new Promise<string>((resolve, reject) => {

    const hash = crypto.createHash('sha1');

    const stream = fs.createReadStream(path);
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

async function calculateChecksums(context: Context) {

  for (const imagePath of context.images.paths) {
    const checksum = await calculateFileChecksum(imagePath);
    const images = context.images.hashes.get(checksum) || [];
    images.push(imagePath);
    context.images.hashes.set(checksum, images);

    if (images.length > 1) {
      updateStatus({
        message: `Image ${path.basename(imagePath)} found ${images.length} times.`
      });
    }

    context.images.processed++;
  }

  return context;
}

function createInitialContext(imagePaths: string[]) {
  return {
    images: {
      paths: imagePaths,
      total: imagePaths.length,
      processed: 0,
      hashes: new Map<string, string[]>()
    }
  } as Context;
}

export function processImages(result: OpenDialogReturnValue) {
  return retrieveImagesFromDirectory(result.filePaths[0])
    .then(createInitialContext)
    .then(calculateChecksums)
    .then(console.log);
}
