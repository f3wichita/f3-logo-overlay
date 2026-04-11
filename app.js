/* F3 Logo Overlay — App Logic */

(function () {
  'use strict';

  // ── State ──
  let sites = [];
  let selectedSite = null;
  let photoImage = null;

  // Canvas / logo overlay state
  const CANVAS_WIDTH = 1080;
  let canvasHeight = 0;
  let logoX = 0;
  let logoY = 0;
  let logoWidth = 0;
  let logoHeight = 0;
  let logoImg = null;
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let lastPinchDist = 0;

  // ── DOM refs ──
  const siteListScreen = document.getElementById('site-list-screen');
  const photoScreen = document.getElementById('photo-screen');
  const editorScreen = document.getElementById('editor-screen');
  const siteListContainer = document.getElementById('site-list');
  const selectedSiteName = document.getElementById('selected-site-name');
  const canvas = document.getElementById('overlay-canvas');
  const ctx = canvas.getContext('2d');
  const cameraInput = document.getElementById('camera-input');
  const uploadInput = document.getElementById('upload-input');

  // ── Screen management ──
  function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
  }

  // ── Load sites ──
  async function loadSites() {
    siteListContainer.innerHTML = '<div class="loading-msg">Loading sites…</div>';
    try {
      const resp = await fetch('sites.json');
      if (!resp.ok) throw new Error('Failed to load sites.json');
      sites = await resp.json();
      sites.sort((a, b) => a.name.localeCompare(b.name));
      renderSiteList();
    } catch (err) {
      siteListContainer.innerHTML =
        '<div class="error-msg">Could not load sites. Check that sites.json exists.</div>';
      console.error(err);
    }
  }

  function renderSiteList() {
    if (sites.length === 0) {
      siteListContainer.innerHTML =
        '<div class="loading-msg">No sites found. Use admin.html to add sites.</div>';
      return;
    }
    siteListContainer.innerHTML = '';
    sites.forEach(site => {
      const btn = document.createElement('button');
      btn.className = 'site-item';

      if (site.logo) {
        const img = document.createElement('img');
        img.src = site.logo;
        img.alt = site.name;
        img.className = 'site-logo-thumb';
        btn.appendChild(img);
      } else {
        const ph = document.createElement('div');
        ph.className = 'site-logo-placeholder';
        ph.textContent = site.name.charAt(0).toUpperCase();
        btn.appendChild(ph);
      }

      const nameSpan = document.createElement('span');
      nameSpan.textContent = site.name;
      btn.appendChild(nameSpan);

      btn.addEventListener('click', () => selectSite(site));
      siteListContainer.appendChild(btn);
    });
  }

  // ── Site selection ──
  function selectSite(site) {
    selectedSite = site;
    selectedSiteName.textContent = site.name;
    showScreen(photoScreen);
  }

  // ── Photo capture / upload ──
  document.getElementById('btn-camera').addEventListener('click', () => {
    cameraInput.click();
  });

  document.getElementById('btn-upload').addEventListener('click', () => {
    uploadInput.click();
  });

  cameraInput.addEventListener('change', handleImageInput);
  uploadInput.addEventListener('change', handleImageInput);

  function handleImageInput(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
      const img = new Image();
      img.onload = function () {
        photoImage = img;
        initEditor();
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  // ── Editor ──
  function initEditor() {
    // Calculate canvas dimensions
    canvasHeight = Math.round((photoImage.height / photoImage.width) * CANVAS_WIDTH);
    canvas.width = CANVAS_WIDTH;
    canvas.height = canvasHeight;

    // Load logo
    if (selectedSite.logo) {
      logoImg = new Image();
      logoImg.onload = function () {
        resetLogo();
        drawCanvas();
        showScreen(editorScreen);
      };
      logoImg.src = selectedSite.logo;
    } else {
      logoImg = null;
      drawCanvas();
      showScreen(editorScreen);
    }
  }

  function resetLogo() {
    if (!logoImg) return;
    logoWidth = Math.round(CANVAS_WIDTH * 0.25);
    logoHeight = Math.round((logoImg.height / logoImg.width) * logoWidth);
    logoX = 20;
    logoY = 20;
  }

  function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(photoImage, 0, 0, CANVAS_WIDTH, canvasHeight);
    if (logoImg) {
      ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
    }
  }

  // ── Logo interaction helpers ──
  function getCanvasCoords(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }

  function isOnLogo(cx, cy) {
    return cx >= logoX && cx <= logoX + logoWidth && cy >= logoY && cy <= logoY + logoHeight;
  }

  // ── Mouse events ──
  canvas.addEventListener('mousedown', e => {
    if (!logoImg) return;
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);
    if (isOnLogo(x, y)) {
      isDragging = true;
      dragOffsetX = x - logoX;
      dragOffsetY = y - logoY;
      e.preventDefault();
    }
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);
    logoX = x - dragOffsetX;
    logoY = y - dragOffsetY;
    clampLogo();
    drawCanvas();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Scroll wheel resize
  canvas.addEventListener('wheel', e => {
    if (!logoImg) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -20 : 20;
    resizeLogo(delta);
  }, { passive: false });

  // ── Touch events ──
  canvas.addEventListener('touchstart', e => {
    if (!logoImg) return;
    if (e.touches.length === 1) {
      const { x, y } = getCanvasCoords(e.touches[0].clientX, e.touches[0].clientY);
      if (isOnLogo(x, y)) {
        isDragging = true;
        dragOffsetX = x - logoX;
        dragOffsetY = y - logoY;
        e.preventDefault();
      }
    } else if (e.touches.length === 2) {
      isDragging = false;
      lastPinchDist = getPinchDist(e.touches);
      e.preventDefault();
    }
  }, { passive: false });

  canvas.addEventListener('touchmove', e => {
    if (!logoImg) return;
    if (e.touches.length === 1 && isDragging) {
      const { x, y } = getCanvasCoords(e.touches[0].clientX, e.touches[0].clientY);
      logoX = x - dragOffsetX;
      logoY = y - dragOffsetY;
      clampLogo();
      drawCanvas();
      e.preventDefault();
    } else if (e.touches.length === 2) {
      const dist = getPinchDist(e.touches);
      const delta = (dist - lastPinchDist) * 2;
      if (Math.abs(delta) > 2) {
        resizeLogo(delta);
        lastPinchDist = dist;
      }
      e.preventDefault();
    }
  }, { passive: false });

  canvas.addEventListener('touchend', () => {
    isDragging = false;
    lastPinchDist = 0;
  });

  function getPinchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function resizeLogo(delta) {
    const minW = 54; // ~5% of 1080
    const maxW = 810; // ~75% of 1080
    const aspect = logoImg.height / logoImg.width;
    const centerX = logoX + logoWidth / 2;
    const centerY = logoY + logoHeight / 2;

    logoWidth = Math.max(minW, Math.min(maxW, logoWidth + delta));
    logoHeight = Math.round(logoWidth * aspect);
    logoX = centerX - logoWidth / 2;
    logoY = centerY - logoHeight / 2;
    clampLogo();
    drawCanvas();
  }

  function clampLogo() {
    logoX = Math.max(0, Math.min(canvas.width - logoWidth, logoX));
    logoY = Math.max(0, Math.min(canvas.height - logoHeight, logoY));
  }

  // ── Toolbar buttons ──
  document.getElementById('btn-reset-logo').addEventListener('click', () => {
    resetLogo();
    drawCanvas();
  });

  document.getElementById('btn-download').addEventListener('click', () => {
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'f3-photo.png';
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  });

  document.getElementById('btn-share').addEventListener('click', async () => {
    try {
      const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
      const file = new File([blob], 'f3-photo.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'F3 Photo' });
        return;
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.log('Share API not available, falling back to download');
    }
    // Fallback to download
    document.getElementById('btn-download').click();
  });

  document.getElementById('btn-start-over').addEventListener('click', () => {
    photoImage = null;
    logoImg = null;
    selectedSite = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    showScreen(siteListScreen);
  });

  // ── Back buttons ──
  document.getElementById('btn-back-to-sites').addEventListener('click', () => {
    showScreen(siteListScreen);
  });

  // ── Init ──
  showScreen(siteListScreen);
  loadSites();
})();
