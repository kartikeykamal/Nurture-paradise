// ═══════════════════════════════════════════
// Nurture Paradise — UI/UX Enhancements
// js/enhancements.js
// Pure additions — zero changes to existing code
// ═══════════════════════════════════════════

// ══════════════════════════════════════════
// 1. ENHANCED TOAST — types, icons, queue
// ══════════════════════════════════════════
(function() {
  // Override the existing showToast with a richer version
  const _originalShowToast = window.showToast;
  let _toastTimer = null;

  window.showToast = function(msg, type = 'default') {
    const t = document.getElementById('toast');
    if (!t) return;
    clearTimeout(_toastTimer);
    t.classList.remove('show','toast-success','toast-error','toast-warn');
    void t.offsetWidth; // force reflow for re-animation

    const icons = { success:'✓', error:'✕', warn:'⚠', default:'🌿' };
    const icon = icons[type] || icons.default;
    t.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-msg">${msg}</span>`;
    t.classList.add('show', type !== 'default' ? `toast-${type}` : '');
    _toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
  };
})();

// ══════════════════════════════════════════
// 2. PAGE TRANSITION — fade between pages
// ══════════════════════════════════════════
(function() {
  const _orig = window.navigate;
  if (!_orig) return;
  window.navigate = function(page) {
    const current = document.querySelector('.page.active');
    if (current) {
      current.style.opacity = '0';
      current.style.transform = 'translateY(6px)';
      setTimeout(() => {
        current.style.opacity = '';
        current.style.transform = '';
        _orig(page);
        // Animate in the new page
        requestAnimationFrame(() => {
          const next = document.querySelector('.page.active');
          if (next) {
            next.style.opacity = '0';
            next.style.transform = 'translateY(10px)';
            requestAnimationFrame(() => {
              next.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)';
              next.style.opacity = '1';
              next.style.transform = 'translateY(0)';
              setTimeout(() => { next.style.transition = ''; next.style.opacity = ''; next.style.transform = ''; }, 400);
            });
          }
        });
      }, 120);
    } else {
      _orig(page);
    }
  };
})();

// ══════════════════════════════════════════
// 3. SKELETON LOADERS — shimmer placeholders
// ══════════════════════════════════════════
window.showSkeletons = function(containerId, count = 8) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array.from({length: count}, () =>
    `<div class="np-skeleton np-skeleton-card"></div>`
  ).join('');
};

window.showSkeletonRows = function(containerId, count = 3) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array.from({length: count}, () => `
    <div class="np-skeleton-row">
      <div class="np-skeleton np-skeleton-circle"></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:6px">
        <div class="np-skeleton np-skeleton-line" style="width:60%"></div>
        <div class="np-skeleton np-skeleton-line" style="width:40%"></div>
      </div>
    </div>
  `).join('');
};

// ══════════════════════════════════════════
// 4. RIPPLE EFFECT on buttons
// ══════════════════════════════════════════
(function() {
  function addRipple(e) {
    const btn = e.currentTarget;
    const existing = btn.querySelector('.np-ripple');
    if (existing) existing.remove();
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const ripple = document.createElement('span');
    ripple.className = 'np-ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }

  function attachRipples() {
    document.querySelectorAll('.btn-ink, .btn-primary, .auth-btn-primary, .btn-add-cart, .login-btn').forEach(btn => {
      if (!btn.dataset.rippleAttached) {
        btn.addEventListener('click', addRipple);
        btn.dataset.rippleAttached = 'true';
      }
    });
  }

  // Attach on load + after any DOM mutation
  document.addEventListener('DOMContentLoaded', attachRipples);
  const _obs = new MutationObserver(attachRipples);
  _obs.observe(document.body, { childList: true, subtree: true });
})();

// ══════════════════════════════════════════
// 5. PLANT CARD HOVER — image zoom + diff badge
// ══════════════════════════════════════════
(function() {
  function enhancePlantCards() {
    document.querySelectorAll('.plant-api-card:not([data-enhanced])').forEach(card => {
      card.dataset.enhanced = 'true';

      // Image zoom on hover
      const img = card.querySelector('.plant-api-img');
      if (img) {
        img.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
        card.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.06)'; });
        card.addEventListener('mouseleave', () => { img.style.transform = 'scale(1)'; });
      }

      // Quick-add pulse on success
      const addBtn = card.querySelector('.plant-api-add');
      if (addBtn) {
        const _orig = addBtn.onclick;
        addBtn.addEventListener('click', function() {
          if (!this.classList.contains('in-garden')) {
            this.classList.add('np-btn-pulse');
            setTimeout(() => this.classList.remove('np-btn-pulse'), 600);
          }
        });
      }
    });
  }
  document.addEventListener('DOMContentLoaded', enhancePlantCards);
  new MutationObserver(enhancePlantCards).observe(document.body, { childList: true, subtree: true });
})();

