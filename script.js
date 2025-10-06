// ZG Music Player - Full JS Version with progress, volume, next/prev, clickable playlist

// Body styling const body = document.body; body.style.display = 'flex'; body.style.flexDirection = 'column'; body.style.alignItems = 'center'; body.style.background = '#071021'; body.style.color = '#e6eef6'; body.style.fontFamily = 'system-ui, Arial, sans-serif'; body.style.minHeight = '100vh'; body.style.padding = '20px';

// Create main player container const player = document.createElement('div'); player.style.width = '880px'; player.style.maxWidth = '95%'; player.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))'; player.style.borderRadius = '12px'; player.style.padding = '18px'; player.style.position = 'relative'; player.style.boxShadow = '0 8px 30px rgba(2,6,23,0.6)'; body.appendChild(player);

// Logo const logo = document.createElement('div'); logo.textContent = 'ZG'; logo.style.position = 'absolute'; logo.style.top = '10px'; logo.style.left = '10px'; logo.style.width = '56px'; logo.style.height = '56px'; logo.style.background = 'linear-gradient(135deg, #1db954, #6ee7b7)'; logo.style.borderRadius = '8px'; logo.style.display = 'flex'; logo.style.alignItems = 'center'; logo.style.justifyContent = 'center'; logo.style.fontWeight = '700'; logo.style.color = '#022'; logo.style.fontSize = '18px'; player.appendChild(logo);

// Heading const heading = document.createElement('h1'); heading.textContent = 'ZG'; heading.style.textAlign = 'center'; heading.style.margin = '0'; heading.style.fontSize = '24px'; player.appendChild(heading);

// Description const desc = document.createElement('p'); desc.textContent = 'Play local files or paste audio URLs. Mobile friendly.'; desc.style.textAlign = 'center'; desc.style.color = '#94a3b8'; desc.style.fontSize = '14px'; desc.style.margin = '4px 0 20px'; player.appendChild(desc);

// Audio element const audio = document.createElement('audio'); audio.id = 'audio'; player.appendChild(audio);

// Controls container const controls = document.createElement('div'); controls.style.display = 'flex'; controls.style.flexDirection = 'column'; controls.style.gap = '10px'; player.appendChild(controls);

// Art (cover) const art = document.createElement('div'); art.style.height = '260px'; art.style.borderRadius = '8px'; art.style.backgroundSize = 'cover'; art.style.backgroundPosition = 'center'; art.style.backgroundColor = 'rgba(255,255,255,0.02)'; controls.appendChild(art);

// Track meta const trackTitle = document.createElement('h2'); trackTitle.textContent = 'No song selected'; trackTitle.style.margin = '0'; trackTitle.style.fontSize = '16px'; controls.appendChild(trackTitle);

const trackArtist = document.createElement('p'); trackArtist.textContent = '—'; trackArtist.style.margin = '4px 0 0'; trackArtist.style.color = '#94a3b8'; trackArtist.style.fontSize = '13px'; controls.appendChild(trackArtist);

// Buttons const buttonsContainer = document.createElement('div'); buttonsContainer.style.display = 'flex'; buttonsContainer.style.gap = '8px'; controls.appendChild(buttonsContainer);

function createButton(text){ const btn = document.createElement('button'); btn.textContent = text; btn.style.background = 'transparent'; btn.style.border = '1px solid rgba(255,255,255,0.06)'; btn.style.padding = '8px'; btn.style.borderRadius = '8px'; btn.style.cursor = 'pointer'; return btn; }

const prevBtn = createButton('⏮'); const playBtn = createButton('▶️'); playBtn.style.background = '#1db954'; playBtn.style.color = '#022'; playBtn.style.border = 'none'; playBtn.style.minWidth = '64px'; const nextBtn = createButton('⏭'); const shuffleBtn = createButton('🔀'); const repeatBtn = createButton('🔁'); buttonsContainer.append(prevBtn, playBtn, nextBtn, shuffleBtn, repeatBtn);

// Progress bar const progress = document.createElement('input'); progress.type = 'range'; progress.value = 0; progress.min = 0; progress.step = 1; progress.style.width = '100%'; controls.appendChild(progress);

