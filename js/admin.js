// ═══════════════════════════════════════════
// Nurture Paradise — Admin Panel
// js/admin.js
// ═══════════════════════════════════════════

// ── State ──
let adminState = {
  user: null,
  view: 'dashboard',
  products: [],
  users: [],
  orders: [],
  diagnoses: [],
  gardens: [],
  analytics: {},
};

// ── Default product catalogue (can be overridden from Firestore) ──
const DEFAULT_PRODUCTS = [
  {id:'organic-compost',name:'Organic Compost',cat:'Soil',sym:'🌱',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:299,stock:50,desc:'Rich organic compost for healthy plant growth'},
  {id:'12-inch-pot',name:'12" Terracotta Pot',cat:'Planters',sym:'🪴',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:199,stock:30,desc:'Classic terracotta pot ideal for most plants'},
  {id:'8-inch-pot',name:'8" Ceramic Pot',cat:'Planters',sym:'🏺',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:149,stock:45,desc:'Glazed ceramic pot with drainage hole'},
  {id:'10-inch-pot',name:'10" Grow Bag',cat:'Planters',sym:'🛍️',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:79,stock:100,desc:'UV-resistant fabric grow bag — great for balconies'},
  {id:'14-inch-pot',name:'14" Planter Box',cat:'Planters',sym:'📦',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:349,stock:20,desc:'Large rectangular planter for vegetables'},
  {id:'terracotta-pot',name:'Terracotta Pot Set (3)',cat:'Planters',sym:'🪴',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:249,stock:35,desc:'Set of 3 small terracotta pots for succulents'},
  {id:'watering-can',name:'Brass Watering Can',cat:'Tools',sym:'🚿',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:449,stock:15,desc:'Vintage brass watering can with long spout'},
  {id:'misting-bottle',name:'Misting Spray Bottle',cat:'Tools',sym:'💧',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:129,stock:60,desc:'Fine mist sprayer for tropical and indoor plants'},
  {id:'pruning-shears',name:'Stainless Pruning Shears',cat:'Tools',sym:'✂️',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:299,stock:25,desc:'Precision pruning shears with safety lock'},
  {id:'bamboo-stakes',name:'Bamboo Stakes (10 pack)',cat:'Tools',sym:'🎋',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:89,stock:80,desc:'Natural bamboo plant stakes for support'},
  {id:'trowel-set',name:'Trowel & Fork Set',cat:'Tools',sym:'🔧',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:199,stock:40,desc:'Stainless steel trowel and fork set'},
  {id:'liquid-fertilizer',name:'Liquid NPK Fertilizer',cat:'Fertilisers',sym:'🧪',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:179,stock:55,desc:'Balanced 10-10-10 liquid fertilizer for all plants'},
  {id:'neem-spray',name:'Neem Oil Spray (500ml)',cat:'Care',sym:'🌿',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:149,stock:70,desc:'Cold-pressed neem oil spray for organic pest control'},
  {id:'vermicompost',name:'Vermicompost (5kg)',cat:'Soil',sym:'🪱',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:199,stock:40,desc:'Premium worm castings for organic gardening'},
  {id:'cactus-mix',name:'Cactus & Succulent Mix',cat:'Soil',sym:'🌵',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:149,stock:35,desc:'Specially formulated fast-draining mix'},
  {id:'perlite',name:'Perlite (2kg)',cat:'Soil',sym:'⚪',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:129,stock:45,desc:'Improves drainage and aeration in potting mix'},
  {id:'peat-mix',name:'Peat Potting Mix (5kg)',cat:'Soil',sym:'🟫',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:159,stock:30,desc:'Acidic peat mix for ferns and tropical plants'},
  {id:'succulent-fertilizer',name:'Succulent Fertilizer',cat:'Fertilisers',sym:'💊',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:149,stock:50,desc:'Low nitrogen formula for cacti and succulents'},
  {id:'tomato-fertilizer',name:'Tomato & Vegetable Feed',cat:'Fertilisers',sym:'🍅',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:169,stock:40,desc:'High potassium feed for fruiting vegetables'},
  {id:'drainage-tray',name:'Drainage Saucer Set (5)',cat:'Planters',sym:'🫙',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:99,stock:60,desc:'Set of 5 plastic drainage saucers various sizes'},
  {id:'garden-gloves',name:'Garden Gloves (L)',cat:'Tools',sym:'🧤',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:99,stock:50,desc:'Breathable cotton gloves with rubber grip'},
  {id:'plant-labels',name:'Wooden Plant Labels (20)',cat:'Accessories',sym:'🏷️',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:79,stock:100,desc:'Biodegradable wooden plant marker sticks'},
  {id:'moss-pole',name:'Coco Coir Moss Pole 60cm',cat:'Accessories',sym:'🪵',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',price:149,stock:25,desc:'Coco coir pole for climbing plants like Monstera'},
];

// ── Image helper ──
function normalizeImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('data:') || url.includes('images.weserv.nl/')) return url;
  try {
    const parsed = new URL(url, window.location.href);
    const target = `${parsed.hostname}${parsed.pathname}${parsed.search || ''}`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(target)}`;
  } catch (e) { return url; }
}

// Retry broken images once via proxy to dodge hotlink blocks
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

// ── Firebase helpers ──
function fb() { return window._fb || null; }

async function fbGet(path) {
  const f = fb(); if (!f) return null;
  const { db, doc, getDoc } = f;
  const snap = await getDoc(doc(db, ...path.split('/')));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

async function fbGetAll(col) {
  const f = fb(); if (!f) return [];
  const { db, collection, getDocs } = f;
  const snap = await getDocs(collection(db, col));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function fbSet(path, data) {
  const f = fb(); if (!f) return;
  const { db, doc, setDoc } = f;
  await setDoc(doc(db, ...path.split('/')), data, { merge: true });
}

async function fbAdd(col, data) {
  const f = fb(); if (!f) return;
  const { db, collection, addDoc, serverTimestamp } = f;
  return addDoc(collection(db, col), { ...data, createdAt: serverTimestamp() });
}

async function fbDelete(path) {
  const f = fb(); if (!f) return;
  const { db, doc, deleteDoc } = f;
  await deleteDoc(doc(db, ...path.split('/')));
}

// ── Toast ──
function showToast(msg, type = 'default') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.background = type === 'error' ? '#923232' : type === 'success' ? '#2a5c2a' : 'var(--ink)';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Theme ──
function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  document.querySelectorAll('.theme-toggle-knob').forEach(k => { k.textContent = dark ? '🌙' : '🌿'; });
}
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  localStorage.setItem('np_theme', isDark ? 'light' : 'dark');
  applyTheme(!isDark);
}
(function() {
  const saved = localStorage.getItem('np_theme');
  applyTheme(saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches));
})();

// ── Auth ──
function checkAuth() {
  const f = fb();
  if (!f) { showLogin(); return; }
  const { auth, onAuthStateChanged, db, doc, getDoc } = f;
  onAuthStateChanged(auth, async user => {
    if (!user) { showLogin(); return; }
    // Check admin role in Firestore
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists() && snap.data().isAdmin === true) {
        adminState.user = { uid: user.uid, email: user.email, ...snap.data() };
        showAdmin();
      } else {
        document.getElementById('login-error').textContent = 'Access denied — this account does not have admin privileges.';
        document.getElementById('login-error').style.display = 'block';
        showLogin();
        f.signOut(auth);
      }
    } catch(e) { showLogin(); }
  });
}

function showLogin() {
  document.getElementById('admin-login').style.display = 'flex';
  document.getElementById('admin-layout').style.display = 'none';
}
function showAdmin() {
  document.getElementById('admin-login').style.display = 'none';
  document.getElementById('admin-layout').style.display = 'flex';
  document.getElementById('sidebar-admin-email').textContent = adminState.user?.email || 'Admin';
  navigateTo('dashboard');
}

async function doAdminLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pwd = document.getElementById('login-pwd').value;
  const errEl = document.getElementById('login-error');
  errEl.style.display = 'none';
  if (!email || !pwd) { errEl.textContent = 'Please enter email and password.'; errEl.style.display = 'block'; return; }
  const btn = document.getElementById('login-btn');
  btn.disabled = true; btn.textContent = 'Signing in…';
  const f = fb();
  if (!f) { errEl.textContent = 'Firebase not connected.'; errEl.style.display = 'block'; btn.disabled = false; btn.textContent = 'Sign in to Admin'; return; }
  try {
    const { auth, signInWithEmailAndPassword } = f;
    await signInWithEmailAndPassword(auth, email, pwd);
    // checkAuth() will handle the rest via onAuthStateChanged
  } catch(e) {
    errEl.textContent = e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential'
      ? 'Incorrect email or password.' : (e.message || 'Sign in failed.');
    errEl.style.display = 'block';
    btn.disabled = false; btn.textContent = 'Sign in to Admin';
  }
}

function doAdminLogout() {
  const f = fb();
  if (f) f.signOut(f.auth).catch(()=>{});
  adminState.user = null;
  showLogin();
}

// ── Navigation ──
function navigateTo(view) {
  adminState.view = view;
  document.querySelectorAll('.admin-view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  const el = document.getElementById('view-' + view);
  if (el) el.classList.add('active');
  const link = document.querySelector(`[data-view="${view}"]`);
  if (link) link.classList.add('active');
  document.getElementById('header-title').textContent = {
    dashboard: 'Dashboard', products: 'Products', plants: 'Plant Database',
    users: 'Users', orders: 'Orders',
    diagnoses: 'Diagnosis History', analytics: 'Analytics'
  }[view] || 'Admin';
  // Load data for the view
  loadView(view);
  // Close mobile sidebar
  document.getElementById('admin-sidebar').classList.remove('open');
}

async function loadView(view) {
  if (view === 'dashboard') await loadDashboard();
  else if (view === 'products') await loadProducts();
  else if (view === 'plants') renderPlantsAdmin();
  else if (view === 'users') await loadUsers();
  else if (view === 'orders') await loadOrders();
  else if (view === 'diagnoses') await loadDiagnoses();
  else if (view === 'analytics') await loadAnalytics();
}

// ══════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════
async function loadDashboard() {
  try {
    const [users, gardens, carts] = await Promise.all([
      fbGetAll('users'),
      fbGetAll('gardens'),
      fbGetAll('carts'),
    ]);

    const registeredUsers = users.filter(u => !u.isGuest);
    const totalPlants = gardens.reduce((sum, g) => sum + (g.plants?.length || 0), 0);
    const totalCartItems = carts.reduce((sum, c) => sum + (c.items?.length || 0), 0);

    document.getElementById('stat-users').textContent = registeredUsers.length;
    document.getElementById('stat-gardens').textContent = totalPlants;
    document.getElementById('stat-products').textContent = adminState.products.length || DEFAULT_PRODUCTS.length;
    document.getElementById('stat-cart').textContent = totalCartItems;

    // Recent users
    const recentUsers = registeredUsers.sort((a,b) => (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0)).slice(0,5);
    const recentEl = document.getElementById('recent-users');
    if (recentEl) {
      recentEl.innerHTML = recentUsers.length ? recentUsers.map(u => `
        <div class="mini-row">
          <div>
            <div class="mini-row-label">${u.firstName || ''} ${u.lastName || ''}</div>
            <div class="mini-row-sub">${u.email}</div>
          </div>
          <span class="table-badge ${u.isAdmin ? 'badge-orange' : 'badge-green'}">${u.isAdmin ? 'Admin' : 'User'}</span>
        </div>
      `).join('') : '<p style="font-size:13px;color:var(--ink-faint);padding:20px 0">No users yet</p>';
    }
  } catch(e) {
    console.error('Dashboard load error:', e);
  }
}

// ══════════════════════════════════════════
// PRODUCTS
// ══════════════════════════════════════════
async function loadProducts() {
  // Load from Firestore if available, else use defaults
  try {
    const stored = await fbGetAll('products');
    adminState.products = stored.length ? stored : DEFAULT_PRODUCTS;
  } catch(e) {
    adminState.products = DEFAULT_PRODUCTS;
  }
  renderProductsTable();
  // Show badge if products have previously been synced to the site
  try {
    if (localStorage.getItem('np_admin_products')) {
      const badge = document.getElementById('product-sync-badge');
      if (badge) { badge.style.display = 'inline'; badge.textContent = '✓ Previously synced'; }
    }
  } catch(e) {}
}

function renderProductsTable(filter = '') {
  const list = adminState.products.filter(p =>
    !filter || p.name.toLowerCase().includes(filter) || p.cat.toLowerCase().includes(filter)
  );
  const tbody = document.getElementById('products-tbody');
  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><h3>No products found</h3></div></td></tr>`;
    return;
  }
  tbody.innerHTML = list.map(p => `
    <tr>
      <td>
        <div class="table-photo">
          ${p.img ? `<img src="${normalizeImageUrl(p.img)}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>` : ''}
          <div class="table-photo-fallback" style="${p.img?'display:none;':''}">${p.sym||'🌱'}</div>
        </div>
      </td>
      <td><div class="table-name">${p.name}</div><div class="table-sub">${p.id}</div></td>
      <td><span class="table-badge badge-gray">${p.cat}</span></td>
      <td style="font-family:var(--font-serif);font-size:16px">₹${p.price}</td>
      <td>${p.stock !== undefined ? p.stock : '—'}</td>
      <td><div class="table-actions">
        <button class="btn-edit" onclick="openEditProduct('${p.id}')">Edit</button>
        <button class="btn-danger" onclick="deleteProduct('${p.id}')">Delete</button>
      </div></td>
    </tr>
  `).join('');
  document.getElementById('product-count').textContent = `${list.length} items`;
}

function openAddProduct() {
  document.getElementById('product-modal-title').textContent = 'Add Product';
  document.getElementById('product-form').reset();
  document.getElementById('product-id-field').value = '';
  document.getElementById('product-modal').style.display = 'flex';
  initProductPreviewListeners();
  updateProductPreview();
}

function openEditProduct(id) {
  const p = adminState.products.find(x => x.id === id);
  if (!p) return;
  document.getElementById('product-modal-title').textContent = 'Edit Product';
  document.getElementById('product-id-field').value = p.id;
  document.getElementById('product-name').value = p.name;
  document.getElementById('product-cat').value = p.cat;
  document.getElementById('product-img').value = p.img || '';
  document.getElementById('product-sym').value = p.sym || '';
  document.getElementById('product-price').value = p.price;
  document.getElementById('product-stock').value = p.stock || 0;
  document.getElementById('product-desc').value = p.desc || '';
  document.getElementById('product-modal').style.display = 'flex';
  initProductPreviewListeners();
  updateProductPreview();
}

async function saveProduct() {
  const id = document.getElementById('product-id-field').value.trim();
  const name = document.getElementById('product-name').value.trim();
  const cat = document.getElementById('product-cat').value.trim();
  const img = document.getElementById('product-img').value.trim();
  const sym = document.getElementById('product-sym').value.trim();
  const price = parseInt(document.getElementById('product-price').value);
  const stock = parseInt(document.getElementById('product-stock').value) || 0;
  const desc = document.getElementById('product-desc').value.trim();
  if (!name || !cat || !price) { showToast('Name, category and price are required', 'error'); return; }
  const newId = id || name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const product = { id: newId, name, cat, sym, img, price, stock, desc };
  try {
    await fbSet(`products/${newId}`, product);
    const idx = adminState.products.findIndex(p => p.id === newId);
    if (idx > -1) adminState.products[idx] = product;
    else adminState.products.push(product);
    syncProductsToSite();
    closeModal('product-modal');
    renderProductsTable();
    showToast(id ? 'Product updated ✓ — live on site' : 'Product added ✓ — live on site', 'success');
  } catch(e) { showToast('Error saving product', 'error'); }
}

// Sync admin products to localStorage so main site picks up changes live
function syncProductsToSite() {
  try {
    localStorage.setItem('np_admin_products', JSON.stringify(adminState.products));
    const badge = document.getElementById('product-sync-badge');
    if (badge) {
      badge.style.display = 'inline';
      badge.textContent = '✓ Live on site';
      badge.style.background = 'rgba(122,193,122,.15)';
      badge.style.color = 'var(--acid)';
    }
  } catch(e) {}
}

// Live preview for product modal
function initProductPreviewListeners() {
  const fields = ['product-name','product-cat','product-img','product-sym','product-price','product-stock','product-desc'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.dataset.previewBound) {
      el.addEventListener('input', updateProductPreview);
      el.dataset.previewBound = '1';
    }
  });
}

function updateProductPreview() {
  const name = document.getElementById('product-name')?.value.trim() || 'New Product';
  const cat = document.getElementById('product-cat')?.value || 'Category';
  const img = document.getElementById('product-img')?.value.trim();
  const sym = document.getElementById('product-sym')?.value.trim() || '🌱';
  const price = document.getElementById('product-price')?.value || '0';
  const stock = document.getElementById('product-stock')?.value || '0';
  const desc = document.getElementById('product-desc')?.value.trim() || 'Description preview';

  const imgEl = document.getElementById('pp-img');
  const fbEl = document.getElementById('pp-fallback');
  if (imgEl && fbEl) {
    if (img) {
      imgEl.src = normalizeImageUrl(img); imgEl.style.display = 'block'; fbEl.style.display = 'none';
    } else {
      imgEl.removeAttribute('src'); imgEl.style.display = 'none'; fbEl.style.display = 'flex'; fbEl.textContent = sym;
    }
  }
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setText('pp-name', name || 'New Product');
  setText('pp-cat', cat || 'Category');
  setText('pp-desc', desc);
  setText('pp-price', `₹${price || 0}`);
  setText('pp-stock', `Stock: ${stock || 0}`);
}

async function deleteProduct(id) {
  if (!confirm('Delete this product? This cannot be undone.')) return;
  try {
    await fbDelete(`products/${id}`);
    adminState.products = adminState.products.filter(p => p.id !== id);
    syncProductsToSite();
    renderProductsTable();
    showToast('Product deleted — removed from site', 'success');
  } catch(e) { showToast('Error deleting product', 'error'); }
}

// ══════════════════════════════════════════
// PLANTS
// ══════════════════════════════════════════
function renderPlantsAdmin(filter = '', cat = '') {
  let list = typeof PLANT_DB !== 'undefined' ? PLANT_DB : [];
  if (filter) list = list.filter(p => p.common.toLowerCase().includes(filter.toLowerCase()) || p.latin.toLowerCase().includes(filter.toLowerCase()));
  if (cat) list = list.filter(p => p.cats.includes(cat));

  document.getElementById('plant-admin-count').textContent = `${list.length} plants`;
  const tbody = document.getElementById('plants-tbody');
  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><h3>No plants found</h3></div></td></tr>`;
    return;
  }
  tbody.innerHTML = list.map(p => `
    <tr>
      <td><img class="table-img" src="${p.img}" alt="${p.common}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2224%22>🌿</text></svg>'"/></td>
      <td>
        <div class="table-name">${p.common}</div>
        <div class="table-sub" style="font-style:italic">${p.latin}</div>
      </td>
      <td>${p.cats.map(c => `<span class="table-badge badge-green" style="margin-right:4px">${c}</span>`).join('')}</td>
      <td><span class="table-badge ${p.diff==='Easy'?'badge-green':p.diff==='Moderate'?'badge-orange':'badge-red'}">${p.diff}</span></td>
      <td><div class="table-actions">
        <button class="btn-edit" onclick="openEditPlant(${p.id})">Edit</button>
        <button class="btn-danger" onclick="deletePlantAdmin(${p.id})">Remove</button>
      </div></td>
    </tr>
  `).join('');
}

