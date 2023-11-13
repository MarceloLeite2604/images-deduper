import { contextBridge } from 'electron'
import type { ImageDeduper }  from './index.d.ts'

const versions: ImageDeduper.Versions = {
    node: function () { return process.versions.node; },
    chrome: function () { return process.versions.chrome; },
    electron: function () { return process.versions.electron; }
};

contextBridge.exposeInMainWorld('_versions', versions)