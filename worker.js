// Fig 60 - ffmpeg.wasm Web Worker Pipeline
// This worker loads ffmpeg in the background to prevent freezing the main UI thread.

import { FFmpeg } from 'https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/esm/ffmpeg.js';
import { toBlobURL } from 'https://unpkg.com/@ffmpeg/util@0.12.1/dist/esm/index.js';

let ffmpeg = null;

self.onmessage = async (e) => {
  const { type, file } = e.data;

  if (type === 'TRANSCODE') {
    if (!ffmpeg) {
      self.postMessage({ status: 'LOADING', message: 'Initializing ffmpeg.wasm...' });
      
      ffmpeg = new FFmpeg();
      
      ffmpeg.on('log', ({ message }) => {
        self.postMessage({ status: 'LOG', message });
      });

      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
    }

    self.postMessage({ status: 'PROCESSING', message: 'Reading video file...' });
    
    // Read input file data
    const arrayBuffer = await file.arrayBuffer();
    await ffmpeg.writeFile('input.mp4', new Uint8Array(arrayBuffer));

    self.postMessage({ status: 'PROCESSING', message: 'Transcoding to HLS/MP4 (Phase 1)...' });
    
    // Basic HLS / MP4 transcoding placeholder command
    await ffmpeg.exec(['-i', 'input.mp4', '-vf', 'scale=-2:720', '-t', '60', 'output.mp4']);

    self.postMessage({ status: 'PROCESSING', message: 'Generating output blob...' });
    const data = await ffmpeg.readFile('output.mp4');
    
    const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });

    self.postMessage({ 
      status: 'DONE', 
      message: 'Transcoding complete!', 
      videoUrl: URL.createObjectURL(videoBlob) 
    });
  }
};
