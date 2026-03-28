// ═══════════════════════════════════════════
// Nurture Paradise — Main App — State, Auth, Discover, Router
// ═══════════════════════════════════════════

// ══════════════════════════════════════════
// DATA
// ══════════════════════════════════════════
const PLANTS = [
  {id:1,name:"Ocimum tenuiflorum",common:"Holy Basil",origin:"South Asia",difficulty:"Beginner",emoji:"🌿",
   season:"Year-round",water:"Daily",sun:"Full sun",temp:"20–35°C",soil:"Loamy, well-drained",
   timeline:"3–4 weeks to first harvest",note:"Sacred and medicinal. A natural insect repellent and adaptogen that thrives in Indian warmth.",
   guide:{soil:"Loamy soil, pH 6–7.5. Enrich with organic compost.",sunlight:"6–8 hours direct sun. Ideal on south-facing balconies.",
    water:"Daily in summer. Every 2 days in winter. Never waterlog.",temp:"Loves warmth. Protect from frost.",
    season:"Best sown March–June or August–October.",timeline:"Germination 7–14 days · Harvest-ready 3–4 weeks · Full plant 2–3 months",
    tips:["Pinch buds before flowering to encourage leaf growth","Repot annually into a 12-inch container","Use neem oil spray for aphid control"]},
   products:["organic-compost","12-inch-pot","watering-can","neem-spray"],tags:["Medicinal","Aromatic"],climate:["tropical","subtropical","arid"]},
  {id:2,name:"Epipremnum aureum",common:"Pothos",origin:"Southeast Asia",difficulty:"Beginner",emoji:"🍃",
   season:"Year-round",water:"Twice weekly",sun:"Indirect light",temp:"15–30°C",soil:"Any well-drained",
   timeline:"Continuous growth",note:"Near-indestructible. Tolerates low light and irregular watering beautifully.",
   guide:{soil:"Any potting mix. Add perlite for drainage.",sunlight:"Bright indirect light. Tolerates low light.",
    water:"When top inch of soil dries. Overwatering is the only real danger.",temp:"15–30°C.",
    season:"Propagates year-round.",timeline:"Cuttings root 2–4 weeks · Established 2 months",
    tips:["Propagate cuttings in water","Wipe leaves monthly","Yellowing = overwatering"]},
   products:["perlite","8-inch-pot","liquid-fertilizer","misting-bottle"],tags:["Indoor","Air-purifying"],climate:["tropical","subtropical","temperate"]},
  {id:3,name:"Aloe barbadensis",common:"Aloe Vera",origin:"Arabian Peninsula",difficulty:"Beginner",emoji:"🌵",
   season:"Spring–Summer",water:"Weekly",sun:"Partial sun",temp:"13–27°C",soil:"Sandy, fast-draining",
   timeline:"1–2 years to harvest gel",note:"The apothecary's plant. Thrives on neglect. Essential for every home.",
   guide:{soil:"Cactus mix or sandy loam. pH 7–8.5.",sunlight:"4–6 hours. Avoid harsh afternoon sun.",
    water:"Water deeply, then let soil dry completely. Every 7–10 days.",temp:"13–27°C. Frost kills it.",
    season:"Plant March–May.",timeline:"Pups appear 3–6 months · Gel harvestable 1–2 years",
    tips:["Terracotta pots are ideal","Harvest only outer leaves","Repot when pups crowd the container"]},
   products:["cactus-mix","terracotta-pot","succulent-fertilizer","drainage-tray"],tags:["Medicinal","Succulent"],climate:["arid","subtropical","semiarid"]},
  {id:4,name:"Solanum lycopersicum",common:"Cherry Tomato",origin:"South America",difficulty:"Intermediate",emoji:"🍅",
   season:"Oct–Feb",water:"Daily",sun:"Full sun 6–8h",temp:"18–27°C",soil:"Rich, loamy",
   timeline:"60–80 days to harvest",note:"Grow fresh tomatoes on any balcony. One of the most rewarding container crops.",
   guide:{soil:"Rich loam with compost. pH 6–6.8.",sunlight:"Minimum 6 hours direct sun.",
    water:"Regular, consistent. Mulch to retain moisture.",temp:"18–27°C. In Delhi, grow October–February.",
    season:"Sow September–November in North India.",timeline:"Germination 5–10 days · Flowering 40–50 days · Harvest 60–80 days",
    tips:["Stake plants as they grow","Pinch suckers for bigger yield","Feed with potassium fertilizer at flowering"]},
   products:["vermicompost","14-inch-pot","tomato-fertilizer","bamboo-stakes"],tags:["Edible","Container"],climate:["subtropical","temperate","tropical"]},
  {id:5,name:"Spathiphyllum wallisii",common:"Peace Lily",origin:"Tropical Americas",difficulty:"Beginner",emoji:"🌸",
   season:"Year-round",water:"Weekly",sun:"Low indirect",temp:"18–30°C",soil:"Peat-based, moist",
   timeline:"Blooms in 1–2 years",note:"Elegant white spathes and a NASA-certified air purifier. Made for interiors.",
   guide:{soil:"Peat-based potting mix. Keep moist but never soggy.",sunlight:"Thrives in low light.",
    water:"Water when leaves slightly droop.",temp:"18–30°C.",
    season:"Any time.",timeline:"Settles in 4–6 weeks · First bloom 1–2 years",
    tips:["Mist regularly for humidity","Wipe leaves with damp cloth","Feed monthly with balanced fertilizer"]},
   products:["peat-mix","10-inch-pot","liquid-fertilizer","misting-bottle"],tags:["Flowering","Indoor"],climate:["tropical","subtropical","temperate"]},
  {id:6,name:"Tagetes erecta",common:"Marigold",origin:"Mexico",difficulty:"Beginner",emoji:"🌼",
   season:"Oct–Feb",water:"2–3× weekly",sun:"Full sun",temp:"15–30°C",soil:"Moderately fertile",
   timeline:"45–60 days to first bloom",note:"Vivid, fragrant, and a natural pest deterrent. The soul of the Indian garden.",
   guide:{soil:"Moderately fertile, well-drained. Less nitrogen = more flowers.",sunlight:"Full sun.",
    water:"Water at base. Keep soil evenly moist.",temp:"15–30°C.",
    season:"Sow September–November.",timeline:"Germination 5–7 days · Bloom 45–60 days",
    tips:["Deadhead spent flowers","Plant near vegetables to deter pests","Direct sow for best germination"]},
   products:["garden-soil","8-inch-pot","seeds-marigold","watering-can"],tags:["Flowering","Outdoor"],climate:["tropical","subtropical","arid"]},
  {id:7,name:"Dracaena trifasciata",common:"Snake Plant",origin:"West Africa",difficulty:"Beginner",emoji:"🗡️",
   season:"Year-round",water:"Every 2–3 weeks",sun:"Any",temp:"15–35°C",soil:"Sandy, well-drained",
   timeline:"Slow, steady",note:"NASA's top air purifier. Tolerates complete neglect. The perfect modern plant.",
   guide:{soil:"Cactus/succulent mix.",sunlight:"Extremely adaptable. Grows in dark corners.",
    water:"Every 2–3 weeks in summer, monthly in winter.",temp:"15–35°C.",
    season:"Any time.",timeline:"New leaves 2–4 months · Division after 1–2 years",
    tips:["Never let it sit in water","Terracotta pots prevent overwatering","Can survive months without water"]},
   products:["cactus-mix","terracotta-pot","drainage-tray"],tags:["Indoor","Low-maintenance"],climate:["tropical","subtropical","arid","temperate"]},
  {id:8,name:"Spinacia oleracea",common:"Spinach",origin:"Central Asia",difficulty:"Intermediate",emoji:"🥬",
   season:"Oct–Feb",water:"Every 2 days",sun:"Partial sun",temp:"10–20°C",soil:"Rich, nitrogen-rich",
   timeline:"35–45 days to first harvest",note:"Grow your own palak. Fast, nutritious, perfect for balcony containers.",
   guide:{soil:"Rich loamy soil with nitrogen. Add compost generously.",sunlight:"Partial shade in warm months.",
    water:"Keep consistently moist.",temp:"10–20°C. Bolts in heat.",
    season:"Sow October–November.",timeline:"Germination 7–14 days · First harvest 35–45 days",
    tips:["Harvest outer leaves to keep plant producing","Sow in succession every 2 weeks","Liquid nitrogen fertilizer boosts growth"]},
   products:["vegetable-soil","grow-bag","nitrogen-fertilizer","seeds-spinach"],tags:["Edible","Fast-growing"],climate:["temperate","subtropical"]},
];

