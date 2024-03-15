import fs from 'original-fs';
import path from 'path';
import crypto from 'crypto';
import isImage from 'is-image';
import { OpenDialogReturnValue } from 'electron';
import { updateStatus, addImage } from './ipcs';
import { ImageProperties } from '../shared';

const ignoredExtensions = ['.xcf'];

interface Context {
  images: {
    paths: string[],
    total: number,
    processed: number,
    hashes: Map<string, string[]>
  }
}

function filterImageFilesOnly(dirEnts: fs.Dirent[]) {
  return dirEnts.filter(dirEnt => dirEnt.isFile() &&
    isImage(path.resolve(dirEnt.path, dirEnt.name)) &&
    !ignoredExtensions.includes(path.extname(dirEnt.name).toLowerCase()));
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

  let currentImage: string;
  let progress: number;
  let updateStatusIntervalId: NodeJS.Timeout;

  const updateImageScanningStatus = () => {

    const message = `Analysing ${currentImage}...`;

    updateStatus({
      message,
      progress
    });
  }

  for (const imagePath of context.images.paths) {
    const checksum = await calculateFileChecksum(imagePath);
    const images = context.images.hashes.get(checksum) || [];
    images.push(imagePath);
    context.images.hashes.set(checksum, images);

    currentImage = imagePath;
    progress = (context.images.processed / context.images.total) * 100;

    updateStatusIntervalId ??= setInterval(updateImageScanningStatus, 50);


    if (images.length > 1) {

      const imageProperties: ImageProperties = {
        checksum,
        locations: images
      };

      addImage(imageProperties);
    }

    context.images.processed++;
  }

  updateStatusIntervalId && clearInterval(updateStatusIntervalId)
  updateStatus({
    message: `Analysis complete. ${context.images.total} image(s) analysed. ${[...context.images.hashes.keys()].length} duplicates found.`,
    progress: 100
  });

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
    .then(calculateChecksums);
}