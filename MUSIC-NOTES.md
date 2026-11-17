# Background song optimization

Source: user-supplied Ranjha(KoshalWorld.Com).mp3. Original in Downloads unchanged.

## Audio file

- Original: 5,555,303 bytes; MP3, 192 kbps stereo, 44.1kHz; 228.86 seconds; embedded JPEG cover.
- Website: src/assets/audio/ranjha.m4a; 2,804,507 bytes; AAC-LC, 96 kbps stereo, 44.1kHz; 228.86 seconds.
- Reduction: 49.5%. Full song retained; no excerpt, speed change, or added fade. Cover image and nonessential metadata omitted.
- Encoded with FFmpeg: -map 0:a:0 -vn -map_metadata -1 -c:a aac -profile:a aac_low -b:a 96k -ac 2 -ar 44100 -movflags +faststart.
- File validated by full FFmpeg decode. Atom order ftyp, moov, free, mdat verified. Fast-start puts the index before media data, as described in the [FFmpeg format documentation](https://ffmpeg.org/ffmpeg-formats.html#mov_002c-mp4_002c-ismv).

## Website behavior

- Removed the generated pentatonic Web Audio score and oscillator interval entirely.
- New recording imported through Vite as a content-hashed asset; existing /assets immutable-cache policy applies after deployment. No audio preload link or initial background request.
- Audio element created only on a sound-enabled user gesture; preload=none, volume=0.35, loop=true.
- Existing envelope opening starts music independently and never awaits an audio request. Open without sound makes no song request.
- Sound toggle remains usable while loading; pending state says Loading sound. Muting cancels the pending playback attempt, prevents a stale play promise/error from changing state, and unloads an initial stalled request.
- After successful playback, pause/resume preserves position. Hidden tabs pause sound without automatically restarting it on return. Network errors expose the existing retry status and allow retry.
- Unmount removes handlers and releases the media resource. No new runtime or package.json dependency.

## Verification

Build and lint passed. Local Edge/Chromium production preview: no audio request on entry or muted opening; actual native AAC playback/time progression (duration 228.855873 seconds); loop wraps to the beginning; mute/resume; hidden-tab pause; deliberately stalled audio does not delay opening and can be canceled; deliberately failed audio does not delay opening and shows retry; retry succeeds in both cases. Full file decode and byte-range delivery checked. Browser JavaScript errors absent in normal playback.

The subsequent annotations are also implemented: section heading changed to Us, THE BRIDE and THE GROOM labels removed, with family details and wreath alignment retained. Checked mobile and desktop screenshots.

Limits: browser tests verify decoding and playback state, not a subjective listening comparison or physical iOS/Android device. Lossy re-encoding can affect fidelity. Actual playback start still depends on the guest's connection and browser; the invitation does not wait for it. No deployment performed.