function openAddPlant() {
  document.getElementById('plant-modal-title').textContent = 'Add Plant';
  document.getElementById('plant-form').reset();
  document.getElementById('plant-id-field').value = '';
  document.getElementById('plant-modal').style.display = 'flex';
}

function openEditPlant(id) {
  const p = PLANT_DB.find(x => x.id === id);
  if (!p) return;
  document.getElementById('plant-modal-title').textContent = 'Edit Plant';
  document.getElementById('plant-id-field').value = p.id;
  document.getElementById('plant-common').value = p.common;
  document.getElementById('plant-latin').value = p.latin;
  document.getElementById('plant-img').value = p.img;
  document.getElementById('plant-water').value = p.water;
  document.getElementById('plant-sun').value = p.sun;
  document.getElementById('plant-diff').value = p.diff;
  document.getElementById('plant-cats').value = p.cats.join(', ');
  document.getElementById('plant-tips').value = p.tips.join('\n');
  document.getElementById('plant-modal').style.display = 'flex';
}

async function savePlant() {
  const id = parseInt(document.getElementById('plant-id-field').value) || (Math.max(...PLANT_DB.map(p=>p.id)) + 1);
  const common = document.getElementById('plant-common').value.trim();
  const latin = document.getElementById('plant-latin').value.trim();
  const img = document.getElementById('plant-img').value.trim();
  const water = document.getElementById('plant-water').value.trim();
  const sun = document.getElementById('plant-sun').value.trim();
  const diff = document.getElementById('plant-diff').value;
  const cats = document.getElementById('plant-cats').value.split(',').map(c=>c.trim()).filter(Boolean);
  const tips = document.getElementById('plant-tips').value.split('\n').map(t=>t.trim()).filter(Boolean);
  if (!common || !latin) { showToast('Common name and Latin name are required', 'error'); return; }
  const plant = { id, common, latin, img, water, sun, diff, cats, cycle:'Perennial', ph:'6.0-7.0', fertilizer:'Monthly', propagation:'Varies', pests:'Varies', season:{best:'Year-round',sow:'N/A',harvest:'N/A',bloom:'Varies'}, companion:[], tips };
  // Save to Firestore custom plants collection
  try {
    await fbSet(`custom_plants/${id}`, plant);
    const idx = PLANT_DB.findIndex(p => p.id === id);
    if (idx > -1) PLANT_DB[idx] = plant;
    else PLANT_DB.push(plant);
    syncPlantsToSite();
    closeModal('plant-modal');
    renderPlantsAdmin();
    showToast(document.getElementById('plant-id-field').value ? 'Plant updated ✓ — live on site' : 'Plant added ✓ — live on site', 'success');
  } catch(e) { showToast('Error saving plant', 'error'); }
}

