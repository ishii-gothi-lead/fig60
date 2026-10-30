# Technical Specification (SPEC.md)

## Fig 60: Client-Side Transcoding & P2P Micro-Video Canvas

### 1. Architectural Principles
* **Zero Infrastructure Overhead:** All media processing occurs locally within the user's browser runtime via WebAssembly (`ffmpeg.wasm`).
* **Protocol-Agnostic P2P Routing:** Media segments are distributed through peer-assisted WebRTC/WebTorrent channels to eliminate bandwidth bills.
* **Hard Stop Constraint:** Media duration is strictly bounded to <= 60.00 seconds.

---

### 2. Phase 1: In-Browser Transcoding Pipeline (`ffmpeg.wasm`)

#### Input Criteria
* **Maximum Duration:** 60.00 seconds.
* **Accepted Formats:** Any container or codec supported by FFmpeg (`.mp4`, `.mov`, `.webm`, `.mkv`).

#### Processing Pipeline
1. **Trimming:** Truncate input streams exceeding 60.00 seconds.
2. **Video Transcoding:**
   * **Resolution:** Scale down to a maximum height of 720p (1280x720), preserving aspect ratio.
   * **Codec:** H.264 (AAC audio) for universal playback compatibility across modern web browsers.
3. **HLS Segmentation:**
   * Generate HTTP Live Streaming playlist (`.m3u8`).
   * Slice video into 2-to-4 second transport stream segments (`.ts`).
4. **Output Manifest:**
   * Generate local Blob URLs for client playback or P2P distribution seeding.

---

### 3. Phase 2: Peer-to-Peer Segment Delivery
* **Transport:** WebRTC / WebTorrent client integration.
* **Fallback Strategy:** Immutable IPFS or decentralized object storage backends for initial seed availability when no active peers are present.