const PRODUCTS = {
  "organic-compost":{name:"Organic Compost Mix",price:249,sym:"🌿",cat:"Soil",img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=640&q=80"},
  "12-inch-pot":{name:'12″ Ceramic Planter',price:399,sym:"🪴",cat:"Planters",img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=640&q=80"},
  "8-inch-pot":{name:'8″ Terracotta Pot',price:199,sym:"🏺",cat:"Planters",img:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=640&q=80"},
  "10-inch-pot":{name:'10″ Glazed Planter',price:299,sym:"🪴",cat:"Planters",img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=640&q=80"},
  "14-inch-pot":{name:'14″ Grow Planter',price:499,sym:"🌳",cat:"Planters",img:"https://images.unsplash.com/photo-1471109880861-75cec67f8b68?auto=format&fit=crop&w=640&q=80"},
  "watering-can":{name:"Long-Spout Watering Can",price:349,sym:"🚿",cat:"Tools",img:"https://images.unsplash.com/photo-1509958924214-0ca6d88ebb0a?auto=format&fit=crop&w=640&q=80"},
  "neem-spray":{name:"Neem Oil Spray 250ml",price:189,sym:"🧴",cat:"Care",img:"https://images.unsplash.com/photo-1582719478248-54e9f2af5c90?auto=format&fit=crop&w=640&q=80"},
  "perlite":{name:"Horticultural Perlite 1kg",price:149,sym:"🪨",cat:"Soil",img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=640&q=80"},
  "liquid-fertilizer":{name:"Balanced Liquid Fertiliser",price:279,sym:"💧",cat:"Fertilisers",img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=640&q=80"},
  "misting-bottle":{name:"Fine Mist Spray Bottle",price:129,sym:"💦",cat:"Tools",img:"https://images.unsplash.com/photo-1504221507732-5246c045949b?auto=format&fit=crop&w=640&q=80"},
  "cactus-mix":{name:"Cactus & Succulent Mix",price:199,sym:"🌵",cat:"Soil",img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=640&q=80"},
  "terracotta-pot":{name:"Classic Terracotta Pot",price:149,sym:"🏺",cat:"Planters",img:"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=640&q=80"},
  "succulent-fertilizer":{name:"Succulent Fertiliser",price:159,sym:"✨",cat:"Fertilisers",img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=640&q=80"},
  "drainage-tray":{name:"Drainage Saucer Set",price:99,sym:"🫙",cat:"Accessories",img:"https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=640&q=80"},
  "vermicompost":{name:"Premium Vermicompost 2kg",price:299,sym:"🌿",cat:"Soil",img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=640&q=80"},
  "tomato-fertilizer":{name:"Tomato Growth Fertiliser",price:249,sym:"🍅",cat:"Fertilisers",img:"https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&w=640&q=80"},
  "bamboo-stakes":{name:"Bamboo Garden Stakes ×10",price:79,sym:"🎋",cat:"Tools",img:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=640&q=80"},
  "peat-mix":{name:"Peat-Based Potting Mix",price:229,sym:"🌍",cat:"Soil",img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=640&q=80"},
  "garden-soil":{name:"Garden Soil Mix 5kg",price:199,sym:"🌱",cat:"Soil",img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=640&q=80"},
  "seeds-marigold":{name:"Marigold Seeds",price:49,sym:"🌼",cat:"Seeds",img:"https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=640&q=80"},
  "vegetable-soil":{name:"Vegetable Garden Soil",price:249,sym:"🥬",cat:"Soil",img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=640&q=80"},
  "grow-bag":{name:"Fabric Grow Bag 12L",price:199,sym:"🛍️",cat:"Planters",img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=640&q=80"},
  "nitrogen-fertilizer":{name:"Liquid Nitrogen Fertiliser",price:189,sym:"⚗️",cat:"Fertilisers",img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=640&q=80"},
  "seeds-spinach":{name:"Spinach Seeds",price:39,sym:"🌿",cat:"Seeds",img:"https://images.unsplash.com/photo-1459664018906-085c36f472af?auto=format&fit=crop&w=640&q=80"},
};

// ── Image helper ──
// Many hosts block hotlinking. Route external images through a proxy once if they fail.
function normalizeImageUrl(url) {
  if (!url) return '';
  // Avoid retry loops and keep data URIs as-is
  if (url.startsWith('data:') || url.includes('images.weserv.nl/')) return url;
  try {
    const parsed = new URL(url, window.location.href);
    const target = `${parsed.hostname}${parsed.pathname}${parsed.search || ''}`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(target)}`;
  } catch (e) {
    return url;
  }
}

// Auto-proxy any broken <img> once to recover from hotlink/CORS blocks
document.addEventListener('error', (evt) => {
  const el = evt.target;
  if (!(el instanceof HTMLImageElement)) return;
  if (el.dataset.imgRetry === '1') return;
  const proxied = normalizeImageUrl(el.getAttribute('src'));
  if (proxied && proxied !== el.src) {
    el.dataset.imgRetry = '1';
    el.src = proxied;
  }
}, true);

const CITY_CLIMATE = {delhi:"subtropical",mumbai:"tropical",bangalore:"temperate",hyderabad:"subtropical",chennai:"tropical",kolkata:"tropical",pune:"temperate",jaipur:"arid",ahmedabad:"arid",lucknow:"subtropical",shimla:"temperate",chandigarh:"subtropical"};

// ══════════════════════════════════════════
// STATE
// ══════════════════════════════════════════
let state = {
  currentPage:'login', city:'', searched:false,
  garden:[], cart:[], detailPlant:null,
  diagMode:'text', diagImg:null, diagImgFile:null,
  shopCat:'All', shopSort:'default', currentUser:null, onboardStep:1,
  useFirebase: false,   // true once Firebase is connected
  users: [],            // fallback local-only mode
};

const _GARDEN_LOCAL_KEY = 'np_garden_local_v1';
const _SESSION_USER_KEY = 'np_session_user_v1';

function _compactGardenForStorage(garden) {
  return (garden || []).map(p => ({
    id: p.id,
    added: p.added,
    logs: p.logs || [],
    lastWatered: p.lastWatered || null,
    notificationsOn: !!p.notificationsOn
  }));
}

function _rehydrateGarden(list) {
  return (list || []).map(p => {
    const base = (typeof PLANT_DB !== 'undefined' ? PLANT_DB.find(pl => pl.id === p.id) : null)
      || PLANTS.find(pl => pl.id === p.id);
    if (!base) return null;
    return {
      ...base,
      added: p.added || base.added || new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long'}),
      logs: p.logs || [],
      lastWatered: p.lastWatered || null,
      notificationsOn: !!p.notificationsOn
    };
  }).filter(Boolean);
}

function persistSessionUser() {
  try {
    if (!state.currentUser) {
      localStorage.removeItem(_SESSION_USER_KEY);
      return;
    }
    const u = state.currentUser;
    localStorage.setItem(_SESSION_USER_KEY, JSON.stringify({
      email: u.email || '',
      firstName: u.firstName || 'User',
      lastName: u.lastName || '',
      onboarded: !!u.onboarded,
      uid: u.uid || null
    }));
  } catch(e) { console.warn('Session save failed', e); }
}

function restoreSessionUser() {
  try {
    const raw = localStorage.getItem(_SESSION_USER_KEY);
    if (!raw) return false;
    const u = JSON.parse(raw);
    if (u && u.email) {
      state.currentUser = u;
      return true;
    }
  } catch(e) { console.warn('Session restore failed', e); }
  return false;
}

function persistGarden() {
  try {
    localStorage.setItem(_GARDEN_LOCAL_KEY, JSON.stringify(_compactGardenForStorage(state.garden)));
  } catch(e) { console.warn('Local garden save failed', e); }
  if (state.useFirebase && window._fb && state.currentUser?.uid) {
    fbSaveGarden().catch(()=>{});
  }
}

function loadGardenLocal() {
  try {
    const raw = localStorage.getItem(_GARDEN_LOCAL_KEY);
    if (!raw) return;
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) state.garden = _rehydrateGarden(arr);
  } catch(e) { console.warn('Local garden load failed', e); }
}

// Listen for admin panel saves (localStorage) and hot-refresh data in the main site
window.addEventListener('storage', (e) => {
  if (e.key === 'np_admin_products' && state.currentPage === 'shop') {
    renderShop();
  }
  if (e.key === 'np_admin_plants') {
    if (typeof applyAdminPlantOverrides === 'function') applyAdminPlantOverrides();
    if (state.currentPage === 'discover') renderDiscover();
    else if (state.currentPage === 'home') renderHome();
    else if (state.currentPage === 'detail') renderDetail();
  }
});

// ══════════════════════════════════════════
// FIREBASE SETUP
// ══════════════════════════════════════════
function showFbSetup() {
  document.getElementById('fb-setup-overlay').style.display = 'flex';
}
function hideFbSetup() {
  document.getElementById('fb-setup-overlay').style.display = 'none';
}

function submitFbConfig() {
  const raw = document.getElementById('fb-config-input').value.trim();
  const errEl = document.getElementById('fb-error');
  errEl.style.display = 'none';
  try {
    // Strip JS variable assignment if pasted as-is from Firebase console
    const jsonStr = raw
      .replace(/^const\s+\w+\s*=\s*/, '')
      .replace(/;$/, '')
      .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3'); // unquoted keys → quoted
    const config = JSON.parse(jsonStr);
    if (!config.apiKey || !config.projectId) throw new Error('Missing fields');
    localStorage.setItem('np_fb_config', JSON.stringify(config));
    const ok = window._initFirebase(config);
    if (!ok) throw new Error('Init failed');
    hideFbSetup();
    showToast('Database connected ✓');
    state.useFirebase = true;
    // Re-init auth listener
    initAuthListener();
  } catch(e) {
    errEl.style.display = 'block';
    errEl.textContent = 'Invalid config — check the format and try again.';
  }
}

function skipFbSetup() {
  hideFbSetup();
  state.useFirebase = false;
  // Fall through to login page as local-only mode
}

// ══════════════════════════════════════════
// FIREBASE AUTH LISTENER
// ══════════════════════════════════════════
function initAuthListener() {
  if (!window._fb) return;
  const { auth, onAuthStateChanged } = window._fb;
  onAuthStateChanged(auth, async (fbUser) => {
    if (fbUser && state.currentPage === 'login' || state.currentPage === 'register') {
      // Already logged in via Firebase — load their data and go home
      await loadUserData(fbUser);
    }
  });
}

// Run setup check on page load
window.addEventListener('firebase-ready', () => {
  state.useFirebase = true;
  initAuthListener();
});

window.addEventListener('load', () => {
  // Config is hardcoded — Firebase is always ready, hide setup overlay
  document.getElementById('fb-setup-overlay').style.display = 'none';
  state.useFirebase = !!window._fb;
  // Always restore local garden so refreshes keep plants; Firebase load (if logged in) will override afterward
  loadGardenLocal();
  const restored = restoreSessionUser();
  // If we have a restored user, skip login screen
  if (restored && state.currentPage === 'login') goHome();
});

// ══════════════════════════════════════════
// FIREBASE DATA HELPERS
// ══════════════════════════════════════════
function uid() { return window._fb?.auth?.currentUser?.uid || null; }

async function fbSaveUser(user) {
  if (!window._fb || !uid()) return;
  const { db, doc, setDoc } = window._fb;
  await setDoc(doc(db, 'users', uid()), {
    firstName: user.firstName,
    lastName: user.lastName || '',
    email: user.email,
    onboarded: user.onboarded || false,
    city: state.city || '',
    updatedAt: window._fb.serverTimestamp()
  }, { merge: true });
}

async function fbLoadUser() {
  if (!window._fb || !uid()) return null;
  const { db, doc, getDoc } = window._fb;
  const snap = await getDoc(doc(db, 'users', uid()));
  return snap.exists() ? snap.data() : null;
}

async function fbSaveGarden() {
  if (!window._fb || !uid()) return;
  const { db, doc, setDoc } = window._fb;
  // Save garden as a single document (array) for simplicity
  const gardenData = _compactGardenForStorage(state.garden);
  await setDoc(doc(db, 'gardens', uid()), { plants: gardenData }, { merge: false });
}

async function fbLoadGarden() {
  if (!window._fb || !uid()) return;
  const { db, doc, getDoc } = window._fb;
  const snap = await getDoc(doc(db, 'gardens', uid()));
  if (!snap.exists()) return;
  const { plants } = snap.data();
  state.garden = _rehydrateGarden(plants);
}

async function fbSaveCart() {
  if (!window._fb || !uid()) return;
  const { db, doc, setDoc } = window._fb;
  await setDoc(doc(db, 'carts', uid()), {
    items: state.cart.map(i => i.id),
    updatedAt: window._fb.serverTimestamp()
  });
}

async function fbLoadCart() {
  if (!window._fb || !uid()) return;
  const { db, doc, getDoc } = window._fb;
  const snap = await getDoc(doc(db, 'carts', uid()));
  if (!snap.exists()) return;
  const { items } = snap.data();
  state.cart = (items || []).map(id => ({ id, ...PRODUCTS[id] })).filter(p => p.name);
}

async function fbSaveDiagnosis(prompt, result) {
  if (!window._fb || !uid()) return;
  const { db, collection, addDoc, serverTimestamp } = window._fb;
  await addDoc(collection(db, 'users', uid(), 'diagnoses'), {
    prompt: prompt.slice(0, 500),
    result: result.slice(0, 2000),
    mode: state.diagMode,
    createdAt: serverTimestamp()
  });
}

async function loadUserData(fbUser) {
  // Load profile
  const profile = await fbLoadUser();
  state.currentUser = {
    uid: fbUser.uid,
    email: fbUser.email,
    firstName: profile?.firstName || fbUser.displayName?.split(' ')[0] || 'User',
    lastName: profile?.lastName || '',
    onboarded: profile?.onboarded || false,
  };
  persistSessionUser();
  if (profile?.city) { state.city = profile.city; state.searched = true; }
  // Load garden + cart in parallel
  await Promise.all([fbLoadGarden(), fbLoadCart()]);
  // If Firebase has data, mirror to local for offline; if empty, fall back to local cache
  if (state.garden.length) {
    persistGarden();
  } else {
    loadGardenLocal();
  }
  updateCartBadge();
  goHome();
}

// ── Theme ──────────────────────────────────────────────────────────────────────
function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const emoji = dark ? '🌙' : '🌿';
  document.querySelectorAll('.theme-toggle-knob').forEach(k => { k.textContent = emoji; });
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = !isDark;
  localStorage.setItem('np_theme', next ? 'dark' : 'light');
  applyTheme(next);
}

// Apply saved theme immediately on load
(function() {
  const saved = localStorage.getItem('np_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved === 'dark' || (!saved && prefersDark));
})();

// ══════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ══════════════════════════════════════════
// HAMBURGER / DRAWER
// ══════════════════════════════════════════
function toggleDrawer() {
  const drawer = document.getElementById('nav-drawer');
  const burger = document.getElementById('nav-hamburger');
  const isOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open', !isOpen);
  burger.classList.toggle('open', !isOpen);
}

// Close drawer when clicking outside
document.addEventListener('click', (e) => {
  const drawer = document.getElementById('nav-drawer');
  const burger = document.getElementById('nav-hamburger');
  if (drawer.classList.contains('open') && !drawer.contains(e.target) && !burger.contains(e.target)) {
    drawer.classList.remove('open');
    burger.classList.remove('open');
  }
});

// ══════════════════════════════════════════
// NAV
// ══════════════════════════════════════════
function navigate(page) {
  // Guard: if not logged in, only allow auth pages
  const authPages = ['login','register'];
  if (!state.currentUser && !authPages.includes(page)) { navigate('login'); return; }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link, .nav-drawer-link').forEach(l => l.classList.remove('active'));
  const pageEl = document.getElementById('page-' + page);
  if (pageEl) pageEl.classList.add('active');
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');
  const drawerEl = document.getElementById('drawer-' + page);
  if (drawerEl) drawerEl.classList.add('active');
  const nav = document.getElementById('nav');
  nav.style.display = authPages.includes(page) ? 'none' : 'flex';
  document.getElementById('nav-drawer').classList.remove('open');
  const burger = document.getElementById('nav-hamburger');
  if (burger) burger.classList.remove('open');
  state.currentPage = page;
  window.scrollTo({ top:0, behavior:'smooth' });
  renderPage(page);
}

window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 20);
});

// ══════════════════════════════════════════
// AUTH — Firebase + local fallback
// ══════════════════════════════════════════
function togglePwd(id, btn) {
  const inp = document.getElementById(id);
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? 'Show' : 'Hide';
}
function clearLoginErrors() {
  ['login-email-err','login-pwd-err'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});
  ['login-email','login-password'].forEach(id=>{const el=document.getElementById(id);if(el)el.classList.remove('error');});
}
function clearRegisterErrors() {
  ['reg-first-err','reg-email-err','reg-pwd-err','reg-confirm-err'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});
  ['reg-first','reg-email','reg-password','reg-confirm'].forEach(id=>{const el=document.getElementById(id);if(el)el.classList.remove('error');});
}
function showFieldError(errId, inputId) {
  const err=document.getElementById(errId); const inp=document.getElementById(inputId);
  if(err)err.style.display='block'; if(inp)inp.classList.add('error');
}

async function doLogin() {
  clearLoginErrors();
  const email = document.getElementById('login-email').value.trim();
  const pwd   = document.getElementById('login-password').value;
  if (!email||!email.includes('@')) { showFieldError('login-email-err','login-email'); return; }
  if (!pwd) { showFieldError('login-pwd-err','login-password'); return; }
  const btn = document.querySelector('#page-login .auth-btn-primary');
  if (btn) { btn.disabled=true; btn.textContent='Signing in…'; }
  if (state.useFirebase && window._fb) {
    try {
      const { auth, signInWithEmailAndPassword } = window._fb;
      const cred = await signInWithEmailAndPassword(auth, email, pwd);
      await loadUserData(cred.user);
      persistSessionUser();
    } catch(e) {
      const errEl=document.getElementById('login-pwd-err');
      errEl.textContent=['auth/user-not-found','auth/wrong-password','auth/invalid-credential'].includes(e.code) ? 'Incorrect email or password.' : (e.message||'Sign in failed.');
      errEl.style.display='block'; document.getElementById('login-password').classList.add('error');
    }
  } else {
    const users=JSON.parse(localStorage.getItem('np_users')||'[]');
    const user=users.find(u=>u.email.toLowerCase()===email.toLowerCase()&&u.password===pwd);
    if (user) { state.currentUser=user; persistSessionUser(); goHome(); }
    else { const e=document.getElementById('login-pwd-err'); e.textContent='Incorrect email or password.'; e.style.display='block'; document.getElementById('login-password').classList.add('error'); }
  }
  if (btn) { btn.disabled=false; btn.innerHTML='<svg class="auth-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> Sign in'; }
}

function demoLogin() {
  state.currentUser = { email:'guest@nurture.app', firstName:'Guest', lastName:'', onboarded:true, uid:null };
  persistSessionUser();
  goHome();
}

async function doRegister() {
  clearRegisterErrors();
  const first=document.getElementById('reg-first').value.trim();
  const email=document.getElementById('reg-email').value.trim();
  const pwd=document.getElementById('reg-password').value;
  const confirm=document.getElementById('reg-confirm').value;
  let ok=true;
  if (!first) { showFieldError('reg-first-err','reg-first'); ok=false; }
  if (!email||!email.includes('@')) { showFieldError('reg-email-err','reg-email'); ok=false; }
  if (pwd.length<6) { showFieldError('reg-pwd-err','reg-password'); ok=false; }
  if (pwd!==confirm) { showFieldError('reg-confirm-err','reg-confirm'); ok=false; }
  if (!ok) return;
  const btn=document.querySelector('#page-register .auth-btn-primary');
  if (btn) { btn.disabled=true; btn.textContent='Creating account…'; }
  if (state.useFirebase && window._fb) {
    try {
      const { auth, createUserWithEmailAndPassword, updateProfile } = window._fb;
      const cred = await createUserWithEmailAndPassword(auth, email, pwd);
      await updateProfile(cred.user, { displayName: first });
      state.currentUser = { uid:cred.user.uid, email, firstName:first, lastName:document.getElementById('reg-last').value.trim(), onboarded:false };
      await fbSaveUser(state.currentUser);
      persistSessionUser();
      if (btn) { btn.disabled=false; btn.textContent='Create account'; }
      startOnboarding();
    } catch(e) {
      const errEl=document.getElementById('reg-email-err');
      errEl.textContent=e.code==='auth/email-already-in-use'?'An account with this email already exists.':(e.message||'Registration failed.');
      errEl.style.display='block'; document.getElementById('reg-email').classList.add('error');
      if (btn) { btn.disabled=false; btn.textContent='Create account'; }
    }
  } else {
    const users=JSON.parse(localStorage.getItem('np_users')||'[]');
    if (users.find(u=>u.email.toLowerCase()===email.toLowerCase())) {
      const e=document.getElementById('reg-email-err'); e.textContent='An account with this email already exists.'; e.style.display='block'; document.getElementById('reg-email').classList.add('error');
      if (btn) { btn.disabled=false; btn.textContent='Create account'; } return;
    }
    const newUser={email,password:pwd,firstName:first,lastName:document.getElementById('reg-last').value.trim(),onboarded:false};
    users.push(newUser); localStorage.setItem('np_users',JSON.stringify(users));
    state.currentUser=newUser; persistSessionUser();
    if (btn) { btn.disabled=false; btn.textContent='Create account'; }
    startOnboarding();
  }
}

function goHome() {
  const user=state.currentUser;
  const isGuest=user.email==='guest@nurture.app';
  document.getElementById('nav-user-name').textContent=isGuest?'Sign in':user.firstName;
  document.getElementById('nav-user-name-drawer').textContent=isGuest?'Sign in':user.firstName;
  const di=document.getElementById('nav-user-icon'); const dd=document.getElementById('drawer-user-icon');
  if(di) di.style.display=isGuest?'inline-block':'none';
  if(dd) dd.style.display=isGuest?'inline-block':'none';
  navigate('home');
}

async function handleUserBtn() {
  const isGuest=state.currentUser?.email==='guest@nurture.app';
  if (isGuest) {
    state.currentUser=null; state.garden=[]; state.cart=[]; persistSessionUser(); updateCartBadge(); navigate('login');
  } else {
    if (!confirm('Sign out of Nurture Paradise?')) return;
    if (state.useFirebase && window._fb) { try { await window._fb.signOut(window._fb.auth); } catch(e){} }
    state.currentUser=null; state.garden=[]; state.cart=[]; persistSessionUser(); updateCartBadge(); navigate('login');
  }
}
function handleLogout() { handleUserBtn(); }

// ══════════════════════════════════════════
// ONBOARDING — injected only after registration, destroyed when done
// ══════════════════════════════════════════
const ONBOARD_STEPS = [
  {
    num:'1 of 5', q:'Where does your <em>garden</em> grow?',
    hint:"We'll match plants to your local climate and growing season.",
    render: () => `
      <div class="field-wrap" style="margin-bottom:44px">
        <label class="field-label">Your city</label>
        <input class="onboard-input-big" id="onboard-city" placeholder="Delhi, Mumbai, Bangalore…"/>
        <div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">
          ${['Delhi','Mumbai','Bangalore','Jaipur','Pune','Chennai'].map(c=>`
            <button class="btn-outline" type="button" style="padding:6px 16px;font-size:12px"
              onclick="document.getElementById('onboard-city').value='${c}'">${c}</button>
          `).join('')}
        </div>
      </div>`,
    onNext: () => {
      const v = document.getElementById('onboard-city')?.value.trim();
      if (v) { state.city = v; state.searched = true; }
    }
  },
  {
    num:'2 of 5', q:'How would you describe your <em>experience</em>?',
    hint:'This helps us recommend the right plants and guides for you.',
    render: () => `
      <div class="onboard-choices" id="exp-choices" style="margin-bottom:44px">
        ${[['beginner','🌱','Just starting','My first plant. I need simple, forgiving species.'],
           ['hobbyist','🪴','Casual hobbyist','I\'ve kept a few plants alive. Looking to learn more.'],
           ['enthusiast','🌿','Enthusiast','I have a collection and love experimenting.'],
           ['expert','🌳','Expert grower','Propagation, fertilisation — I know it all.']
          ].map(([v,i,l,d])=>`
          <div class="choice-card" data-val="${v}" onclick="selectChoice('exp-choices',this)">
            <div class="choice-icon">${i}</div>
            <div class="choice-label">${l}</div>
            <div class="choice-desc">${d}</div>
          </div>`).join('')}
      </div>`,
    onNext: () => {}
  },
  {
    num:'3 of 5', q:'What\'s your growing <em>space</em> like?',
    hint:'Select all that apply — we\'ll tailor your recommendations.',
    render: () => `
      <div class="onboard-choices" id="space-choices" style="grid-template-columns:repeat(auto-fill,minmax(155px,1fr));margin-bottom:44px">
        ${[['balcony','🏙️','Balcony','Container gardening in the sky.'],
           ['windowsill','🪟','Windowsill','Small sill with good light.'],
           ['indoors','🛋️','Indoors','Interior spaces, low light.'],
           ['terrace','☀️','Terrace / Roof','Open sky, full exposure.'],
           ['garden','🌍','Ground garden','In-ground beds and borders.']
          ].map(([v,i,l,d])=>`
          <div class="choice-card" data-val="${v}" onclick="this.classList.toggle('selected')">
            <div class="choice-icon">${i}</div>
            <div class="choice-label">${l}</div>
            <div class="choice-desc">${d}</div>
          </div>`).join('')}
      </div>`,
    onNext: () => {}
  },
  {
    num:'4 of 5', q:'What do you want to <em>grow</em>?',
    hint:'Your goals help us highlight the most relevant plants and guides.',
    render: () => `
      <div class="onboard-choices" id="goal-choices" style="margin-bottom:44px">
        ${[['food','🥦','Food & herbs','Vegetables, fruits, kitchen herbs.'],
           ['flowers','🌸','Flowers','Colour, fragrance, beauty.'],
           ['indoor','🍃','Indoor plants','Air quality and green interiors.'],
           ['medicinal','🌿','Medicinal','Traditional and Ayurvedic plants.']
          ].map(([v,i,l,d])=>`
          <div class="choice-card" data-val="${v}" onclick="this.classList.toggle('selected')">
            <div class="choice-icon">${i}</div>
            <div class="choice-label">${l}</div>
            <div class="choice-desc">${d}</div>
          </div>`).join('')}
      </div>`,
    onNext: () => {}
  },
  {
    num:'5 of 5', q:'How many minutes can you spend <em>gardening</em> each day?',
    hint:"Be honest — we'll suggest plants that fit your lifestyle.",
    render: () => `
      <div class="range-wrap" style="margin-bottom:44px">
        <div class="range-labels"><span>5 min</span><span>60+ min</span></div>
        <input type="range" id="time-slider" min="5" max="60" step="5" value="15"
          oninput="document.getElementById('time-display').innerHTML=this.value+' <span style=\'font-size:18px;color:var(--ink-faint)\'>min / day</span>'"/>
        <div class="range-value" id="time-display" style="font-family:var(--font-serif);font-size:48px;color:var(--ink);font-weight:300;text-align:center;margin-top:20px">
          15 <span style="font-size:18px;color:var(--ink-faint)">min / day</span>
        </div>
      </div>`,
    onNext: () => {}
  }
];

function startOnboarding() {
  const name = state.currentUser.firstName;
  document.getElementById('nav-user-name').textContent = name;
  document.getElementById('nav-user-name-drawer').textContent = name;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('nav').style.display = 'none';
  document.getElementById('nav-drawer').classList.remove('open');

  // Remove any stale overlay before injecting fresh one
  const existing = document.getElementById('onboard-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'onboard-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:var(--cream);overflow-y:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;';
  document.body.appendChild(overlay);

  state.onboardStep = 1;
  renderOnboardStep();
}

function renderOnboardStep() {
  const overlay = document.getElementById('onboard-overlay');
  if (!overlay) return;
  const idx = state.onboardStep - 1;
  const step = ONBOARD_STEPS[idx];
  const pct = ((state.onboardStep - 1) / ONBOARD_STEPS.length) * 100;
  const isFirst = state.onboardStep === 1;
  const isLast  = state.onboardStep === ONBOARD_STEPS.length;

  // Build HTML — no onclick strings, buttons get IDs and listeners added below
  overlay.innerHTML = `
    <div style="width:100%;max-width:680px">
      <div style="height:2px;background:var(--border);border-radius:1px;margin-bottom:56px;overflow:hidden">
        <div id="ob-bar" style="height:100%;background:var(--green);border-radius:1px;width:${pct}%;transition:width 0.5s cubic-bezier(0.22,1,0.36,1)"></div>
      </div>
      <div style="animation:fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both">
        <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--ink-faint);margin-bottom:16px;font-weight:500">Step ${step.num}</div>
        <h2 style="font-family:var(--font-serif);font-size:clamp(26px,4vw,42px);color:var(--ink);font-weight:500;line-height:1.2;margin-bottom:12px">${step.q}</h2>
        <p style="font-size:13px;color:var(--ink-faint);margin-bottom:36px;font-weight:400;line-height:1.7">${step.hint}</p>
        ${step.render()}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
          <button id="ob-back" type="button" style="font-size:12px;letter-spacing:0.08em;color:var(--ink-faint);text-transform:uppercase;cursor:pointer;background:none;border:none;font-family:inherit;font-weight:400;padding:8px 0;transition:color 0.2s">
            ${isFirst ? 'Skip setup' : '← Back'}
          </button>
          <button id="ob-next" type="button" class="btn-ink" style="padding:13px 36px;font-size:11px">
            ${isLast ? 'Enter my paradise →' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach events safely after innerHTML is set
  document.getElementById('ob-back').addEventListener('click', function() {
    if (isFirst) finishOnboard();
    else prevOnboardStep();
  });
  document.getElementById('ob-next').addEventListener('click', function() {
    if (isLast) finishOnboard();
    else nextOnboardStep();
  });
}

function nextOnboardStep() {
  const step = ONBOARD_STEPS[state.onboardStep - 1];
  if (step.onNext) step.onNext();
  if (state.onboardStep < ONBOARD_STEPS.length) {
    state.onboardStep++;
    renderOnboardStep();
  } else {
    finishOnboard();
  }
}

function prevOnboardStep() {
  if (state.onboardStep > 1) {
    state.onboardStep--;
    renderOnboardStep();
  }
}

function finishOnboard() {
  // Capture city from step 1 input if still open
  const cityInp = document.getElementById('onboard-city');
  if (cityInp && cityInp.value.trim()) {
    state.city = cityInp.value.trim();
    state.searched = true;
  }

  // Mark as onboarded
  if (state.currentUser) state.currentUser.onboarded = true;

  if (state.useFirebase && window._fb && state.currentUser?.uid) {
    fbSaveUser({ ...state.currentUser, city: state.city }).catch(()=>{});
  } else {
    const users = JSON.parse(localStorage.getItem('np_users')||'[]');
    const idx = users.findIndex(u => u.email === state.currentUser?.email);
    if (idx > -1) { users[idx].onboarded = true; localStorage.setItem('np_users', JSON.stringify(users)); }
  }

  // Animate bar to 100% then remove overlay entirely and go home
  const bar = document.getElementById('ob-bar');
  if (bar) bar.style.width = '100%';
  setTimeout(() => {
    const overlay = document.getElementById('onboard-overlay');
    if (overlay) overlay.remove();
    goHome();
  }, 350);
}

function skipOnboard() { finishOnboard(); }

// Legacy stubs (safe to keep, no-ops)
function setOnboardCity(c) { const i=document.getElementById('onboard-city'); if(i) i.value=c; }
function renderOnboard() {}
function updateTimeDisplay(v) {}
function selectChoice(g,el) { document.querySelectorAll(`#${g} .choice-card`).forEach(c=>c.classList.remove('selected')); el.classList.add('selected'); }
function selectMulti(el) { el.classList.toggle('selected'); }

// ══════════════════════════════════════════
// HOME
// ══════════════════════════════════════════
function heroCityGo() {
  const v = document.getElementById('hero-city-input').value.trim();
  if (v) { state.city=v; state.searched=true; navigate('discover'); }
}
function quickCity(c) { state.city=c; state.searched=true; navigate('discover'); }

async function renderHome() {
  if (state.city) {
    const inp = document.getElementById('hero-city-input');
    if (inp) inp.value = state.city;
  }
  const grid = document.getElementById('featured-grid');
  grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--ink-faint);font-size:13px">Loading featured plants…</div>';
  try {
    const data = await fetchPlants('', '', 1);
    const plants = (data.data || []).slice(0, 4);
    grid.innerHTML = '';
    plants.forEach((p, i) => {
      const name = p.common_name || p.scientific_name?.[0] || 'Plant';
      const img  = p.default_image?.medium_url || p.default_image?.thumbnail || null;
      const div  = document.createElement('div');
      div.className = 'plant-card-home fade-up';
      div.style.animationDelay = (i * 0.09) + 's';
      div.onclick = () => navigate('discover');
      div.innerHTML = `
        <div class="phc-stripe"></div>
        <div class="phc-img-wrap">
          ${img
            ? `<img src="${img}" alt="${name}" loading="lazy"/>`
            : `<div class="phc-img-placeholder">🌿</div>`}
        </div>
        <div class="phc-body">
          <div class="phc-num">0${i+1}</div>
          <div class="phc-label">${p.cycle||'Plant'}</div>
          <div class="phc-latin">${(p.scientific_name?.[0]||'').slice(0,28)}</div>
          <div class="phc-name">${name}</div>
          <div class="phc-pills">
            <span class="phc-pill">💧 ${waterLabel(p.watering)}</span>
            <span class="phc-pill">☀️ ${sunLabel(p.sunlight)}</span>
          </div>
        </div>
      `;
      grid.appendChild(div);
    });
  } catch(e) {
    // Fallback to local plants if API fails
    grid.innerHTML = '';
    PLANTS.slice(0,4).forEach((p,i) => {
      const div = document.createElement('div');
      div.className='plant-card-home fade-up'; div.style.animationDelay=(i*0.09)+'s';
      div.onclick = () => navigate('discover');
      div.innerHTML = `
        <div class="phc-stripe"></div>
        <div class="phc-img-wrap">
          <div class="phc-img-placeholder">${p.emoji}</div>
        </div>
        <div class="phc-body">
          <div class="phc-num">0${i+1}</div>
          <div class="phc-label">${p.difficulty}</div>
          <div class="phc-latin">${p.name}</div>
          <div class="phc-name">${p.common}</div>
          <div class="phc-pills">
            <p style="font-size:11px;color:var(--ink-faint);line-height:1.7;margin:0">${p.note}</p>
          </div>
        </div>
      `;
      grid.appendChild(div);
    });
  }
}

// ══════════════════════════════════════════
// ══════════════════════════════════════════
// INDIA-CENTRIC PLANT DATABASE
// ══════════════════════════════════════════
// INDIA-CENTRIC PLANT DATABASE (78 plants, full detail)
// ══════════════════════════════════════════


let discoverState = { query:'', category:'', page:0, filtered:[], sort:'default', filters:{sun:[],water:[],soil:[],diff:[],cycle:[]} };
const PAGE_SIZE = 20;

function renderDiscover() {
  discoverState = { query:'', category:'', page:0, filtered:[], sort:'default', filters:{sun:[],water:[],soil:[],diff:[],cycle:[]} };
  document.getElementById('plant-search-input').value = '';
  document.querySelectorAll('.plant-chip').forEach((c,i)=>c.classList.toggle('active',i===0));
  const sel = document.getElementById('disc-sort-select');
  if (sel) {
    sel.value = 'default';
    // Inject/remove City Match sort option based on whether city is resolved
    const existingCityOpt = sel.querySelector('option[value="city"]');
    if (state.city && typeof resolveCityClimate === 'function' && resolveCityClimate(state.city)) {
      if (!existingCityOpt) {
        const opt = document.createElement('option');
        opt.value = 'city'; opt.textContent = 'City match';
        sel.insertBefore(opt, sel.firstChild);
      }
      sel.value = 'city';
      discoverState.sort = 'city';
    } else if (existingCityOpt) {
      existingCityOpt.remove();
    }
  }
  document.querySelectorAll('#disc-filter-panel input[type=checkbox]').forEach(cb=>cb.checked=false);
  const fp = document.getElementById('disc-filter-panel'); if(fp) fp.style.display='none';
  updateDiscFilterCount();
  runDiscover();
}

function searchPlants() {
  discoverState.query = document.getElementById('plant-search-input').value.trim().toLowerCase();
  discoverState.category = ''; discoverState.page = 0;
  document.querySelectorAll('.plant-chip').forEach(c=>c.classList.remove('active'));
  runDiscover();
}

function browseCategory(cat, el) {
  document.querySelectorAll('.plant-chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  discoverState.category = cat; discoverState.query = ''; discoverState.page = 0;
  document.getElementById('plant-search-input').value = '';
  runDiscover();
}

// ── Category panel toggle ──
function toggleCategoryPanel() {
  var panel = document.getElementById('category-chips');
  var btn = document.getElementById('disc-category-btn');
  var isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'flex';
  btn.classList.toggle('open', !isOpen);
}

// ── Sort ──
function setDiscSort(key) {
  discoverState.sort = key; discoverState.page = 0; runDiscover();
}

// ── Filter panel ──
function toggleDiscFilter() {
  const panel = document.getElementById('disc-filter-panel');
  const btn   = document.getElementById('disc-filter-toggle');
  const open  = panel.style.display === 'none' || panel.style.display === '';
  panel.style.display = open ? 'block' : 'none';
  btn.classList.toggle('active', open);
}

function applyDiscFilters() {
  const get = name => [...document.querySelectorAll(`#disc-filter-panel input[name="${name}"]:checked`)].map(cb=>cb.value);
  discoverState.filters = { sun:get('sun'), water:get('water'), soil:get('soil'), diff:get('diff'), cycle:get('cycle') };
  discoverState.page = 0;
  updateDiscFilterCount(); updateDiscActiveTags(); runDiscover();
}

function clearDiscFilters() {
  document.querySelectorAll('#disc-filter-panel input[type=checkbox]').forEach(cb=>cb.checked=false);
  discoverState.filters = {sun:[],water:[],soil:[],diff:[],cycle:[]};
  discoverState.page = 0;
  updateDiscFilterCount(); updateDiscActiveTags(); runDiscover();
}

function updateDiscFilterCount() {
  const total = Object.values(discoverState.filters).reduce((s,a)=>s+a.length,0);
  const badge = document.getElementById('disc-filter-count');
  const btn   = document.getElementById('disc-filter-toggle');
  if(!badge||!btn) return;
  if(total>0){ badge.textContent=total; badge.style.display='inline-flex'; btn.classList.add('active'); }
  else { badge.style.display='none'; if(!document.getElementById('disc-filter-panel')?.style.display.includes('block')) btn.classList.remove('active'); }
}

function updateDiscActiveTags() {
  const wrap = document.getElementById('disc-active-tags'); if(!wrap) return;
  const labels = {
    'full-sun':'Full sun','indirect':'Indirect','low-light':'Low light','shade':'Shade',
    'daily':'Daily water','weekly':'Weekly water','fortnightly':'Fortnightly','monthly':'Monthly/Rarely',
    'sandy':'Sandy soil','loamy':'Loamy','well-draining':'Well-draining','moisture':'Moisture-retaining',
    'Easy':'Easy','Moderate':'Moderate','Advanced':'Advanced',
    'Perennial':'Perennial','Annual':'Annual','Biennial':'Biennial'
  };
  const all = Object.entries(discoverState.filters).flatMap(([k,vals])=>vals.map(v=>({k,v,label:labels[v]||v})));
  wrap.innerHTML = all.map(f=>`<span class="disc-tag" onclick="removeDiscFilter('${f.k}','${f.v}')">${f.label} <span class="disc-tag-x">×</span></span>`).join('');
}

function removeDiscFilter(key, val) {
  const cb = document.querySelector(`#disc-filter-panel input[name="${key}"][value="${val}"]`);
  if(cb) cb.checked=false; applyDiscFilters();
}

// ── Match helpers ──
function _matchSun(p,vals){ if(!vals.length)return true; const s=(p.sun||'').toLowerCase(); return vals.some(v=>(v==='full-sun'&&s.includes('full'))||(v==='indirect'&&s.includes('indirect'))||(v==='low-light'&&(s.includes('low')||s.includes('shade')))||(v==='shade'&&s.includes('shade'))); }
function _matchWater(p,vals){ if(!vals.length)return true; const w=(p.water||'').toLowerCase(); return vals.some(v=>(v==='daily'&&(w.includes('daily')||w.includes('twice')))||(v==='weekly'&&(w.includes('week')||w.includes('every 1')))||(v==='fortnightly'&&(w.includes('2 week')||w.includes('every 2')||w.includes('fortnight')))||(v==='monthly'&&(w.includes('month')||w.includes('every 3')||w.includes('rarely')))); }
function _matchSoil(p,vals){ if(!vals.length)return true; const s=(p.soil||'').toLowerCase(); return vals.some(v=>(v==='sandy'&&(s.includes('sand')||s.includes('cactus')||s.includes('succulent')))||(v==='loamy'&&(s.includes('loam')||s.includes('fertile')||s.includes('rich')))||(v==='well-draining'&&s.includes('drain'))||(v==='moisture'&&(s.includes('moist')||s.includes('peat')))); }
function _matchDiff(p,vals){ return !vals.length||vals.includes(p.diff||'Easy'); }
function _matchCycle(p,vals){ return !vals.length||vals.some(v=>(p.cycle||'').toLowerCase().includes(v.toLowerCase())); }

// ── Sort ──
const DIFF_ORDER={'Easy':0,'Moderate':1,'Advanced':2};
function _waterScore(w){ const wl=(w||'').toLowerCase(); if(wl.includes('daily')||wl.includes('twice'))return 0; if(wl.includes('week'))return 1; if(wl.includes('2 week')||wl.includes('fortnight'))return 2; return 3; }
function _applySort(list,key){
  if(key==='az')return [...list].sort((a,b)=>a.common.localeCompare(b.common));
  if(key==='za')return [...list].sort((a,b)=>b.common.localeCompare(a.common));
  if(key==='easy')return [...list].sort((a,b)=>(DIFF_ORDER[a.diff]||0)-(DIFF_ORDER[b.diff]||0));
  if(key==='water-low')return [...list].sort((a,b)=>_waterScore(a.water)-_waterScore(b.water));
  return list;
}

function runDiscover() {
  // ── Resolve city climate ──────────────────────────────────────────────
  const cityEntry = (typeof resolveCityClimate === 'function') ? resolveCityClimate(state.city) : null;
  const cityZone  = cityEntry ? cityEntry.zone : null;

  // ── Render city climate banner ────────────────────────────────────────
  _renderCityBanner(cityEntry);

  let list = PLANT_DB;
  if(discoverState.category) list = list.filter(p=>p.cats.includes(discoverState.category));
  if(discoverState.query)    list = list.filter(p=>p.common.toLowerCase().includes(discoverState.query)||p.latin.toLowerCase().includes(discoverState.query));
  const f = discoverState.filters;
  list = list.filter(p=>_matchSun(p,f.sun)&&_matchWater(p,f.water)&&_matchSoil(p,f.soil)&&_matchDiff(p,f.diff)&&_matchCycle(p,f.cycle));

  // ── City suitability sort: Best → Good → Possible → Not recommended ──
  if (cityZone && (discoverState.sort === 'default' || discoverState.sort === 'city')) {
    list = [...list].sort((a,b) => {
      const sa = (typeof getPlantSuitability === 'function') ? getPlantSuitability(a, cityZone) : 2;
      const sb = (typeof getPlantSuitability === 'function') ? getPlantSuitability(b, cityZone) : 2;
      return sb - sa; // highest suitability first
    });
  } else {
    list = _applySort(list, discoverState.sort);
  }

  discoverState.filtered = list;

  // Update preview count in panel
  const prev = document.getElementById('dfp-preview'); if(prev) prev.textContent = `${list.length} plant${list.length!==1?'s':''} match`;

  const grid    = document.getElementById('discover-grid');
  const status  = document.getElementById('discover-status');
  const loadMore= document.getElementById('discover-load-more');
  const empty   = document.getElementById('discover-empty');
  document.getElementById('discover-loading').style.display = 'none';
  grid.innerHTML = ''; empty.style.display = 'none'; loadMore.style.display = 'none';

  if(!list.length){ empty.style.display='block'; status.style.display='none'; return; }

  const page = list.slice(0, PAGE_SIZE);
  page.forEach(p=>grid.appendChild(makePlantCard(p, cityZone)));

  const cityLabel   = cityEntry ? ` · 📍 ${cityEntry.label}` : '';
  const sortLabel   = (discoverState.sort!=='default' && discoverState.sort!=='city') ? ` · ${discoverState.sort.replace('-',' ')}` : '';
  const filterCount = Object.values(discoverState.filters).reduce((s,a)=>s+a.length,0);
  const filterLabel = filterCount ? ` · ${filterCount} filter${filterCount>1?'s':''}` : '';
  status.textContent = `Showing ${page.length} of ${list.length} plants${cityLabel}${sortLabel}${filterLabel}`;
  status.style.display = 'block';

  if(list.length>PAGE_SIZE) loadMore.style.display='block';
  discoverState.page = 1;
}

// ── City climate banner renderer ─────────────────────────────────────────────
// ── City→coordinates map for weather lookup ──────────────────────────────────
const CITY_COORDS = {
  'delhi':       [28.61, 77.20], 'new delhi':    [28.61, 77.20],
  'noida':       [28.54, 77.39], 'gurgaon':      [28.46, 77.03], 'gurugram': [28.46, 77.03],
  'agra':        [27.18, 78.01], 'lucknow':      [26.85, 80.95], 'kanpur':   [26.46, 80.33],
  'varanasi':    [25.32, 83.00], 'allahabad':    [25.43, 81.84], 'prayagraj':[25.43, 81.84],
  'jaipur':      [26.91, 75.79], 'jodhpur':      [26.29, 73.02], 'udaipur':  [24.58, 73.68],
  'jaisalmer':   [26.91, 70.90], 'bikaner':      [28.02, 73.31],
  'chandigarh':  [30.74, 76.78], 'ludhiana':     [30.91, 75.85], 'amritsar': [31.63, 74.87],
  'shimla':      [31.10, 77.17], 'manali':       [32.24, 77.18], 'dharamshala':[32.22, 76.32],
  'dehradun':    [30.32, 78.03], 'haridwar':     [29.95, 78.16], 'mussoorie':[30.45, 78.10],
  'nainital':    [29.38, 79.46], 'rishikesh':    [30.09, 78.27],
  'mumbai':      [19.07, 72.87], 'pune':         [18.52, 73.86], 'nashik':   [19.99, 73.79],
  'nagpur':      [21.15, 79.09], 'aurangabad':   [19.88, 75.34],
  'ahmedabad':   [23.02, 72.57], 'surat':        [21.17, 72.83], 'vadodara': [22.31, 73.18],
  'rajkot':      [22.30, 70.80], 'bhuj':         [23.25, 69.67],
  'panaji':      [15.50, 73.83], 'goa':          [15.50, 73.83],
  'kolkata':     [22.57, 88.36], 'howrah':       [22.58, 88.31],
  'bhubaneswar': [20.30, 85.85], 'patna':        [25.59, 85.14], 'ranchi':   [23.35, 85.33],
  'guwahati':    [26.14, 91.74], 'shillong':     [25.57, 91.88],
  'bhopal':      [23.26, 77.41], 'indore':       [22.72, 75.86], 'gwalior':  [26.22, 78.18],
  'raipur':      [21.25, 81.63],
  'bengaluru':   [12.97, 77.59], 'bangalore':    [12.97, 77.59],
  'mysuru':      [12.30, 76.64], 'mangaluru':    [12.87, 74.88],
  'hyderabad':   [17.38, 78.49], 'secunderabad': [17.44, 78.50],
  'visakhapatnam':[17.69,83.22], 'vizag':        [17.69, 83.22], 'vijayawada':[16.51,80.62],
  'chennai':     [13.08, 80.27], 'coimbatore':   [11.00, 76.96], 'madurai':  [9.93, 78.12],
  'tirunelveli': [8.73,  77.70], 'salem':        [11.66, 78.15],
  'thiruvananthapuram':[8.52,76.94],'trivandrum':[8.52,76.94],
  'kochi':       [9.93,  76.26], 'cochin':       [9.93,  76.26],
  'kozhikode':   [11.25, 75.78], 'calicut':      [11.25, 75.78],
  'thrissur':    [10.52, 76.21], 'kollam':       [8.88,  76.60],
  'pondicherry': [11.93, 79.83], 'puducherry':   [11.93, 79.83],
  'ooty':        [11.41, 76.70], 'kodaikanal':   [10.23, 77.49],
  'kolhapur':    [16.70, 74.23], 'durgapur':     [23.55, 87.32],
  'jamshedpur':  [22.80, 86.18], 'dhanbad':      [23.79, 86.43],
};

function _getCityCoords(cityStr) {
  if (!cityStr) return null;
  const q = cityStr.trim().toLowerCase();
  for (const [key, coords] of Object.entries(CITY_COORDS)) {
    if (q.includes(key) || key.includes(q)) return coords;
  }
  return null;
}

const WMO_CODES = {
  0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',
  45:'Foggy',48:'Icy fog',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',
  61:'Light rain',63:'Rain',65:'Heavy rain',80:'Showers',81:'Heavy showers',
  71:'Light snow',73:'Snow',75:'Heavy snow',
  95:'Thunderstorm',96:'Thunderstorm + hail',99:'Severe thunderstorm'
};
const WMO_ICONS = {
  0:'☀️',1:'🌤️',2:'⛅',3:'☁️',45:'🌫️',48:'🌫️',
  51:'🌦️',53:'🌧️',55:'🌧️',61:'🌦️',63:'🌧️',65:'🌧️',
  80:'🌦️',81:'🌧️',71:'🌨️',73:'❄️',75:'❄️',
  95:'⛈️',96:'⛈️',99:'⛈️'
};

async function _fetchWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&wind_speed_unit=kmh&timezone=auto`;
    const res = await fetch(url);
    const data = await res.json();
    const c = data.current;
    return {
      temp: Math.round(c.temperature_2m),
      humidity: c.relative_humidity_2m,
      code: c.weather_code,
      wind: Math.round(c.wind_speed_10m),
      icon: WMO_ICONS[c.weather_code] || '🌡️',
      desc: WMO_CODES[c.weather_code] || 'Unknown'
    };
  } catch(e) { return null; }
}

// ── City climate banner renderer ─────────────────────────────────────────────
function _renderCityBanner(cityEntry) {
  const banner = document.getElementById('city-climate-banner');
  if (!banner) return;
  if (!cityEntry) { banner.style.display = 'none'; return; }
  const zoneIcons = { tropical:'🌴', subtropical:'🌤️', semiarid:'☀️', arid:'🏜️', highland:'🏔️', humid_subtropical:'🌧️' };
  const zoneNames = { tropical:'Tropical', subtropical:'Subtropical', semiarid:'Semi-arid', arid:'Arid / Desert', highland:'Highland / Hills', humid_subtropical:'Humid Subtropical' };
  const icon = zoneIcons[cityEntry.zone] || '📍';
  const zoneName = zoneNames[cityEntry.zone] || cityEntry.zone;
  banner.className = `climate-banner climate-${cityEntry.zone}`;
  banner.innerHTML = `
    <div class="climate-left">
      <div class="climate-icon">${icon}</div>
      <div class="climate-title-block">
        <div class="climate-city">${cityEntry.label}</div>
        <div class="climate-zone">${zoneName}</div>
        <div class="climate-meta">${cityEntry.temp} · ${cityEntry.rain} · ${cityEntry.season}</div>
      </div>
    </div>
    <div class="climate-legend">
      <span class="legend-dot best"></span><span class="legend-label">Best now</span>
      <span class="legend-dot good"></span><span class="legend-label">Great fit</span>
      <span class="legend-dot care"></span><span class="legend-label">Grow with care</span>
    </div>
    <div class="climate-weather" id="city-weather-widget">
      <div class="climate-weather-skel">
        <div class="cw-skel-temp"></div>
        <div class="cw-skel-lines">
          <span class="cw-line"></span>
          <span class="cw-line short"></span>
        </div>
      </div>
    </div>
  `;
  banner.style.display = 'grid';

  const coords = _getCityCoords(state.city);
  if (coords) {
    _fetchWeather(coords[0], coords[1]).then(w => {
      const widget = document.getElementById('city-weather-widget');
      if (!widget) return;
      if (!w) { widget.style.display = 'none'; return; }
      widget.innerHTML = `
        <div class="cw-main">
          <div class="cw-temp">${w.temp}<span>°C</span></div>
          <div class="cw-desc">${w.icon} ${w.desc}</div>
        </div>
        <div class="cw-stats">
          <div class="cw-stat"><span>Humidity</span><strong>${w.humidity}%</strong></div>
          <div class="cw-stat"><span>Wind</span><strong>${w.wind} km/h</strong></div>
        </div>
      `;
    });
  } else {
    const widget = document.getElementById('city-weather-widget');
    if (widget) widget.style.display = 'none';
  }
}

function loadMorePlants() {
  const cityEntry = (typeof resolveCityClimate === 'function') ? resolveCityClimate(state.city) : null;
  const cityZone  = cityEntry ? cityEntry.zone : null;
  const start = discoverState.page * PAGE_SIZE;
  const more  = discoverState.filtered.slice(start, start + PAGE_SIZE);
  const grid  = document.getElementById('discover-grid');
  more.forEach(p => grid.appendChild(makePlantCard(p, cityZone)));
  discoverState.page++;
  const shown = grid.querySelectorAll('.plant-api-card').length;
  document.getElementById('discover-status').textContent = `Showing ${shown} of ${discoverState.filtered.length} plants`;
  if (shown >= discoverState.filtered.length)
    document.getElementById('discover-load-more').style.display = 'none';
}

function makePlantCard(p, cityZone) {
  const inGarden = state.garden.some(g => g.id === p.id);
  // Suitability badge
  let suitBadge = '';
  if (cityZone && typeof getPlantSuitability === 'function') {
    const score = getPlantSuitability(p, cityZone);
    const sClass = (typeof SUITABILITY_CLASS !== 'undefined') ? SUITABILITY_CLASS[score] : '';
    const sLabel = (typeof SUITABILITY_LABEL !== 'undefined') ? SUITABILITY_LABEL[score] : '';
    if (sLabel) suitBadge = `<div class="suit-badge ${sClass}">${sLabel}</div>`;
  }
  const div = document.createElement('div');
  div.className = 'plant-api-card fade-up';
  const diffCls = {Easy:'diff-easy',Moderate:'diff-moderate',Advanced:'diff-advanced'}[p.diff] || 'diff-easy';
  div.innerHTML = `
    <img class="plant-api-img" src="${p.img}" alt="${p.common}" loading="lazy"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
    <div class="plant-api-img-placeholder" style="display:none">🌿</div>
    <div class="plant-api-body">
      ${suitBadge}
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;margin-bottom:2px">
        <div class="plant-api-common">${p.common}</div>
        <span class="plant-api-diff ${diffCls}">${p.diff||'Easy'}</span>
      </div>
      <div class="plant-api-latin">${p.latin}</div>
      <div class="plant-api-stats">
        <div class="plant-api-stat"><span class="plant-api-stat-icon">💧</span>${p.water}</div>
        <div class="plant-api-stat"><span class="plant-api-stat-icon">☀️</span>${p.sun}</div>
        <div class="plant-api-stat"><span class="plant-api-stat-icon">🌱</span>${p.diff||'Easy'}</div>
        <div class="plant-api-stat"><span class="plant-api-stat-icon">🔄</span>${p.cycle}</div>
      </div>
      <div class="plant-api-actions">
        <button class="btn-ink" type="button" onclick="openPlantDetail(${p.id})">View guide</button>
        <button class="plant-api-add ${inGarden?'in-garden':''}" type="button"
          id="dbg-btn-${p.id}" onclick="toggleDbGarden(${p.id})"
          title="${inGarden?'In your garden':'Add to garden'}">${inGarden?'✓':'+'}</button>
      </div>
    </div>`;
  return div;
}

function toggleDbGarden(id) {
  const p = PLANT_DB.find(x => x.id === id);
  if (!p) return;
  const idx = state.garden.findIndex(g => g.id === id);
  if (idx === -1) {
    const added = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long'});
    state.garden.push({
      id: p.id, common: p.common, name: p.latin,
      emoji: '🌿', water: p.water, sun: p.sun, temp: '18–35°C',
      img: p.img, logs: [], added, diff: p.diff,
      guide: {
        soil: 'Well-draining potting mix', sunlight: p.sun,
        water: p.water, temp: '18–35°C',
        season: 'Year-round in India', timeline: 'See plant guide',
        tips: p.tips || []
      }
    });
    showToast(`${p.common} added to your garden 🌱`);
  } else {
    state.garden.splice(idx, 1);
    showToast(`${p.common} removed from garden`);
  }
  persistGarden();
  const btn = document.getElementById(`dbg-btn-${id}`);
  if (btn) {
    const nowIn = state.garden.some(g => g.id === id);
    btn.textContent = nowIn ? '✓' : '+';
    btn.classList.toggle('in-garden', nowIn);
  }
}

function openPlantDetail(id) {
  const p = PLANT_DB.find(x => x.id === id);
  if (!p) return;
  state.detailPlant = {
    id: p.id, common: p.common, name: p.latin,
    emoji: '🌿', img: p.img,
    water: p.water, sun: p.sun, temp: '18–35°C',
    tags: p.cats.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
    // Full rich data passed through
    height: p.height,
    ph: p.ph,
    fertilizer: p.fertilizer,
    propagation: p.propagation,
    pests: p.pests,
    companion: p.companion,
    season: p.season,
    guide: {
      soil: p.soil || 'Well-draining potting mix',
      sunlight: p.sun,
      water: p.water,
      temp: p.height ? `Height: ${p.height}` : '18–35°C',
      season: p.season ? `Best: ${p.season.best} | Sow: ${p.season.sow} | Harvest: ${p.season.harvest}` : 'Year-round',
      timeline: `${p.cycle} | pH: ${p.ph || '6.0–7.0'}`,
      tips: [
        ...(p.tips || []),
        p.fertilizer ? `Fertilizer: ${p.fertilizer}` : '',
        p.propagation ? `Propagation: ${p.propagation}` : '',
        p.pests ? `Watch for: ${p.pests}` : '',
        p.companion?.length ? `Companion plants: ${p.companion.join(', ')}` : ''
      ].filter(Boolean)
    }
  };
  navigate('detail');
}

// Keep old toggleGarden for home page local PLANTS
function toggleGarden(id) {
  const plant = PLANTS.find(p => p.id === id);
  if (!plant) return;
  const idx = state.garden.findIndex(g => g.id === id);
  if (idx === -1) {
    const added = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long'});
    state.garden.push({...plant, logs:[], added});
    showToast(`${plant.common} added to your garden 🌱`);
  } else {
    state.garden.splice(idx,1);
    showToast(`${plant.common} removed from garden`);
  }
  persistGarden();
  document.querySelectorAll('[id^="garden-btn-"]').forEach(btn => {
    const bid = parseInt(btn.id.replace('garden-btn-',''));
    const ing = state.garden.some(g => g.id === bid);
    btn.textContent = ing?'✓':'+'; btn.classList.toggle('in-garden', ing);
  });
}
function viewDetail(id) { state.detailPlant = PLANTS.find(p=>p.id===id); navigate('detail'); }
function discoverSearch() { searchPlants(); }
function getPlantsForCity() { return PLANTS; }
function viewApiDetail(id) { openPlantDetail(id); }
function toggleApiGarden(id) { toggleDbGarden(id); }


// Keep old local-plant functions working for the home page featured grid
function toggleGarden(id) {
  const plant = PLANTS.find(p=>p.id===id);
  if(!plant) return;
  const idx = state.garden.findIndex(g=>g.id===id);
  if(idx===-1) {
    const added = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long'});
    state.garden.push({...plant, logs:[], added});
    showToast(`${plant.common} added to your garden 🌱`);
  } else {
    state.garden.splice(idx,1);
    showToast(`${plant.common} removed from garden`);
  }
  persistGarden();
  document.querySelectorAll('[id^="garden-btn-"]').forEach(btn => {
    const bid = parseInt(btn.id.replace('garden-btn-',''));
    const ing = state.garden.some(g=>g.id===bid);
    btn.textContent=ing?'✓':'+'; btn.classList.toggle('in-garden',ing);
  });
}

function viewDetail(id) {
  state.detailPlant = PLANTS.find(p=>p.id===id);
  navigate('detail');
}

function discoverSearch() { searchPlants(); }
function getPlantsForCity() { return PLANTS; }

// ══════════════════════════════════════════
// DETAIL
// ══════════════════════════════════════════
function renderDetail() {
  const p = state.detailPlant; if(!p) return;
  document.getElementById('detail-latin-top').textContent = p.name;

  // Show photo if available (API plant), else show emoji
  const emojiEl = document.getElementById('detail-emoji');
  const imgContainerId = 'detail-img-container';
  let imgContainer = document.getElementById(imgContainerId);

  if (p.img) {
    emojiEl.style.display = 'none';
    if (!imgContainer) {
      imgContainer = document.createElement('div');
      imgContainer.id = imgContainerId;
      imgContainer.style.cssText = 'position:relative;z-index:1;margin-bottom:20px;width:100%;max-width:280px;';
      emojiEl.parentNode.insertBefore(imgContainer, emojiEl);
    }
    imgContainer.innerHTML = `<img src="${p.img}" alt="${p.common}" style="width:100%;height:220px;object-fit:cover;border-radius:2px;display:block;" onerror="this.parentNode.innerHTML='<div style=&quot;font-size:72px;text-align:center&quot;>${p.emoji}</div>'"/>`;
    imgContainer.style.display = 'block';
  } else {
    emojiEl.style.display = 'block';
    emojiEl.textContent = p.emoji;
    if (imgContainer) imgContainer.style.display = 'none';
  }

  document.getElementById('detail-latin').textContent = p.name;
  document.getElementById('detail-name').textContent = p.common;
  document.getElementById('detail-tags').innerHTML = (p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('');

  const fields=[['Soil',p.guide.soil],['Sunlight',p.guide.sunlight],['Water',p.guide.water],['Temperature',p.guide.temp],['Best Season',p.guide.season],['Timeline',p.guide.timeline]];
  document.getElementById('guide-grid').innerHTML = fields.map(([l,v])=>`
    <div class="guide-item"><div class="guide-label">${l}</div><p class="guide-value">${v||'—'}</p></div>
  `).join('');
  document.getElementById('tips-section').innerHTML=`
    <div class="tips-label">Notes & Tips</div>
    ${(p.guide.tips||[]).map(t=>`<div class="tip-row"><span class="tip-dash">—</span>${t}</div>`).join('')}
  `;

  // Only show products section for local PLANTS (not API plants)
  const prods = p.products ? (p.products||[]).map(id=>({id,...PRODUCTS[id]})).filter(x=>x.name) : [];
  const ps=document.getElementById('detail-products');
  if(prods.length){
    ps.style.display='';
    ps.innerHTML=`
      <div class="eyebrow" style="margin-bottom:44px"><div class="eyebrow-line"></div><span class="eyebrow-text">What you'll need</span></div>
      <div class="products-grid">
        ${prods.map(pr=>{const inCart=state.cart.some(c=>c.id===pr.id);return`
          <div class="product-card">
            <div class="product-cat">${pr.cat}</div>
            <div class="product-sym">${pr.sym}</div>
            <div class="product-name">${pr.name}</div>
            <div class="product-price">₹${pr.price}</div>
            <button class="btn-add-cart ${inCart?'in-cart':''}" id="detail-cart-${pr.id}" onclick="addToCart('${pr.id}')">${inCart?'In cart ✓':'Add to cart'}</button>
          </div>
        `;}).join('')}
      </div>
    `;
  } else ps.style.display='none';
}

// ══════════════════════════════════════════
// CART
// ══════════════════════════════════════════
function getLiveProducts() {
  try {
    const s = localStorage.getItem('np_admin_products');
    if (s) {
      const arr = JSON.parse(s);
      if (arr && arr.length) {
        const obj = {};
        arr.forEach(p => { obj[p.id] = p; });
        return obj;
      }
    }
  } catch(e){}
  return PRODUCTS;
}

function addToCart(id) {
  const lp = getLiveProducts();
  if(!state.cart.find(c=>c.id===id)) {
    const prod = lp[id] || PRODUCTS[id];
    if (!prod) return;
    state.cart.push({id,...prod});
    updateCartBadge();
    showToast(`${prod.name} added to cart`);
    if (state.useFirebase && window._fb && state.currentUser?.uid) fbSaveCart().catch(()=>{});
  }
  document.querySelectorAll(`[id$="-cart-${id}"]`).forEach(btn=>{
    btn.textContent='\u2713 Added';
    btn.classList.add('in-cart');
  });
}

function updateCartBadge() {
  const count = state.cart.length;
  const b = document.getElementById('cart-badge');
  const bd = document.getElementById('cart-badge-drawer');
  [b, bd].forEach(el => {
    if (!el) return;
    el.textContent = count;
    el.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

function removeFromCart(id) {
  state.cart=state.cart.filter(c=>c.id!==id);
  updateCartBadge();
  if (state.useFirebase && window._fb && state.currentUser?.uid) fbSaveCart().catch(()=>{});
  renderCart();
}

function renderCart() {
  const items=document.getElementById('cart-items');
  if(!state.cart.length){
    items.style.padding='48px 80px';
    items.innerHTML='<p class="cart-empty">Nothing here yet. Head to the Shop to discover supplies.</p>';
  } else {
    items.style.padding='48px 80px';
    items.innerHTML=state.cart.map(item=>`
      <div class="cart-item">
        <div class="cart-item-left">
          <div class="cart-sym">${item.sym}</div>
          <div><div class="cart-item-cat">${item.cat}</div><div class="cart-item-name">${item.name}</div></div>
        </div>
        <div class="cart-item-right">
          <div class="cart-item-price">₹${item.price}</div>
          <button class="btn-remove-cart" onclick="removeFromCart('${item.id}')">×</button>
        </div>
      </div>
    `).join('');
  }
  const sub=state.cart.reduce((s,i)=>s+i.price,0);
  const ship=sub>500?0:49;
  document.getElementById('summary-subtotal').textContent='₹'+sub;
  document.getElementById('summary-shipping').textContent=sub>500?'Free':'₹49';
  document.getElementById('summary-total').textContent='₹'+(sub+ship);
}

// ══════════════════════════════════════════
// SHOP
// ══════════════════════════════════════════
function renderShop() {
  // Load live products saved by admin, fallback to hardcoded PRODUCTS
  const liveProducts = (() => {
    try {
      const s = localStorage.getItem('np_admin_products');
      if (s) {
        const arr = JSON.parse(s);
        if (arr && arr.length) {
          const obj = {};
          arr.forEach(p => { obj[p.id] = p; });
          return obj;
        }
      }
    } catch(e){}
    return PRODUCTS;
  })();

  const cats = ['All', ...new Set(Object.values(liveProducts).map(p => p.cat))];
  document.getElementById('cat-filters').innerHTML = cats.map(c =>
    `<button class="cat-btn ${state.shopCat===c?'active':''}" onclick="setShopCat('${c}')">${c}</button>`
  ).join('');
  const sortSel = document.getElementById('shop-sort-select');
  if (sortSel && sortSel.value !== state.shopSort) sortSel.value = state.shopSort;

  let items = Object.entries(liveProducts)
    .filter(([_,p]) => state.shopCat==='All' || p.cat===state.shopCat)
    .map(([id,p]) => ({id,...p}));

  if (state.shopSort === 'price-low')  items = [...items].sort((a,b) => a.price - b.price);
  if (state.shopSort === 'price-high') items = [...items].sort((a,b) => b.price - a.price);
  if (state.shopSort === 'az')         items = [...items].sort((a,b) => a.name.localeCompare(b.name));

  document.getElementById('shop-grid').innerHTML = items.map((p, i) => {
    const inCart = state.cart.some(c => c.id === p.id);
    const photoHtml = p.img
      ? `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;display:block" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><span class="shop-sym" style="display:none">${p.sym||'🌱'}</span>`
      : `<span class="shop-sym">${p.sym||'🌱'}</span>`;
    return `<div class="shop-card fade-up" style="animation-delay:${i*0.04}s" data-price="\u20b9${p.price}">
      <div class="shop-photo">${photoHtml}</div>
      <div class="shop-card-body">
        <div class="shop-card-cat">${p.cat}</div>
        <div class="shop-card-name">${p.name}</div>
        <div class="shop-card-footer">
          <div class="shop-card-price">\u20b9${p.price}</div>
          <button class="shop-card-btn ${inCart?'in-cart':''}" id="shop-cart-btn-${p.id}" onclick="addToCartShop('${p.id}')">
            ${inCart ? '\u2713 Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}
function setShopCat(c) { state.shopCat = c; renderShop(); }
function setShopSort(k) { state.shopSort = k; renderShop(); }
function addToCartShop(id) { addToCart(id); renderShop(); }


// ══════════════════════════════════════════
// ROUTER
// ══════════════════════════════════════════
function renderPage(page) {
  if(page==='home') renderHome();
  else if(page==='discover') renderDiscover();
  else if(page==='detail') renderDetail();
  else if(page==='shop') renderShop();
  else if(page==='dashboard') renderDashboard();
  else if(page==='cart') renderCart();
}

// ══════════════════════════════════════════
// PAYMENT SYSTEM
// ══════════════════════════════════════════
let _payTab = 'upi';
let _payDelivery = {};

function openPayment() {
  if (!state.cart.length) { showToast('Your cart is empty'); return; }
  const sub  = state.cart.reduce((s,i) => s + i.price, 0);
  const ship = sub > 500 ? 0 : 49;
  const total = sub + ship;
  // Set amounts in both steps
  const amtEl1 = document.getElementById('pay-amount-display-1');
  const amtEl2 = document.getElementById('pay-amount-display');
  const codEl  = document.getElementById('cod-amount');
  if (amtEl1) amtEl1.textContent = '₹' + total;
  if (amtEl2) amtEl2.textContent = '₹' + total;
  if (codEl)  codEl.textContent = '₹' + total;
  const lblEl = document.getElementById('pay-btn-label');
  if (lblEl) lblEl.textContent = 'Pay ₹' + total;
  // Pre-fill city if user has one set
  const delCityEl = document.getElementById('del-city');
  if (delCityEl && state.city && !delCityEl.value) delCityEl.value = state.city;
  // Pre-fill name
  const delNameEl = document.getElementById('del-name');
  if (delNameEl && state.currentUser?.firstName && !delNameEl.value)
    delNameEl.value = (state.currentUser.firstName + ' ' + (state.currentUser.lastName||'')).trim();
  // Show step 1
  _showPayStep(1);
  document.getElementById('payment-overlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  switchPayTab('upi');
}

function _showPayStep(n) {
  document.getElementById('pay-step-1').style.display = n === 1 ? 'block' : 'none';
  document.getElementById('pay-step-2').style.display = n === 2 ? 'block' : 'none';
  document.querySelectorAll('.pay-step').forEach((el,i) => el.classList.toggle('active', i/2 + 1 === n));
}

function proceedToPayment() {
  // Validate delivery details
  const name  = document.getElementById('del-name').value.trim();
  const phone = document.getElementById('del-phone').value.trim();
  const addr1 = document.getElementById('del-addr1').value.trim();
  const city  = document.getElementById('del-city').value.trim();
  const state_ = document.getElementById('del-state').value;
  const pin   = document.getElementById('del-pin').value.trim();
  if (!name)              { showToast('Enter your full name'); return; }
  if (!/^[6-9]\d{9}$/.test(phone)) { showToast('Enter a valid 10-digit phone number'); return; }
  if (!addr1)             { showToast('Enter your address'); return; }
  if (!city)              { showToast('Enter your city'); return; }
  if (!state_)            { showToast('Select your state'); return; }
  if (!/^\d{6}$/.test(pin)) { showToast('Enter a valid 6-digit PIN code'); return; }
  _payDelivery = {
    name, phone, addr1,
    addr2: document.getElementById('del-addr2').value.trim(),
    city, state: state_, pin,
    note: document.getElementById('del-note').value.trim()
  };
  _showPayStep(2);
}

function closePayment() {
  document.getElementById('payment-overlay').style.display = 'none';
  document.body.style.overflow = '';
}

function switchPayTab(tab) {
  _payTab = tab;
  ['upi','card','nb','cod'].forEach(t => {
    const tabEl = document.getElementById('tab-' + t);
    const panEl = document.getElementById('panel-' + t);
    if (tabEl) tabEl.classList.toggle('active', t === tab);
    if (panEl) panEl.style.display = t === tab ? 'block' : 'none';
  });
  const sub  = state.cart.reduce((s,i) => s + i.price, 0);
  const ship = sub > 500 ? 0 : 49;
  const total = sub + ship;
  const lblEl = document.getElementById('pay-btn-label');
  if (lblEl) lblEl.textContent = tab === 'cod' ? 'Place order' : 'Pay ₹' + total;
}

function fillUpiApp(app) {
  const user = state.currentUser?.firstName?.toLowerCase() || 'user';
  const ids = { gpay: user + '@okaxis', phonepe: user + '@ybl', paytm: user + '@paytm' };
  const inp = document.getElementById('pay-upi-id');
  if (inp) { inp.value = ids[app] || ''; inp.focus(); }
}

function fmtCard(inp) {
  let v = inp.value.replace(/\D/g,'').slice(0,16);
  inp.value = v.replace(/(\d{4})(?=\d)/g,'$1 ').trim();
}

function fmtExp(inp) {
  let v = inp.value.replace(/\D/g,'').slice(0,4);
  if (v.length >= 3) v = v.slice(0,2) + ' / ' + v.slice(2);
  inp.value = v;
}

async function submitPayment() {
  const btn = document.getElementById('pay-submit-btn');
  const lbl = document.getElementById('pay-btn-label');

  // Validate payment method
  if (_payTab === 'upi') {
    const upi = document.getElementById('pay-upi-id').value.trim();
    if (!upi || !upi.includes('@')) { showToast('Enter a valid UPI ID'); return; }
  } else if (_payTab === 'card') {
    const num = document.getElementById('pay-card-num').value.replace(/\s/g,'');
    const exp = document.getElementById('pay-card-exp').value;
    const cvv = document.getElementById('pay-card-cvv').value;
    const name = document.getElementById('pay-card-name').value.trim();
    if (num.length < 16) { showToast('Enter a valid card number'); return; }
    if (!exp || exp.length < 4) { showToast('Enter a valid expiry'); return; }
    if (!cvv || cvv.length < 3) { showToast('Enter CVV'); return; }
    if (!name) { showToast('Enter name on card'); return; }
  } else if (_payTab === 'nb') {
    if (!document.getElementById('pay-nb-bank').value) { showToast('Select your bank'); return; }
  }

  btn.disabled = true;
  lbl.textContent = 'Processing…';
  btn.style.opacity = '0.7';

  // Build order record
  const sub   = state.cart.reduce((s,i) => s + i.price, 0);
  const ship  = sub > 500 ? 0 : 49;
  const total = sub + ship;
  const orderId = 'NP' + Date.now().toString(36).toUpperCase();
  const orderData = {
    orderId,
    userId:    state.currentUser?.uid  || 'guest',
    userName:  state.currentUser?.firstName || '',
    userEmail: state.currentUser?.email || '',
    delivery:  _payDelivery,
    items:     state.cart.map(i => ({ id: i.id, name: i.name, price: i.price, sym: i.sym })),
    subtotal:  sub,
    shipping:  ship,
    total,
    payMethod: _payTab,
    status:    'confirmed',
    placedAt:  new Date().toISOString()
  };

  // Save to Firestore orders collection
  try {
    if (state.useFirebase && window._fb && window._fb.db) {
      const { db, collection, addDoc, serverTimestamp } = window._fb;
      await addDoc(collection(db, 'orders'), { ...orderData, createdAt: serverTimestamp() });
    }
  } catch(e) { console.warn('Order save error:', e); }

  setTimeout(() => {
    closePayment();
    btn.disabled = false; btn.style.opacity = '';
    state.cart = [];
    updateCartBadge();
    renderCart();
    if (state.useFirebase && window._fb && state.currentUser?.uid) fbSaveCart().catch(()=>{});
    document.getElementById('pay-order-id').textContent = orderId;
    document.getElementById('pay-success-overlay').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }, 2000);
}

function closePaySuccess() {
  document.getElementById('pay-success-overlay').style.display = 'none';
  document.body.style.overflow = '';
  navigate('home');
}

document.addEventListener('click', e => {
  const overlay = document.getElementById('payment-overlay');
  if (e.target === overlay) closePayment();
  const successOverlay = document.getElementById('pay-success-overlay');
  if (e.target === successOverlay) closePaySuccess();
});
