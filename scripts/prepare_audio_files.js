import fs from 'fs';
import path from 'path';

const audioDir = 'c:/Users/maddi/Desktop/bts/public/audio';
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Generate a valid minimal SILENCE / TONE WAV audio file header & buffer
function createWavBuffer(durationSeconds = 60, sampleRate = 22050) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = durationSeconds * byteRate;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Generate soft pleasant ambient synth tone waves so sound is actually heard!
  for (let i = 0; i < dataSize / 2; i++) {
    const t = i / sampleRate;
    // Pleasant harmonic pentatonic chords (A4, C#5, E5)
    const sample = Math.sin(2 * Math.PI * 440 * t) * 0.15 +
                   Math.sin(2 * Math.PI * 554.37 * t) * 0.12 +
                   Math.sin(2 * Math.PI * 659.25 * t) * 0.1;
    const intVal = Math.max(-32768, Math.min(32767, Math.floor(sample * 16000)));
    buffer.writeInt16LE(intVal, 44 + i * 2);
  }

  return buffer;
}

function generateTrackAudioFiles() {
  console.log("Generating valid audio stream WAV files in public/audio/...");
  const wavBuffer = createWavBuffer(180); // 3-minute playable audio track
  fs.writeFileSync(path.join(audioDir, 'bts_audio_track.wav'), wavBuffer);
  console.log("Saved bts_audio_track.wav successfully!");
}

generateTrackAudioFiles();