// Volume control const volumeContainer = document.createElement('div'); volumeContainer.style.display = 'flex'; volumeContainer.style.gap = '8px'; volumeContainer.style.alignItems = 'center'; controls.appendChild(volumeContainer);

const volumeSlider = document.createElement('input'); volumeSlider.type = 'range'; volumeSlider.min = 0; volumeSlider.max = 1; volumeSlider.step = 0.01; volumeSlider.value = 0.8; volumeSlider.style.flex = '1'; volumeContainer.appendChild(volumeSlider);

const volLabel = document.createElement('div'); volLabel.textContent = '80%'; volumeContainer.appendChild(volLabel);

// Playlist const playlistContainer = document.createElement('div'); playlistContainer.style.marginTop = '12px'; playlistContainer.style.background = 'rgba(255,255,255,0.02)'; playlistContainer.style.padding = '12px'; playlistContainer.style.borderRadius = '10px'; playlistContainer.style.maxHeight = '300px'; playlistContainer.style.overflow = 'auto'; player.appendChild(playlistContainer);

// Tracks array let tracks = []; let current = 0; let isPlaying = false; let isShuffle = false; let isRepeat = false;

function formatTime(sec){ sec = Math.floor(sec) || 0; const m = Math.floor(sec/60); const s = sec%60; return m + ':' + (s<10?'0'+s:s); }

// Load track function loadTrack(index){ const t = tracks[index]; if(!t) return; audio.src = t.url; trackTitle.textContent = t.title; trackArtist.textContent = t.artist || '—'; art.style.backgroundImage = t.cover?url(${t.cover}):''; renderPlaylist(); }

// Playlist render function renderPlaylist(){ playlistContainer.innerHTML = ''; tracks.forEach((t,i)=>{ const trackDiv = document.createElement('div'); trackDiv.textContent = t.title; trackDiv.style.padding = '6px'; trackDiv.style.cursor = 'pointer'; trackDiv.style.color = (i===current)?'#1db954':'#e6eef6'; trackDiv.addEventListener('click', ()=>{ current=i; loadTrack(current); audio.play(); }); playlistContainer.appendChild(trackDiv); }); }

// Controls functionality playBtn.addEventListener('click', ()=>{ if(!audio.src){ if(tracks.length>0){ loadTrack(current); } else { alert('Add tracks first'); return; } } if(isPlaying) audio.pause(); else audio.play(); }); prevBtn.addEventListener('click', ()=>{ current = (current-1+tracks.length)%tracks.length; loadTrack(current); audio.play(); }); nextBtn.addEventListener('click', ()=>{ current = (current+1)%tracks.length; loadTrack(current); audio.play(); }); shuffleBtn.addEventListener('click', ()=>{ isShuffle=!isShuffle; shuffleBtn.style.opacity=isShuffle?1:0.6; }); repeatBtn.addEventListener('click', ()=>{ isRepeat=!isRepeat; repeatBtn.style.opacity=isRepeat?1:0.6; audio.loop=isRepeat; });

// Update progress audio.addEventListener('timeupdate', ()=>{ progress.max = Math.floor(audio.duration)||0; progress.value = Math.floor(audio.currentTime); }); progress.addEventListener('input', ()=>{ audio.currentTime = progress.value; });

// Volume volumeSlider.addEventListener('input', ()=>{ audio.volume = volumeSlider.value; volLabel.textContent = Math.round(volumeSlider.value*100)+'%'; });

// Audio play/pause events audio.addEventListener('play', ()=>{ isPlaying=true; playBtn.textContent='⏸'; }); audio.addEventListener('pause', ()=>{ isPlaying=false; playBtn.textContent='▶️'; });

// Ended track audio.addEventListener('ended', ()=>{ if(isShuffle){ current = Math.floor(Math.random()*tracks.length); } else { current = (current+1)%tracks.length; } loadTrack(current); audio.play(); });

// File upload const fileInput = document.createElement('input'); fileInput.type='file'; fileInput.accept='audio/*'; fileInput.multiple=true; fileInput.style.marginTop='10px'; controls.appendChild(fileInput); fileInput.addEventListener('change',(e)=>{ const files=Array.from(e.target.files); files.forEach(f=>tracks.push({title:f.name, artist:'', url:URL.createObjectURL(f), cover:''})); if(tracks.length>0) loadTrack(0); });

