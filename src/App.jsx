import { useMemo, useState } from 'react';

const initialClips = [
  {
    id: 1,
    title: 'City Lights',
    duration: '00:15',
    color: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #f43f5e 100%)',
    effect: 'Cinematic',
    transition: 'Dissolve',
    image: 'city',
  },
  {
    id: 2,
    title: 'Street Walk',
    duration: '00:12',
    color: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 52%, #0ea5e9 100%)',
    effect: 'Glow',
    transition: 'Slide',
    image: 'street',
  },
  {
    id: 3,
    title: 'Night Pulse',
    duration: '00:18',
    color: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 42%, #a855f7 100%)',
    effect: 'Vignette',
    transition: 'Wipe',
    image: 'night',
  },
  {
    id: 4,
    title: 'Sunset Drift',
    duration: '00:10',
    color: 'linear-gradient(135deg, #fb7185 0%, #f59e0b 50%, #fef3c7 100%)',
    effect: 'Warm',
    transition: 'Zoom',
    image: 'sunset',
  },
];

const effectPresets = ['Cinematic', 'Glow', 'Vignette', 'Warm', 'Dramatic', 'Mono'];
const transitionPresets = ['Dissolve', 'Slide', 'Wipe', 'Zoom', 'Flash', 'Fade'];

function App() {
  const [clips, setClips] = useState(initialClips);
  const [selectedClipId, setSelectedClipId] = useState(1);
  const [selectedTransition, setSelectedTransition] = useState('Dissolve');
  const [selectedEffect, setSelectedEffect] = useState('Cinematic');
  const [brightness, setBrightness] = useState(88);

  const selectedClip = useMemo(
    () => clips.find((clip) => clip.id === selectedClipId) ?? clips[0],
    [clips, selectedClipId],
  );

  const applyEffect = (effect) => {
    setSelectedEffect(effect);
    setClips((current) =>
      current.map((clip) =>
        clip.id === selectedClipId ? { ...clip, effect } : clip,
      ),
    );
  };

  const applyTransition = (transition) => {
    setSelectedTransition(transition);
    setClips((current) =>
      current.map((clip) =>
        clip.id === selectedClipId ? { ...clip, transition } : clip,
      ),
    );
  };

  const addClip = () => {
    const nextId = (clips.at(-1)?.id ?? 0) + 1;
    const nextClip = {
      id: nextId,
      title: `New Cut ${nextId}`,
      duration: '00:08',
      color: 'linear-gradient(135deg, #2dd4bf 0%, #2563eb 52%, #0f172a 100%)',
      effect: 'Glow',
      transition: 'Fade',
      image: 'new',
    };

    setClips((current) => [...current, nextClip]);
    setSelectedClipId(nextId);
    setSelectedEffect(nextClip.effect);
    setSelectedTransition(nextClip.transition);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">ANDROID WEB EDITOR</p>
          <h1>Motion Mosaic</h1>
        </div>
        <button className="primary-btn">Export</button>
      </header>

      <section className="preview-card">
        <div className="project-row">
          <span className="pill">1080p</span>
          <span className="pill">15 sec</span>
          <span className="pill">Auto-Preview</span>
        </div>

        <div
          className="video-stage"
          style={{
            background: selectedClip.color,
            filter: `brightness(${brightness}%) saturate(1.2) contrast(1.05)`,
          }}
        >
          <div className="video-content">
            <span className="chip chip-dark">{selectedClip.effect}</span>
            <h2>{selectedClip.title}</h2>
            <p>{selectedClip.transition} transition • {selectedClip.duration}</p>
          </div>
        </div>

        <div className="preview-footer">
          <div>
            <p className="muted-label">Current frame</p>
            <strong>00:02:18</strong>
          </div>
          <div>
            <p className="muted-label">Timeline</p>
            <strong>{clips.length} clips</strong>
          </div>
          <button className="soft-btn">Play</button>
        </div>
      </section>

      <section className="inspector">
        <div className="panel-block">
          <div className="panel-header">
            <h3>Effects</h3>
            <button className="mini-btn" onClick={() => setSelectedEffect('Cinematic')}>
              Reset
            </button>
          </div>
          <div className="tag-list">
            {effectPresets.map((effect) => (
              <button
                key={effect}
                className={`tag ${selectedEffect === effect ? 'active' : ''}`}
                onClick={() => applyEffect(effect)}
              >
                {effect}
              </button>
            ))}
          </div>
        </div>

        <div className="panel-block">
          <div className="panel-header">
            <h3>Transitions</h3>
            <button className="mini-btn" onClick={() => setSelectedTransition('Dissolve')}>
              Auto
            </button>
          </div>
          <div className="tag-list">
            {transitionPresets.map((transition) => (
              <button
                key={transition}
                className={`tag ${selectedTransition === transition ? 'active' : ''}`}
                onClick={() => applyTransition(transition)}
              >
                {transition}
              </button>
            ))}
          </div>
        </div>

        <div className="panel-block slider-block">
          <div className="panel-header">
            <h3>Brightness</h3>
            <span>{brightness}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="120"
            value={brightness}
            onChange={(event) => setBrightness(Number(event.target.value))}
          />
        </div>
      </section>

      <section className="timeline-wrap">
        <div className="timeline-header">
          <h3>Timeline</h3>
          <button className="mini-btn" onClick={addClip}>+ Add clip</button>
        </div>

        <div className="timeline">
          {clips.map((clip) => (
            <button
              key={clip.id}
              className={`clip-item ${selectedClipId === clip.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedClipId(clip.id);
                setSelectedEffect(clip.effect);
                setSelectedTransition(clip.transition);
              }}
            >
              <div className="clip-visual" style={{ background: clip.color }} />
              <div className="clip-copy">
                <strong>{clip.title}</strong>
                <span>{clip.duration}</span>
              </div>
              <div className="clip-meta">
                <span>{clip.transition}</span>
                <span>{clip.effect}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