// ══════════════════════════════════════════
// 6. SEARCH INPUT — live debounce + clear btn
// ══════════════════════════════════════════
(function() {
  function enhanceSearch() {
    const inp = document.getElementById('plant-search-input');
    if (!inp || inp.dataset.enhanced) return;
    inp.dataset.enhanced = 'true';

    // Wrap in relative container and add clear button
    const wrap = inp.parentElement;
    if (wrap && !wrap.querySelector('.np-search-clear')) {
      wrap.style.position = 'relative';
      const clearBtn = document.createElement('button');
      clearBtn.className = 'np-search-clear';
      clearBtn.innerHTML = '×';
      clearBtn.title = 'Clear search';
      clearBtn.style.display = 'none';
      clearBtn.onclick = () => {
        inp.value = '';
        clearBtn.style.display = 'none';
        if (window.searchPlants) window.searchPlants();
        inp.focus();
      };
      wrap.appendChild(clearBtn);

      inp.addEventListener('input', () => {
        clearBtn.style.display = inp.value ? 'flex' : 'none';
      });
    }

    // Results count feedback
    const orig = window.runDiscover;
    if (orig && !window._discoverEnhanced) {
      window._discoverEnhanced = true;
      window.runDiscover = function() {
        orig.apply(this, arguments);
        // Animate result count
        const status = document.getElementById('discover-status');
        if (status) {
          status.classList.add('np-status-pop');
          setTimeout(() => status.classList.remove('np-status-pop'), 400);
        }
      };
    }
  }

  document.addEventListener('DOMContentLoaded', enhanceSearch);
  new MutationObserver(enhanceSearch).observe(document.body, { childList: true, subtree: true });
})();

