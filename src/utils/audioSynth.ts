// Web Audio Synthesizer for Ancient Dunhuang Pentatonic Music
// Pentatonic Frequencies (宫 G4, 商 A4, 角 B4, 徵 D5, 羽 E5)

class SoundSynth {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
    } else if (!this.isMuted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  // Play Pipa / Plucked string sound
  public playPluck(freq: number = 440, duration: number = 1.2) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Filter for warm wooden tone
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Play Ancient Bell / Chime
  public playChime(freq: number = 880) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.01, this.ctx.currentTime); // Metallic overtone

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 2.5);
    osc2.stop(now + 2.5);
  }

  // Success Jingle on Quiz / Restoration
  public playSuccessArpeggio() {
    if (this.isMuted) return;
    const notes = [392.0, 440.0, 493.88, 587.33, 659.25, 783.99]; // Gong, Shang, Jiao, Zhi, Yu, Gong2
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playPluck(freq, 1.5);
        if (idx === notes.length - 1) {
          this.playChime(1046.5); // High C
        }
      }, idx * 120);
    });
  }

  // Soft Error Tone
  public playErrorTone() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  // Soft ambient drone background soundscape
  public toggleAmbientMusic(): boolean {
    this.initCtx();
    if (!this.ctx) return false;

    if (this.isAmbientPlaying) {
      if (this.ambientGain) {
        this.ambientGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);
        setTimeout(() => {
          this.ambientOsc?.stop();
          this.isAmbientPlaying = false;
        }, 1000);
      }
      return false;
    } else {
      const now = this.ctx.currentTime;
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.setValueAtTime(196, now); // G3 warm note

      const volume = this.isMuted ? 0 : 0.05;
      this.ambientGain.gain.setValueAtTime(0, now);
      this.ambientGain.gain.linearRampToValueAtTime(volume, now + 2);

      this.ambientOsc.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc.start(now);
      this.isAmbientPlaying = true;
      return true;
    }
  }
}

export const audioSynth = new SoundSynth();
