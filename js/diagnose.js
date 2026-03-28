// ═══════════════════════════════════════════
// Nurture Paradise — AI Diagnosis (Gemini)
// ═══════════════════════════════════════════

function setDiagMode(mode) {
  state.diagMode = mode;
  document.getElementById('mode-text-btn').classList.toggle('active', mode==='text');
  document.getElementById('mode-image-btn').classList.toggle('active', mode==='image');
  document.getElementById('diag-text-input').style.display = mode==='text' ? 'block' : 'none';
  document.getElementById('diag-image-input').style.display = mode==='image' ? 'block' : 'none';
  // Reset photo desc on switch
  const pd = document.getElementById('diag-photo-desc');
  if (pd) pd.value = '';
  checkDiagReady();
  showDiagState('placeholder');
}

const GEMINI_ENDPOINT = '/api/gemini/diagnose';

function checkDiagReady() {
  const hasContent = state.diagMode === 'text'
    ? document.getElementById('diag-text').value.trim().length > 0
    : !!state.diagImg;
  document.getElementById('run-diag-btn').disabled = !hasContent;
}

function handleFileUpload(e) {
  const f = e.target.files[0]; if (!f) return;
  state.diagImgFile = f;
  const r = new FileReader();
  r.onload = ev => {
    state.diagImg = ev.target.result;
    document.getElementById('upload-zone').innerHTML =
      `<img src="${state.diagImg}" alt="plant" style="max-height:180px;max-width:100%;object-fit:contain;border-radius:8px"/>`;
    checkDiagReady();
  };
  r.readAsDataURL(f);
}

function showDiagState(s) {
  document.getElementById('diag-placeholder').style.display = s==='placeholder' ? 'flex' : 'none';
  document.getElementById('diag-loading').style.display    = s==='loading'     ? 'flex' : 'none';
  document.getElementById('diag-result').style.display     = s==='result'      ? 'block': 'none';
  // Update right panel bg
  const right = document.getElementById('diagnose-right');
  if (right) right.style.background = s==='result' ? 'var(--surface2)' : 'var(--surface2)';
}

async function runDiagnosis() {
  showDiagState('loading');
  document.getElementById('run-diag-btn').disabled = true;

  // Rotating loading messages
  const msgs = ['Analysing your plant…','Consulting botanical data…','Preparing diagnosis…','Almost ready…'];
  let mi = 0;
  const loadP = document.querySelector('#diag-loading p');
  const loadInterval = setInterval(() => {
    mi = (mi+1) % msgs.length;
    if (loadP) { loadP.style.opacity='0'; setTimeout(()=>{ loadP.textContent=msgs[mi]; loadP.style.opacity='1'; }, 200); }
  }, 1800);

  let promptText = '';
  try {
    let parts;
    if (state.diagMode === 'text') {
      promptText = document.getElementById('diag-text').value.trim();
      parts = [{ text: `You are an expert botanist and plant pathologist. A grower describes their plant problem:\n\n"${promptText}"\n\nGive a clear diagnosis in this exact format (keep the bold labels):\n\n**Diagnosis:** [What is wrong]\n**Severity:** Low / Medium / High\n**Cause:** [Why this is happening]\n**Treatment:** [Numbered steps, specific and practical]\n**Prevention:** [2–3 concise tips]\n\nBe precise, warm, and practical.` }];
    } else {
      const extraDesc = (document.getElementById('diag-photo-desc')?.value || '').trim();
      promptText = extraDesc ? `[Photo] — "${extraDesc}"` : '[Photo upload]';
      const b64 = state.diagImg.split(',')[1];
      const mimeType = state.diagImgFile?.type || 'image/jpeg';
      const descCtx = extraDesc ? `\n\nThe grower also describes: "${extraDesc}"\n\nUse both the photo and this description for maximum accuracy.` : '';
      parts = [
        { inline_data: { mime_type: mimeType, data: b64 } },
        { text: `You are an expert plant pathologist. Analyze this plant photograph carefully.${descCtx}\n\nProvide in this exact format (keep the bold labels):\n\n**Observations:** [What you see visually]\n**Diagnosis:** [What you believe is wrong]\n**Severity:** Low / Medium / High\n**Treatment:** [Numbered steps, specific]\n**Prevention:** [2–3 tips]\n\nBe precise and practical.` }
      ];
    }

    const res = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts }] })
    });
    const data = await res.json();

    clearInterval(loadInterval);

    if (!res.ok) {
      renderDiagResult(`**Error:** ${data?.error?.message || 'API error. Please try again.'}`);
    } else {
      const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response. Please try again.';
      renderDiagResult(resultText);
      if (state.useFirebase && window._fb && state.currentUser?.uid) {
        fbSaveDiagnosis(promptText, resultText).catch(()=>{});
      }
    }
    showDiagState('result');
  } catch (err) {
    clearInterval(loadInterval);
    renderDiagResult(`**Error:** Could not reach the API. Check your connection and try again.`);
    showDiagState('result');
  }
  checkDiagReady();
}

function renderDiagResult(txt) {
  const container = document.getElementById('diag-result');
  const lines = txt.split('\n').filter(l => l.trim());
  let html = `<div class="eyebrow" style="margin-bottom:28px"><div class="eyebrow-line"></div><span class="eyebrow-text">Diagnosis report</span></div>`;
  lines.forEach(line => {
    if (line.startsWith('**') && line.includes(':**')) {
      const c = line.indexOf(':**');
      const label = line.slice(2, c);
      const text  = line.slice(c+3).trim();
      // Colour-code severity
      const isHighSeverity = label === 'Severity' && text.toLowerCase().includes('high');
      const isMedSeverity  = label === 'Severity' && text.toLowerCase().includes('medium');
      html += `<div class="result-section">
        <div class="result-section-label">${label}</div>
        <p class="result-section-text" style="${isHighSeverity?'color:var(--error)':isMedSeverity?'color:var(--gold)':''}">${text}</p>
      </div>`;
    } else if (line.trim()) {
      html += `<p class="result-plain">${line}</p>`;
    }
  });
  container.innerHTML = html;
}
