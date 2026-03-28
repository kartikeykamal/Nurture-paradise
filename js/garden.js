// ═══════════════════════════════════════════
// Nurture Paradise — Garden Dashboard
// Features: Care guide, notifications, health,
//   next-care countdown, stats bar
// ═══════════════════════════════════════════

// Garden filter state for health-based filtering
let gardenHealthFilter = null;

// Normalize image URLs to dodge hotlink blocks when showing plant photos
function _safeImg(url) {
  if (typeof normalizeImageUrl === 'function') return normalizeImageUrl(url);
  if (!url) return '';
  if (url.startsWith('data:') || url.includes('images.weserv.nl/')) return url;
  try {
    const parsed = new URL(url, window.location.href);
    const target = `${parsed.hostname}${parsed.pathname}${parsed.search || ''}`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(target)}`;
  } catch (e) { return url; }
}

function filterByHealth(healthStatus) {
  var isSame = gardenHealthFilter === healthStatus;
  gardenHealthFilter = isSame ? null : healthStatus;
  renderDashboard();
  setTimeout(function() {
    var badges = document.querySelectorAll('.g-health-pill');
    badges.forEach(function(badge) {
      var match = (badge.getAttribute('onclick') || '').match(/filterByHealth\('([^']+)'\)/);
      if (!match) return;
      var status = match[1];
      badge.classList.toggle('health-active', gardenHealthFilter === status);
    });
  }, 0);
}

function _waterToHours(w) {
  const s = (w || '').toLowerCase();
  if (s.includes('daily') || s.includes('twice weekly')) return 24;
  if (s.includes('every 2 day')) return 48;
  if (s.includes('every 3 day')) return 72;
  if (s.includes('weekly') || s.includes('every 1')) return 168;
  if (s.includes('every 2 week') || s.includes('fortnight')) return 336;
  if (s.includes('monthly') || s.includes('every 3') || s.includes('every 4')) return 720;
  return 168;
}

function _nextCareLabel(plant) {
  const lastWatered = plant.lastWatered ? new Date(plant.lastWatered) : null;
  if (!lastWatered) return { label: 'Water soon', urgent: true };
  const intervalMs = _waterToHours(plant.water) * 3600000;
  const nextDate = new Date(lastWatered.getTime() + intervalMs);
  const diffH = Math.round((nextDate - Date.now()) / 3600000);
  if (diffH <= 0) return { label: 'Water now!', urgent: true };
  if (diffH < 24) return { label: 'Water in ' + diffH + 'h', urgent: true };
  const diffD = Math.ceil(diffH / 24);
  if (diffD === 1) return { label: 'Water tomorrow', urgent: false };
  return { label: 'Water in ' + diffD + 'd', urgent: false };
}

function _healthScore(plant) {
  let score = 70;
  if (plant.logs && plant.logs.length) score += Math.min(plant.logs.length * 5, 20);
  if (plant.lastWatered) {
    const hours = _waterToHours(plant.water);
    const elapsed = (Date.now() - new Date(plant.lastWatered)) / 3600000;
    if (elapsed < hours * 0.8) score += 10;
    else if (elapsed > hours * 1.5) score -= 20;
  }
  return Math.max(10, Math.min(100, score));
}

function _healthLabel(score) {
  if (score >= 80) return { text: 'Thriving', cls: 'health-great' };
  if (score >= 55) return { text: 'Good', cls: 'health-ok' };
  if (score >= 35) return { text: 'Needs care', cls: 'health-warn' };
  return { text: 'Struggling', cls: 'health-bad' };
}

function _bellOff() {
  return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>';
}
function _bellOn() {
  return '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>';
}

function _buildCareSteps(plant) {
  const g = plant.guide || {};
  const steps = [];
  if (g.soil) steps.push({ icon: '🪴', title: 'Soil & Potting', body: g.soil });
  if (g.sunlight || plant.sun) steps.push({ icon: '☀️', title: 'Sunlight', body: g.sunlight || plant.sun });
  if (g.water || plant.water) steps.push({
    icon: '💧', title: 'Watering', body: g.water || plant.water,
    action: '<button class="guide-log-water btn-ink" onclick="logWatering(' + plant.id + ');closeCareGuide()">Mark as watered today ✓</button>'
  });
  if (g.temp || plant.temp) steps.push({ icon: '🌡️', title: 'Temperature', body: g.temp || plant.temp });
  if (g.season) steps.push({ icon: '📅', title: 'Season & Timing', body: g.season });
  if (g.timeline) steps.push({ icon: '⏱️', title: 'Growth Timeline', body: g.timeline });
  if (g.tips && g.tips.length) steps.push({
    icon: '💡', title: 'Pro Tips',
    body: '<ul class="guide-tips-list">' + g.tips.map(t => '<li>' + t + '</li>').join('') + '</ul>',
    raw: true
  });
  return steps;
}

function openCareGuide(plantId) {
  const plant = state.garden.find(function(p) { return p.id === plantId; });
  if (!plant) return;
  const steps = _buildCareSteps(plant);
  const modal = document.getElementById('care-guide-modal');
  if (!modal) return;
  document.getElementById('cg-title').textContent = plant.common;
  document.getElementById('cg-latin').textContent = plant.name || '';
  document.getElementById('cg-steps').innerHTML = steps.map(function(s, i) {
    return '<div class="cg-step" style="animation-delay:' + (i * 0.06) + 's">' +
      '<div class="cg-step-num">' + (i + 1) + '</div>' +
      '<div class="cg-step-body">' +
        '<div class="cg-step-head">' +
          '<span class="cg-step-icon">' + s.icon + '</span>' +
          '<span class="cg-step-title">' + s.title + '</span>' +
        '</div>' +
        '<div class="cg-step-text">' + s.body + '</div>' +
        (s.action ? '<div class="cg-step-action">' + s.action + '</div>' : '') +
      '</div>' +
    '</div>';
  }).join('');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeCareGuide() {
  var modal = document.getElementById('care-guide-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('click', function(e) {
  var modal = document.getElementById('care-guide-modal');
  if (modal && e.target === modal) closeCareGuide();
});

function logWatering(plantId) {
  var plant = state.garden.find(function(p) { return p.id === plantId; });
  if (!plant) return;
  plant.lastWatered = new Date().toISOString();
  var entry = {
    text: '💧 Watered',
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    id: Date.now()
  };
  plant.logs.push(entry);
  persistGarden();
  showToast(plant.common + ' watered 💧');
  _refreshCard(plantId);
}

function _refreshCard(plantId) {
  var plant = state.garden.find(function(p) { return p.id === plantId; });
  if (!plant) return;
  var careEl = document.getElementById('care-next-' + plantId);
  var healthEl = document.getElementById('health-score-' + plantId);
  var entriesEl = document.getElementById('log-entries-' + plantId);
  if (careEl) {
    var nc = _nextCareLabel(plant);
    careEl.textContent = nc.label;
    careEl.className = 'g-next-care' + (nc.urgent ? ' urgent' : '');
  }
  if (healthEl) {
    var hl = _healthLabel(_healthScore(plant));
    healthEl.textContent = hl.text;
    healthEl.className = 'g-health-pill ' + hl.cls;
  }
  if (entriesEl) {
    entriesEl.innerHTML = plant.logs.slice().reverse().map(function(l) {
      return '<div class="log-entry"><span class="log-date">' + l.date + '</span><p class="log-text">' + l.text + '</p></div>';
    }).join('');
  }
}

async function requestNotifications(plantId) {
  var plant = state.garden.find(function(p) { return p.id === plantId; });
  if (!plant) return;
  if (!('Notification' in window)) { showToast('Notifications not supported in this browser'); return; }
  if (Notification.permission === 'denied') { showToast('Notifications blocked — enable in browser settings'); return; }
  if (Notification.permission === 'default') {
    var perm = await Notification.requestPermission();
    if (perm !== 'granted') { showToast('Notification permission not granted'); return; }
  }
  plant.notificationsOn = !plant.notificationsOn;
  persistGarden();
  var btn = document.getElementById('notif-btn-' + plantId);
  if (btn) {
    btn.classList.toggle('notif-active', !!plant.notificationsOn);
    btn.innerHTML = plant.notificationsOn ? _bellOn() : _bellOff();
    btn.title = plant.notificationsOn ? 'Reminders on — click to turn off' : 'Turn on care reminders';
  }
  if (plant.notificationsOn) {
    new Notification(plant.common + ' care reminders on 🌱', {
      body: 'You\'ll get watering & care reminders for your ' + plant.common + '.',
      icon: _safeImg(plant.img)
    });
    var msDelay = Math.min(_waterToHours(plant.water) * 3600000, 2147483647);
    setTimeout(function() {
      if (Notification.permission === 'granted') {
        var p = state.garden.find(function(x) { return x.id === plantId; });
        if (p && p.notificationsOn) {
          new Notification('Time to water ' + p.common + '! 💧', {
            body: 'Your ' + p.common + ' needs watering. Open Nurture Paradise.',
            icon: _safeImg(p.img)
          });
        }
      }
    }, msDelay);
    showToast('Reminders on for ' + plant.common + ' 🔔');
  } else {
    showToast('Reminders off for ' + plant.common);
  }
}

function renderDashboard() {
  var empty  = document.getElementById('dashboard-empty');
  var filled = document.getElementById('dashboard-filled');
  if (!state.garden.length) { empty.style.display = 'flex'; filled.style.display = 'none'; return; }
  empty.style.display = 'none'; filled.style.display = 'block';

  var titleHTML = 'My Garden <em>(' + state.garden.length + ')</em>';
  if (gardenHealthFilter) {
    titleHTML += ' <span style="font-size:0.75em;opacity:0.7;margin-left:8px;">Filtered by: ' + gardenHealthFilter + ' <a href="javascript:void(0)" onclick="filterByHealth(\'' + gardenHealthFilter + '\')" style="color:var(--acid);text-decoration:underline;cursor:pointer;">clear</a></span>';
  }
  document.getElementById('dashboard-title').innerHTML = titleHTML;

  // Stats bar
  var statsBar = document.getElementById('garden-stats-bar');
  if (!statsBar) {
    statsBar = document.createElement('div');
    statsBar.id = 'garden-stats-bar';
    statsBar.className = 'garden-stats-bar';
    var heroEl = document.querySelector('#dashboard-filled .page-hero');
    if (heroEl) heroEl.after(statsBar);
  }
  var watered = state.garden.filter(function(p) {
    return p.lastWatered && (Date.now() - new Date(p.lastWatered)) < 86400000;
  }).length;
  var totalLogs = state.garden.reduce(function(s, p) { return s + p.logs.length; }, 0);
  var remindersOn = state.garden.filter(function(p) { return p.notificationsOn; }).length;
  statsBar.innerHTML =
    '<div class="gstat-item"><span class="gstat-val">' + state.garden.length + '</span><span class="gstat-label">Plants</span></div>' +
    '<div class="gstat-divider"></div>' +
    '<div class="gstat-item"><span class="gstat-val">' + watered + '</span><span class="gstat-label">Watered today</span></div>' +
    '<div class="gstat-divider"></div>' +
    '<div class="gstat-item"><span class="gstat-val">' + totalLogs + '</span><span class="gstat-label">Log entries</span></div>' +
    '<div class="gstat-divider"></div>' +
    '<div class="gstat-item"><span class="gstat-val">' + (remindersOn || '—') + '</span><span class="gstat-label">Reminders on</span></div>';

  document.getElementById('garden-list').innerHTML = state.garden.filter(function(plant) {
    if (!gardenHealthFilter) return true;
    var hl = _healthLabel(_healthScore(plant));
    var healthClass = hl.cls;
    return healthClass === 'health-' + gardenHealthFilter;
  }).map(function(plant, i) {
    var health = _healthScore(plant);
    var hl = _healthLabel(health);
    var nc = _nextCareLabel(plant);
    var notifOn = !!plant.notificationsOn;
    var isFiltered = gardenHealthFilter === hl.cls.replace('health-', '');
    var tips = (plant.guide && plant.guide.tips && plant.guide.tips.length)
      ? plant.guide.tips.map(function(t){return '<li>' + t + '</li>';}).join('')
      : '<li class="g-tip-empty">Add your own notes or tips.</li>';

    return '<div class="garden-card fade-up" style="animation-delay:' + (i * 0.08) + 's' + (isFiltered ? ';border-color:rgba(0,230,118,.4)' : '') + '">' +
      '<div class="g-card-left">' +
        (plant.img
          ? '<div class="g-cover"><img src="' + _safeImg(plant.img) + '" alt="' + plant.common + '" onerror="this.parentElement.innerHTML=\'<div class=g-img-fallback>' + (plant.emoji || '🌿') + '</div>\'"/></div>'
          : '<div class="g-cover g-img-fallback">' + (plant.emoji || '🌿') + '</div>') +
        '<div class="g-card-head">' +
          '<div class="g-card-titles">' +
            '<div class="garden-card-latin">' + plant.name + '</div>' +
            '<h3 class="garden-card-name">' + plant.common + '</h3>' +
            '<div class="g-stat-chips">' +
              '<span class="g-stat-chip">💧 ' + plant.water + '</span>' +
              '<span class="g-stat-chip">☀️ ' + plant.sun + '</span>' +
              '<span class="g-stat-chip">🌡️ ' + (plant.temp || '18–35°C') + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="g-health-block">' +
            '<span class="g-health-pill ' + hl.cls + '" id="health-score-' + plant.id + '" onclick="filterByHealth(\'' + hl.cls.replace('health-', '') + '\')" title="Filter by this health state">' + hl.text + '</span>' +
            '<span class="g-next-care ' + (nc.urgent ? 'urgent' : '') + '" id="care-next-' + plant.id + '">' + nc.label + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="g-actions-row">' +
          '<button class="btn-care-guide" onclick="openCareGuide(' + plant.id + ')" title="Step-by-step care guide">' +
            '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 22C12 22 3 17 3 10a9 9 0 0 1 18 0c0 7-9 12-9 12z"/><circle cx="12" cy="10" r="3"/></svg>' +
            'Care guide' +
          '</button>' +
          '<button class="btn-grow-guide" onclick="openGrowModal(' + plant.id + ')" title="AI-generated growing instructions">' +
          '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>' +
          'How to grow' +
          '</button>' +
          '<div class="g-icon-actions">' +
            '<button class="btn-notif ' + (notifOn ? 'notif-active' : '') + '" id="notif-btn-' + plant.id + '" onclick="requestNotifications(' + plant.id + ')" title="' + (notifOn ? 'Reminders on' : 'Turn on reminders') + '">' +
              (notifOn ? _bellOn() : _bellOff()) +
            '</button>' +
            '<button class="btn-water-quick" onclick="logWatering(' + plant.id + ')" title="Mark watered now">💧</button>' +
            '<button class="btn-remove" onclick="removeFromGarden(' + plant.id + ')">Remove</button>' +
          '</div>' +
        '</div>' +
        '<div class="g-added">Added ' + plant.added + '</div>' +
      '</div>' +

      '<div class="g-card-right">' +
        '<div class="g-panel g-care-panel">' +
          '<div class="g-panel-head">Care rhythm</div>' +
          '<div class="g-rhythm-row">' +
            '<div class="g-rhythm-item"><span>Watering</span><strong>' + plant.water + '</strong></div>' +
            '<div class="g-rhythm-item"><span>Sunlight</span><strong>' + plant.sun + '</strong></div>' +
            '<div class="g-rhythm-item"><span>Temperature</span><strong>' + (plant.temp || '18–35°C') + '</strong></div>' +
          '</div>' +
        '</div>' +
        '<div class="g-panel g-log-panel">' +
          '<div class="log-header-row">' +
            '<div class="log-label">Growth log</div>' +
            '<span class="log-count-badge">' + plant.logs.length + ' ' + (plant.logs.length === 1 ? 'entry' : 'entries') + '</span>' +
          '</div>' +
          '<div class="log-entries" id="log-entries-' + plant.id + '">' +
            (!plant.logs.length
              ? '<div class="log-empty-state"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--acid);opacity:.35;margin-bottom:8px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg><p class="log-empty">No entries yet. Record your first observation below.</p></div>'
              : plant.logs.slice().reverse().map(function(l) {
                  return '<div class="log-entry"><span class="log-date">' + l.date + '</span><p class="log-text">' + l.text + '</p></div>';
                }).join(''
            ) ) +
          '</div>' +
          '<div class="log-compose">' +
            '<textarea class="log-textarea" id="log-input-' + plant.id + '" placeholder="Record new growth, observations, treatments…" rows="2" onkeydown="if(event.key===\'Enter\'&&!event.shiftKey){event.preventDefault();addLog(' + plant.id + ')}"></textarea>' +
            '<button class="log-send-btn btn-ink" onclick="addLog(' + plant.id + ')" title="Add entry"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg><span style="margin-left:6px;letter-spacing:.08em;font-weight:700;font-size:11px;text-transform:uppercase;">Add</span></button>' +
          '</div>' +
        '</div>' +
        '<div class="g-panel g-tip-panel">' +
          '<div class="g-panel-head">Pro tips</div>' +
          '<ul class="g-tip-list">' + tips + '</ul>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function removeFromGarden(id) {
  state.garden = state.garden.filter(function(p) { return p.id !== id; });
  persistGarden();
  renderDashboard();
  showToast('Plant removed from garden');
}

function addLog(id) {
  var inp = document.getElementById('log-input-' + id);
  if (!inp || !inp.value.trim()) return;
  var plant = state.garden.find(function(p) { return p.id === id; });
  if (!plant) return;
  var entry = {
    text: inp.value.trim(),
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    id: Date.now()
  };
  plant.logs.push(entry);
  inp.value = '';
  var entries = document.getElementById('log-entries-' + id);
  if (entries) {
    entries.innerHTML = plant.logs.slice().reverse().map(function(l) {
      return '<div class="log-entry"><span class="log-date">' + l.date + '</span><p class="log-text">' + l.text + '</p></div>';
    }).join('');
  }
  var card = inp.closest('.garden-card-right');
  var badge = card && card.querySelector('.log-count-badge');
  if (badge) badge.textContent = plant.logs.length + ' ' + (plant.logs.length === 1 ? 'entry' : 'entries');
  persistGarden();
}

// ══════════════════════════════════════════
// Mobile Garden Card — tap to expand/collapse
// ══════════════════════════════════════════
(function() {
  function isTouch() {
    return window.matchMedia('(pointer:coarse)').matches;
  }

  function initGardenTap() {
    if (!isTouch()) return;
    document.querySelectorAll('.garden-card:not([data-tap-init])').forEach(function(card) {
      card.dataset.tapInit = 'true';
      var left = card.querySelector('.g-card-left');
      if (!left) return;
      left.addEventListener('click', function(e) {
        // Don't toggle if user tapped an action button
        if (e.target.closest('button')) return;
        card.classList.toggle('expanded');
        // Scroll card into view smoothly when expanding
        if (card.classList.contains('expanded')) {
          setTimeout(function() {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 50);
        }
      });
    });
  }

  // Run on DOM ready and whenever garden re-renders
  document.addEventListener('DOMContentLoaded', initGardenTap);
  var _observer = new MutationObserver(function(mutations) {
    var relevant = mutations.some(function(m) {
      return Array.from(m.addedNodes).some(function(n) {
        return n.nodeType === 1 && (n.classList && n.classList.contains('garden-card') || (n.querySelector && n.querySelector('.garden-card')));
      });
    });
    if (relevant) initGardenTap();
  });
  document.addEventListener('DOMContentLoaded', function() {
    var list = document.getElementById('garden-list');
    if (list) _observer.observe(list, { childList: true, subtree: true });
    // Also watch body for when dashboard-filled appears
    _observer.observe(document.body, { childList: true, subtree: false });
  });
})();


// ═══════════════════════════════════════════
// HOW TO GROW — AI-powered step-by-step guide
// ═══════════════════════════════════════════

// Cache so we don't re-fetch for the same plant
var _growCache = {};

function openGrowModal(plantId) {
  var plant = state.garden.find(function(p) { return p.id === plantId; });
  if (!plant) return;

  var modal = document.getElementById('grow-modal');
  var stepsEl = document.getElementById('grow-steps');
  if (!modal || !stepsEl) return;

  document.getElementById('grow-title').textContent = plant.common;
  document.getElementById('grow-latin').textContent = plant.name || '';

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Show cached result immediately
  if (_growCache[plant.id]) {
    _renderGrowSteps(stepsEl, _growCache[plant.id]);
    return;
  }

  // Show loading
  stepsEl.innerHTML = '<div class="grow-loading" id="grow-loading"><div class="grow-spinner"></div><p>Generating growing guide…</p></div>';

  _fetchGrowSteps(plant).then(function(steps) {
    _growCache[plant.id] = steps;
    _renderGrowSteps(stepsEl, steps);
  }).catch(function(err) {
    var fallback = _fallbackGrowSteps(plant);
    _growCache[plant.id] = fallback;
    _renderGrowSteps(stepsEl, fallback);
    console.error('Grow guide error (using offline guide):', err);
  });
}

function closeGrowModal() {
  var modal = document.getElementById('grow-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('click', function(e) {
  var modal = document.getElementById('grow-modal');
  if (modal && e.target === modal) closeGrowModal();
});

function _renderGrowSteps(container, steps, noteHtml) {
  var note = noteHtml || '';
  container.innerHTML = note + steps.map(function(s, i) {
    return '<div class="cg-step grow-step fade-up" style="animation-delay:' + (i * 0.07) + 's">' +
      '<div class="cg-step-num">' + (i + 1) + '</div>' +
      '<div class="cg-step-body">' +
        '<div class="cg-step-head">' +
          '<span class="cg-step-icon">' + (s.icon || '🌱') + '</span>' +
          '<span class="cg-step-title">' + s.title + '</span>' +
        '</div>' +
        '<div class="cg-step-text">' + s.body + '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function _fallbackGrowSteps(plant) {
  var sun = plant.sun || 'bright, indirect light';
  var water = plant.water || 'water when topsoil dries slightly';
  var soil = (plant.guide && plant.guide.soil) || 'loose, well-draining mix with compost';
  var season = (plant.guide && plant.guide.season) || 'mild weather';
  var temp = plant.temp || '18–35°C';

  return [
    { icon: '🪴', title: 'Prep pot & soil', body: 'Use ' + soil + ' in a pot with drainage holes; rinse and reuse pots only after cleaning.' },
    { icon: '🌞', title: 'Pick the spot', body: 'Keep where it gets ' + sun + '; shield from harsh noon rays unless the plant prefers full sun.' },
    { icon: '🌱', title: 'Planting', body: 'Set seedling/cutting slightly above soil line, firm gently, and mulch thinly to lock moisture.' },
    { icon: '💧', title: 'Water rhythm', body: water + '; drain the saucer so roots never sit in water.' },
    { icon: '🌡️', title: 'Climate care', body: 'Maintain around ' + temp + '; avoid strong wind drafts and sudden temperature swings.' },
    { icon: '🧪', title: 'Feed & check', body: 'Add a light compost/seaweed feed every 4–6 weeks; inspect leaves weekly and prune weak shoots.' }
  ];
}

var _GEMINI_ENDPOINT = '/api/gemini/grow';

async function _fetchGrowSteps(plant) {
  var prompt = [
    'You are an expert Indian gardening advisor for Nurture Paradise, an app for Indian gardeners.',
    '',
    'Generate exactly 6 clear step-by-step instructions to grow "' + plant.common + '" (' + (plant.name || '') + ').',
    'Context:',
    '  - Water: ' + (plant.water || 'as needed'),
    '  - Sun: ' + (plant.sun || 'varies'),
    '  - Difficulty: ' + (plant.diff || 'moderate'),
    '  - Soil: ' + (plant.guide && plant.guide.soil ? plant.guide.soil : 'well-draining'),
    '  - Season: ' + (plant.guide && plant.guide.season ? plant.guide.season : 'year-round'),
    '',
    'Return ONLY a valid JSON array (no markdown, no backticks, no explanation) of exactly 6 objects, each with:',
    '  "icon": one relevant emoji',
    '  "title": short step title (3-6 words)',
    '  "body": 1-2 practical sentences, India-specific where relevant',
    '',
    'Example format:',
    '[{"icon":"🪴","title":"Prepare Your Container","body":"Choose a pot..."},...]'
  ].join('\n');

  var response = await fetch(_GEMINI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: prompt })
  });

  if (response.status === 400 || response.status === 403) {
    throw new Error('API key error (400/403). Please check your Gemini key.');
  }
  if (!response.ok) throw new Error('API error ' + response.status + '. Please try again.');

  var data = await response.json();
  var text = '';
  try {
    text = data.candidates[0].content.parts[0].text;
  } catch(e) {
    throw new Error('Unexpected response from Gemini. Please try again.');
  }

  // Strip markdown fences if present
  text = text.replace(/```json|```/g, '').trim();
  var steps = _parseStepsJson(text);
  if (!Array.isArray(steps)) throw new Error('Invalid response format');
  return steps;
}

function _parseStepsJson(text) {
  try {
    return JSON.parse(text);
  } catch (e1) {
    // Try to salvage by clipping to first [ and last ] in case the model added prose
    var start = text.indexOf('[');
    var end = text.lastIndexOf(']');
    if (start !== -1 && end !== -1 && end > start) {
      var clipped = text.slice(start, end + 1);
      try { return JSON.parse(clipped); } catch(e2) {}
    }
    throw new Error('AI response was not valid JSON');
  }
}