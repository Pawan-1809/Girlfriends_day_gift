// --- Girlfriend's Day Interactive JS ---
document.addEventListener('DOMContentLoaded', function () {
  // Ensure video background is loaded and playing with full opacity
  const bgVideo = document.getElementById('bg-video');
  if (bgVideo) {
    // Set full opacity
    bgVideo.style.opacity = '1';
    // Remove any filters
    bgVideo.style.filter = 'none';
    // Play the video
    bgVideo.play().catch(error => {
      console.log('Video autoplay was prevented:', error);
      // Add a play button or other fallback if needed
    });
  }
  // Use body class to control background visibility
  function setHomePageClass(isHome) {
    document.body.classList.toggle('home-page', isHome);
  }
  // Initial state: home page
  setHomePageClass(true);
  // When Begin Our Journey is pressed, remove home-page class after scroll
  document.querySelectorAll('.scroll-next[data-target="#page-grids"]').forEach(btn => {
    btn.addEventListener('click', function () {
      setTimeout(function() {
        setHomePageClass(false);
      }, 400); // after scroll
    });
  });
  // Smooth scroll to next section
  document.querySelectorAll('.scroll-next').forEach(btn => {
    btn.addEventListener('click', function () {
      const target = document.querySelector(this.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // Heart drawing animation background for all pages - disabled for full video visibility
  function drawHeart(ctx, t, cx, cy, size, color) {
    // Function kept for compatibility but not drawing anything
    return;
    
    // Original code below (disabled)
    /*
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(size, size);
    ctx.beginPath();
    for (let a = 0; a <= Math.PI * 2; a += 0.02) {
      let x = 16 * Math.pow(Math.sin(a), 3);
      let y = -13 * Math.cos(a) + 5 * Math.cos(2 * a) + 2 * Math.cos(3 * a) + Math.cos(4 * a);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.globalAlpha = 0.012 + 0.005 * Math.sin(t/1200); // ultra subtle
    ctx.shadowColor = color;
    ctx.shadowBlur = 1; // minimal blur
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
    */
  }
  function animateHearts() {
    // Disabled for full video visibility
    return;
    
    // Original code below (disabled)
    document.querySelectorAll('.bg-heart-canvas').forEach(canvas => {
      // Only show on non-home pages
      if (canvas.closest('.home-section')) {
        canvas.style.display = 'none';
        return;
      } else {
        canvas.style.display = '';
      }
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Heart beats: scale from 0.5 to 1.0 every 1.2s (slower, smooth)
      const t = Date.now();
      const beat = 0.5 + 0.5 * (0.5 + 0.5 * Math.sin((t % 1200) / 1200 * 2 * Math.PI));
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawHeart(ctx, t, w/2, h/2, (Math.min(w, h)/32) * beat, '#c1121f');
    });
    requestAnimationFrame(animateHearts);
  }
  function resizeHeartCanvases() {
    document.querySelectorAll('.bg-heart-canvas').forEach(canvas => {
      canvas.style.position = 'fixed';
      canvas.style.top = 0;
      canvas.style.left = 0;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = 0;
    });
  }
  resizeHeartCanvases();
  animateHearts();
  window.addEventListener('resize', resizeHeartCanvases);
});