// Sync edited PLANT_DB to localStorage so main site reflects changes
function syncPlantsToSite() {
  try {
    localStorage.setItem('np_admin_plants', JSON.stringify(PLANT_DB));
    const badge = document.getElementById('plant-sync-badge');
    if (badge) {
      badge.style.display = 'inline';
      badge.textContent = '✓ Live on site';
    }
  } catch(e) {}
}

async function deletePlantAdmin(id) {
  if (!confirm('Remove this plant from the database?')) return;
  const idx = PLANT_DB.findIndex(p => p.id === id);
  if (idx > -1) {
    PLANT_DB.splice(idx, 1);
    await fbDelete(`custom_plants/${id}`).catch(()=>{});
    syncPlantsToSite();
    renderPlantsAdmin();
    showToast('Plant removed — updated on site', 'success');
  }
}

// ══════════════════════════════════════════
// USERS
// ══════════════════════════════════════════
async function loadUsers(filter = '') {
  try {
    const users = await fbGetAll('users');
    adminState.users = users;
    renderUsersTable(filter);
  } catch(e) { showToast('Error loading users', 'error'); }
}

function renderUsersTable(filter = '') {
  const list = filter
    ? adminState.users.filter(u => (u.email||'').toLowerCase().includes(filter) || (u.firstName||'').toLowerCase().includes(filter))
    : adminState.users;
  document.getElementById('user-count').textContent = `${list.length} users`;
  const tbody = document.getElementById('users-tbody');
  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><h3>No users found</h3></div></td></tr>`;
    return;
  }
  tbody.innerHTML = list.map(u => `
    <tr>
      <td>
        <div class="table-name">${u.firstName||''} ${u.lastName||''}</div>
        <div class="table-sub">${u.email}</div>
      </td>
      <td><span class="table-badge ${u.isAdmin ? 'badge-orange' : 'badge-green'}">${u.isAdmin ? 'Admin' : 'User'}</span></td>
      <td>${u.city || '—'}</td>
      <td>${u.onboarded ? '<span class="table-badge badge-green">Yes</span>' : '<span class="table-badge badge-gray">No</span>'}</td>
      <td><div class="table-actions">
        <button class="btn-edit" onclick="toggleAdmin('${u.id}')">${u.isAdmin ? 'Revoke Admin' : 'Make Admin'}</button>
        <button class="btn-danger" onclick="deleteUser('${u.id}')">Delete</button>
      </div></td>
    </tr>
  `).join('');
}

async function toggleAdmin(uid) {
  const user = adminState.users.find(u => u.id === uid);
  if (!user) return;
  if (!confirm(`${user.isAdmin ? 'Revoke' : 'Grant'} admin access for ${user.email}?`)) return;
  try {
    await fbSet(`users/${uid}`, { isAdmin: !user.isAdmin });
    user.isAdmin = !user.isAdmin;
    renderUsersTable();
    showToast(`Admin access ${user.isAdmin ? 'granted' : 'revoked'} ✓`, 'success');
  } catch(e) { showToast('Error updating user', 'error'); }
}

async function deleteUser(uid) {
  if (!confirm('Delete this user and all their data? This cannot be undone.')) return;
  try {
    await Promise.all([
      fbDelete(`users/${uid}`),
      fbDelete(`gardens/${uid}`),
      fbDelete(`carts/${uid}`),
    ]);
    adminState.users = adminState.users.filter(u => u.id !== uid);
    renderUsersTable();
    showToast('User deleted', 'success');
  } catch(e) { showToast('Error deleting user', 'error'); }
}

// ══════════════════════════════════════════
// ORDERS (Real orders from Firestore)
// ══════════════════════════════════════════
let _allOrders = [];

async function loadOrders() {
  try {
    const orders = await fbGetAll('orders');
    _allOrders = orders.sort((a,b) => (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0));
    document.getElementById('order-count').textContent = `${_allOrders.length} order${_allOrders.length !== 1 ? 's' : ''}`;
    renderOrdersTable(_allOrders);
  } catch(e) {
    console.error('Orders error:', e);
    showToast('Error loading orders', 'error');
  }
}

function renderOrdersTable(list) {
  const tbody = document.getElementById('orders-tbody');
  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><h3>No orders yet</h3><p>Orders placed via the storefront will appear here with full delivery details.</p></div></td></tr>`;
    return;
  }
  const STATUS_COLORS = { confirmed:'badge-green', dispatched:'badge-orange', delivered:'badge-blue', cancelled:'badge-red' };
  tbody.innerHTML = list.map(o => {
    const d = o.delivery || {};
    const date = o.createdAt?.seconds ? new Date(o.createdAt.seconds * 1000).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : (o.placedAt ? new Date(o.placedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short'}) : '—');
    const addrLine = [d.addr1, d.addr2, d.city, d.state, d.pin].filter(Boolean).join(', ');
    const itemsList = (o.items||[]).map(i => `<span class="order-item-pill">${i.sym||'🌱'} ${i.name}</span>`).join('');
    const status = o.status || 'confirmed';
    const payIcons = { upi:'📲', card:'💳', nb:'🏦', cod:'🏠' };
    return `<tr>
      <td><div class="table-name order-id">${o.orderId||o.id}</div></td>
      <td>
        <div class="table-name">${o.delivery?.name || o.userName || '—'}</div>
        <div class="table-sub">${o.userEmail||'—'}</div>
        <div class="table-sub">📞 ${d.phone||'—'}</div>
      </td>
      <td><div class="addr-cell">${addrLine || '—'}</div>${d.note ? `<div class="table-sub" style="margin-top:3px">📝 ${d.note}</div>` : ''}</td>
      <td><div class="order-items-wrap">${itemsList || '—'}</div></td>
      <td><div class="table-price">₹${o.total||0}</div><div class="table-sub">+₹${o.shipping||0} ship</div></td>
      <td><span class="pay-method-badge">${payIcons[o.payMethod]||'💰'} ${(o.payMethod||'').toUpperCase()}</span></td>
      <td>
        <select class="status-select ${STATUS_COLORS[status]||'badge-green'}" onchange="updateOrderStatus('${o.id}', this.value)" data-order="${o.id}">
          <option value="confirmed" ${status==='confirmed'?'selected':''}>Confirmed</option>
          <option value="dispatched" ${status==='dispatched'?'selected':''}>Dispatched</option>
          <option value="delivered" ${status==='delivered'?'selected':''}>Delivered</option>
          <option value="cancelled" ${status==='cancelled'?'selected':''}>Cancelled</option>
        </select>
      </td>
      <td style="font-size:11.5px;color:var(--ink-faint);white-space:nowrap">${date}</td>
    </tr>`;
  }).join('');
}

async function updateOrderStatus(id, status) {
  try {
    await fbSet(`orders/${id}`, { status });
    const o = _allOrders.find(x => x.id === id);
    if (o) o.status = status;
    showToast(`Order status → ${status} ✓`, 'success');
  } catch(e) { showToast('Error updating status', 'error'); }
}

function filterOrdersByStatus(status) {
  const q = document.querySelector('#order-status-filter')?.value || status;
  const search = document.querySelector('#view-orders .search-input')?.value?.toLowerCase() || '';
  _filterOrders(q, search);
}
function filterOrdersSearch(q) {
  const status = document.getElementById('order-status-filter')?.value || '';
  _filterOrders(status, q.toLowerCase());
}
function _filterOrders(status, search) {
  let list = _allOrders;
  if (status) list = list.filter(o => o.status === status);
  if (search) list = list.filter(o =>
    (o.orderId||'').toLowerCase().includes(search) ||
    (o.delivery?.name||'').toLowerCase().includes(search) ||
    (o.userEmail||'').toLowerCase().includes(search) ||
    (o.delivery?.city||'').toLowerCase().includes(search)
  );
  renderOrdersTable(list);
}

// ══════════════════════════════════════════
// DIAGNOSES
// ══════════════════════════════════════════
async function loadDiagnoses() {
  try {
    const users = await fbGetAll('users');
    const tbody = document.getElementById('diag-tbody');
    let allDiags = [];
    // Load diagnoses subcollection for each user
    for (const user of users.slice(0, 20)) { // limit to 20 users for performance
      try {
        const { db, collection, getDocs, query, orderBy } = fb();
        const snap = await getDocs(query(collection(db, 'users', user.id, 'diagnoses'), orderBy('createdAt', 'desc')));
        snap.docs.forEach(d => allDiags.push({ ...d.data(), userId: user.id, userName: `${user.firstName||''} ${user.lastName||''}`, userEmail: user.email }));
      } catch(e) {}
    }
    allDiags.sort((a,b) => (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0));
    document.getElementById('diag-count').textContent = `${allDiags.length} diagnoses`;
    if (!allDiags.length) {
      tbody.innerHTML = `<tr><td colspan="4"><div class="empty-state"><h3>No diagnoses yet</h3></div></td></tr>`;
      return;
    }
    tbody.innerHTML = allDiags.slice(0, 50).map(d => {
      const date = d.createdAt?.seconds ? new Date(d.createdAt.seconds * 1000).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '—';
      const resultPreview = d.result ? d.result.slice(0, 120) + (d.result.length > 120 ? '…' : '') : '—';
      return `
        <tr>
          <td>
            <div class="table-name">${d.userName}</div>
            <div class="table-sub">${d.userEmail}</div>
          </td>
          <td><span class="table-badge ${d.mode==='image'?'badge-orange':'badge-green'}">${d.mode==='image'?'📷 Photo':'📝 Text'}</span></td>
          <td style="max-width:280px"><div style="font-size:12px;color:var(--ink-faint);line-height:1.6">${resultPreview}</div></td>
          <td style="font-size:12px;color:var(--ink-faint);white-space:nowrap">${date}</td>
        </tr>
      `;
    }).join('');
  } catch(e) { document.getElementById('diag-tbody').innerHTML = `<tr><td colspan="4" style="text-align:center;padding:40px;color:var(--ink-faint)">Could not load diagnoses</td></tr>`; }
}

// ══════════════════════════════════════════
// ANALYTICS
// ══════════════════════════════════════════
async function loadAnalytics() {
  try {
    const [users, gardens, carts] = await Promise.all([
      fbGetAll('users'), fbGetAll('gardens'), fbGetAll('carts')
    ]);
    // Plant popularity
    const plantCounts = {};
    gardens.forEach(g => {
      (g.plants || []).forEach(p => {
        const key = p.id || 'unknown';
        plantCounts[key] = (plantCounts[key] || 0) + 1;
      });
    });
    const topPlants = Object.entries(plantCounts).sort((a,b) => b[1]-a[1]).slice(0, 8).map(([id, count]) => {
      const plant = typeof PLANT_DB !== 'undefined' ? PLANT_DB.find(p => String(p.id) === String(id)) : null;
      return { name: plant ? plant.common : id, count };
    });
    // Category popularity
    const catCounts = {};
    gardens.forEach(g => {
      (g.plants || []).forEach(p => {
        const plant = typeof PLANT_DB !== 'undefined' ? PLANT_DB.find(x => String(x.id) === String(p.id)) : null;
        if (plant) plant.cats.forEach(c => { catCounts[c] = (catCounts[c] || 0) + 1; });
      });
    });
    const topCats = Object.entries(catCounts).sort((a,b) => b[1]-a[1]);
    const maxPlant = topPlants[0]?.count || 1;
    const maxCat = topCats[0]?.[1] || 1;

    // City distribution
    const cityCounts = {};
    users.forEach(u => { if(u.city) cityCounts[u.city] = (cityCounts[u.city]||0) + 1; });
    const topCities = Object.entries(cityCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);

    document.getElementById('analytics-stats').innerHTML = `
      <div class="stat-card"><div class="stat-label">Total Users</div><div class="stat-value">${users.length}</div></div>
      <div class="stat-card green"><div class="stat-label">Total Gardens</div><div class="stat-value">${gardens.filter(g=>g.plants?.length).length}</div></div>
      <div class="stat-card"><div class="stat-label">Plants Tracked</div><div class="stat-value">${gardens.reduce((s,g)=>s+(g.plants?.length||0),0)}</div></div>
      <div class="stat-card"><div class="stat-label">Active Carts</div><div class="stat-value">${carts.filter(c=>c.items?.length).length}</div></div>
    `;

    document.getElementById('chart-top-plants').innerHTML = topPlants.length ? topPlants.map(p => `
      <div class="bar-row">
        <div class="bar-label" title="${p.name}">${p.name}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${Math.round(p.count/maxPlant*100)}%"></div></div>
        <div class="bar-count">${p.count}</div>
      </div>
    `).join('') : '<p style="font-size:13px;color:var(--ink-faint)">No garden data yet</p>';

    document.getElementById('chart-categories').innerHTML = topCats.length ? topCats.slice(0,6).map(([cat,count]) => `
      <div class="bar-row">
        <div class="bar-label">${cat.charAt(0).toUpperCase()+cat.slice(1)}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${Math.round(count/maxCat*100)}%;background:var(--green-light)"></div></div>
        <div class="bar-count">${count}</div>
      </div>
    `).join('') : '<p style="font-size:13px;color:var(--ink-faint)">No data yet</p>';

    document.getElementById('chart-cities').innerHTML = topCities.length ? topCities.map(([city, count]) => `
      <div class="mini-row">
        <div class="mini-row-label">${city.charAt(0).toUpperCase()+city.slice(1)}</div>
        <div class="mini-row-value">${count} user${count!==1?'s':''}</div>
      </div>
    `).join('') : '<p style="font-size:13px;color:var(--ink-faint);padding:16px 0">No city data yet</p>';

  } catch(e) { console.error('Analytics error:', e); }
}

// ── Modal helpers ──
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// ── Search / Filter handlers ──
function filterProducts(q) { renderProductsTable(q.toLowerCase()); }
function filterPlants(q) { renderPlantsAdmin(q); }
function filterPlantCat(cat) { renderPlantsAdmin(document.getElementById('plant-search').value, cat); }
function filterUsers(q) { renderUsersTable(q.toLowerCase()); }

// ── Init ──
window.addEventListener('firebase-ready', () => { checkAuth(); });
window.addEventListener('load', () => {
  if (window._fb) checkAuth();
  else setTimeout(() => { if (!window._fb) showLogin(); }, 1500);
});