// ══════════════════════════════════════════
// 7. SCROLL-IN ANIMATIONS — stagger on scroll
// ══════════════════════════════════════════
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('np-visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  function observeElements() {
    document.querySelectorAll('.plant-card-home, .feature-item, .shop-card, .garden-card:not([data-observed])').forEach((el, i) => {
      if (!el.dataset.observed) {
        el.dataset.observed = 'true';
        el.dataset.delay = (i % 6) * 70;
        el.classList.add('np-scroll-reveal');
        observer.observe(el);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', observeElements);
  new MutationObserver(observeElements).observe(document.body, { childList: true, subtree: true });
})();

// ══════════════════════════════════════════
// 8. PROGRESS INDICATOR — top bar on navigation
// ══════════════════════════════════════════
(function() {
  const bar = document.createElement('div');
  bar.id = 'np-progress-bar';
  document.body.appendChild(bar);

  window.npProgressStart = function() {
    bar.style.width = '0%';
    bar.style.opacity = '1';
    bar.style.transition = 'width 0.3s ease';
    requestAnimationFrame(() => { bar.style.width = '70%'; });
  };
  window.npProgressDone = function() {
    bar.style.width = '100%';
    setTimeout(() => { bar.style.opacity = '0'; bar.style.width = '0%'; }, 350);
  };

  // Hook into navigate
  const _origNav = window.navigate;
  if (_origNav) {
    window.navigate = function(page) {
      npProgressStart();
      _origNav(page);
      setTimeout(npProgressDone, 300);
    };
  }
})();

// ══════════════════════════════════════════
// 9. EMPTY STATES — illustrated + actionable
// ══════════════════════════════════════════
(function() {
  // Enhance the garden empty state with illustration and CTA
  function enhanceEmptyStates() {
    const gardenEmpty = document.getElementById('dashboard-empty');
    if (gardenEmpty && !gardenEmpty.dataset.enhanced) {
      gardenEmpty.dataset.enhanced = 'true';
      const existing = gardenEmpty.innerHTML;
      gardenEmpty.innerHTML = `
        <div class="np-empty-illus">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="56" fill="var(--green-pale)" stroke="var(--border)" stroke-width="1.5"/>
            <path d="M60 95 C60 95 58 72 61 60 C64 48 59 28 60 18 C61 28 65 48 61 60 C64 72 60 95 60 95Z" fill="var(--green)" opacity="0.7"/>
            <path d="M60 65 C60 65 48 55 38 50 C46 53 57 61 60 64Z" fill="var(--green)" opacity="0.8"/>
            <path d="M60 58 C60 58 72 48 82 43 C74 46 63 54 60 57Z" fill="var(--green)" opacity="0.6"/>
            <path d="M60 75 C60 75 50 67 42 64 C49 66 58 73 60 74Z" fill="var(--green)" opacity="0.5"/>
            <ellipse cx="60" cy="95" rx="20" ry="5" fill="var(--green)" opacity="0.15"/>
          </svg>
        </div>
        <h2 style="font-family:var(--font-serif);font-size:32px;font-weight:500;color:var(--ink);margin-bottom:10px">Your garden awaits</h2>
        <p style="color:var(--ink-faint);font-size:14px;max-width:300px;line-height:1.8;margin-bottom:28px">You haven't added any plants yet. Head to Discover to find your first plant companion.</p>
        <button class="btn-ink np-empty-cta" onclick="navigate('discover')">
          Browse Plants
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="margin-left:8px"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      `;
    }

    // Cart empty state
    const cartItems = document.getElementById('cart-items');
    if (cartItems && cartItems.children.length === 0 && !cartItems.dataset.emptyEnhanced) {
      // Will be set when cart renders empty
    }
  }

  document.addEventListener('DOMContentLoaded', enhanceEmptyStates);
  new MutationObserver(enhanceEmptyStates).observe(document.body, { childList: true, subtree: true });
})();

// ══════════════════════════════════════════
// 10. HOME PAGE — animated hero counter
// ══════════════════════════════════════════
(function() {
  function animateCount(el, target, suffix = '') {
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 28);
  }

  function enhanceHome() {
    // Feature strip numbers
    document.querySelectorAll('.feature-num:not([data-animated])').forEach(el => {
      el.dataset.animated = 'true';
      const text = el.textContent;
      const num = parseInt(text);
      if (!isNaN(num)) {
        const suffix = text.replace(/[0-9]/g, '');
        const obs = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            animateCount(el, num, suffix);
            obs.unobserve(el);
          }
        }, { threshold: 0.5 });
        obs.observe(el);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', enhanceHome);
  new MutationObserver(enhanceHome).observe(document.body, { childList: true, subtree: true });
})();

// ══════════════════════════════════════════
// 11. DIAGNOSE PAGE — typing animation + loading dots
// ══════════════════════════════════════════
(function() {
  function enhanceDiagnose() {
    const textarea = document.querySelector('.diag-textarea');
    if (textarea && !textarea.dataset.enhanced) {
      textarea.dataset.enhanced = 'true';
      const counter = document.createElement('div');
      counter.className = 'np-char-counter';
      counter.textContent = '0 / 500';
      textarea.parentNode.style.position = 'relative';
      textarea.parentNode.appendChild(counter);
      textarea.addEventListener('input', () => {
        const len = textarea.value.length;
        counter.textContent = `${len} / 500`;
        counter.style.color = len > 450 ? 'var(--error)' : 'var(--ink-faint)';
      });
    }

    // Enhance loading state with animated dots
    const loadingEl = document.getElementById('diag-loading');
    if (loadingEl && !loadingEl.dataset.enhanced) {
      loadingEl.dataset.enhanced = 'true';
      const p = loadingEl.querySelector('p');
      if (p) {
        const messages = [
          'Analysing your plant…',
          'Consulting botanical knowledge…',
          'Preparing diagnosis…',
          'Almost ready…'
        ];
        let msgIdx = 0;
        let interval = null;

        // Watch for loading state to activate
        const loadObs = new MutationObserver(() => {
          if (loadingEl.style.display !== 'none') {
            msgIdx = 0;
            p.textContent = messages[0];
            interval = setInterval(() => {
              msgIdx = (msgIdx + 1) % messages.length;
              p.style.opacity = '0';
              setTimeout(() => {
                p.textContent = messages[msgIdx];
                p.style.opacity = '1';
              }, 200);
            }, 1800);
          } else {
            clearInterval(interval);
          }
        });
        loadObs.observe(loadingEl, { attributes: true, attributeFilter: ['style'] });
      }
    }
  }

  document.addEventListener('DOMContentLoaded', enhanceDiagnose);
  new MutationObserver(enhanceDiagnose).observe(document.body, { childList: true, subtree: true });
})();

// ══════════════════════════════════════════
// 12. SHOP — card hover with quick-add glow
// ══════════════════════════════════════════
(function() {
  function enhanceShop() {
    document.querySelectorAll('.shop-card:not([data-enhanced])').forEach(card => {
      card.dataset.enhanced = 'true';
      const btn = card.querySelector('.btn-add-cart');
      if (btn) {
        btn.addEventListener('click', function() {
          if (!this.classList.contains('in-cart')) {
            this.classList.add('np-btn-pulse');
            card.classList.add('np-card-added');
            setTimeout(() => {
              this.classList.remove('np-btn-pulse');
              card.classList.remove('np-card-added');
            }, 600);
          }
        });
      }
    });
  }
  document.addEventListener('DOMContentLoaded', enhanceShop);
  new MutationObserver(enhanceShop).observe(document.body, { childList: true, subtree: true });
})();

// ══════════════════════════════════════════
// 13. CART — item remove animation
// ══════════════════════════════════════════
(function() {
  function enhanceCart() {
    document.querySelectorAll('.btn-remove-cart:not([data-enhanced])').forEach(btn => {
      btn.dataset.enhanced = 'true';
      btn.addEventListener('click', function() {
        const item = this.closest('.cart-item');
        if (item) {
          item.style.transition = 'opacity 0.25s ease, transform 0.25s ease, max-height 0.3s ease';
          item.style.opacity = '0';
          item.style.transform = 'translateX(20px)';
          // Let existing click handler remove it from DOM
        }
      });
    });
  }
  document.addEventListener('DOMContentLoaded', enhanceCart);
  new MutationObserver(enhanceCart).observe(document.body, { childList: true, subtree: true });
})();

// ══════════════════════════════════════════
// 14. DETAIL PAGE — image reveal + section fade
// ══════════════════════════════════════════
(function() {
  function enhanceDetail() {
    const detailLeft = document.querySelector('.detail-left');
    if (detailLeft && !detailLeft.dataset.enhanced) {
      detailLeft.dataset.enhanced = 'true';
      // Add particle dots to background
      const bg = detailLeft.querySelector('.detail-left-bg');
      if (bg) {
        for (let i = 0; i < 6; i++) {
          const dot = document.createElement('div');
          dot.className = 'np-detail-dot';
          dot.style.cssText = `
            position:absolute;
            width:${4 + Math.random()*6}px;
            height:${4 + Math.random()*6}px;
            border-radius:50%;
            background:var(--green);
            opacity:${0.1 + Math.random()*0.15};
            top:${10 + Math.random()*80}%;
            left:${10 + Math.random()*80}%;
            animation: float ${5 + Math.random()*4}s ease-in-out infinite;
            animation-delay:${Math.random()*3}s;
          `;
          bg.appendChild(dot);
        }
      }
    }

    // Animate guide items on scroll
    document.querySelectorAll('.guide-item:not([data-observed])').forEach((el, i) => {
      el.dataset.observed = 'true';
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 80);
    });
  }

  document.addEventListener('DOMContentLoaded', enhanceDetail);
  new MutationObserver(enhanceDetail).observe(document.body, { childList: true, subtree: true });
})();

// ══════════════════════════════════════════
// 15. GARDEN — kept for future use
// ══════════════════════════════════════════
// (watering badge logic moved to garden.js)
// ══════════════════════════════════════════
// 16. CATEGORY CHIPS — smooth indicator
// ══════════════════════════════════════════
(function() {
  function enhanceChips() {
    const chips = document.querySelectorAll('.plant-chip:not([data-enhanced])');
    chips.forEach(chip => {
      chip.dataset.enhanced = 'true';
      chip.addEventListener('click', function() {
        // Add a brief scale-click effect
        this.style.transform = 'scale(0.94)';
        setTimeout(() => { this.style.transform = ''; }, 150);
      });
    });
  }
  document.addEventListener('DOMContentLoaded', enhanceChips);
  new MutationObserver(enhanceChips).observe(document.body, { childList: true, subtree: true });
})();
