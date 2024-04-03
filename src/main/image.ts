import fs from 'original-fs';
import path from 'path';
import crypto from 'crypto';
import isImage from 'is-image';
import { OpenDialogReturnValue } from 'electron';
import { updateStatus, addImage } from './ipcs';
import { ImagePath, ImageProperties } from '../shared';

const ignoredExtensions = ['.xcf'];

interface Context {
  rootDirectory: string,
  images: {
    paths: string[],
    total: number,
    processed: number,
    relativePathsByChecksum: Map<string, string[]>
  }
}

function filterImageFilesOnly(dirEnts: fs.Dirent[]) {
  return dirEnts.filter(dirEnt => dirEnt.isFile() &&
    isImage(path.resolve(dirEnt.path, dirEnt.name)) &&
    !ignoredExtensions.includes(path.extname(dirEnt.name).toLowerCase()));
}

async function retrieveImagesFromDirectory(context: Context) {
  return fs.promises.readdir(context.rootDirectory, {
    withFileTypes: true,
    recursive: true
  })
    .then(filterImageFilesOnly)
    .then(dirents => dirents.map(dirent => path.resolve(dirent.path, dirent.name)))
    .then<Context>(imagePaths => ({
      ...context,
      images: {
        ...context.images,
        paths: imagePaths,
        total: imagePaths.length
      }
    }));
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

  for (const absolutePath of context.images.paths) {
    const checksum = await calculateFileChecksum(absolutePath);
    const relativePaths = context.images.relativePathsByChecksum.get(checksum) || [];
    const relativePath = path.relative(context.rootDirectory, absolutePath);
    relativePaths.push(relativePath);
    context.images.relativePathsByChecksum.set(checksum, relativePaths);

    progress = (context.images.processed / context.images.total) * 100;

    updateStatusIntervalId ??= setInterval(updateImageScanningStatus, 50);


    if (relativePaths.length > 1) {

      const imagePaths = relativePaths.map(relativePath => ({
        path: relativePath,
        excluded: false,
        selected: false
      } as ImagePath))

      const imageProperties: ImageProperties = {
        checksum,
        relativePaths: imagePaths
      };

      addImage(imageProperties);
    }

    context.images.processed++;
  }

  updateStatusIntervalId && clearInterval(updateStatusIntervalId)
  updateStatus({
    message: `Analysis complete. ${context.images.total} image(s) analysed. ${[...context.images.relativePathsByChecksum.keys()].length} duplicates found.`,
    progress: 100
  });

  return context;
}

export function processImages(result: OpenDialogReturnValue) {
  const context: Context = {
    rootDirectory: result.filePaths[0],
    images: {
      paths: [],
      total: 0,
      processed: 0,
      relativePathsByChecksum: new Map<string, string[]>()
    }
  };
  console.log(`Root directory is ${context.rootDirectory}`)
  return retrieveImagesFromDirectory(context)
    .then(calculateChecksums);
}