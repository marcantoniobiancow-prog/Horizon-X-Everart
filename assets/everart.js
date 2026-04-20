/* ============================================================
   EVERART STUDIO — Theme JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── ACCORDION ── */
  document.querySelectorAll('.acc-h').forEach(function (header) {
    header.addEventListener('click', function () {
      var item = header.closest('.acc-item');
      var body = item.querySelector('.acc-b');
      var arrow = header.querySelector('.acc-arrow');
      var isOpen = body.classList.contains('open');

      // Close all in same accordion
      var accordion = item.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.acc-b.open').forEach(function (b) {
          b.classList.remove('open');
        });
        accordion.querySelectorAll('.acc-arrow.open').forEach(function (a) {
          a.classList.remove('open');
        });
      }

      if (!isOpen) {
        body.classList.add('open');
        if (arrow) arrow.classList.add('open');
      }
    });
  });

  /* ── GALLERY THUMBS ── */
  document.querySelectorAll('.gallery-thumb').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var gallery = thumb.closest('.prod-gallery');
      if (!gallery) return;

      // Update selection
      gallery.querySelectorAll('.gallery-thumb').forEach(function (t) {
        t.classList.remove('sel');
      });
      thumb.classList.add('sel');

      // Swap main image src
      var mainImg = gallery.querySelector('.gallery-main img');
      var thumbImg = thumb.querySelector('img');
      if (mainImg && thumbImg) {
        mainImg.src = thumbImg.src;
      }
    });
  });

  /* ── STICKY ATC ── */
  var stickyCta = document.querySelector('.sticky-cta');
  var atcBtn = document.querySelector('.atc-btn');
  if (stickyCta && atcBtn) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          stickyCta.classList.remove('vis');
        } else {
          stickyCta.classList.add('vis');
        }
      });
    }, { threshold: 0 });
    observer.observe(atcBtn);
  }

  /* ── EDITION BAR ANIMATION ── */
  var edFill = document.querySelector('.ed-fill');
  if (edFill) {
    var targetWidth = edFill.getAttribute('data-fill') || edFill.style.width || '46%';
    edFill.style.width = '0%';
    setTimeout(function () {
      edFill.style.width = targetWidth;
    }, 400);
  }

  /* ── PAY OPT SELECTION ── */
  document.querySelectorAll('.pay-opt').forEach(function (opt) {
    opt.addEventListener('click', function () {
      var container = opt.closest('.pay-opts');
      if (!container) return;
      container.querySelectorAll('.pay-opt').forEach(function (o) {
        o.classList.remove('sel');
      });
      opt.classList.add('sel');
    });
  });

  /* ── CART QTY BUTTONS ── */
  document.querySelectorAll('.cart-qty').forEach(function (qty) {
    var minus = qty.querySelector('[data-action="minus"]');
    var plus = qty.querySelector('[data-action="plus"]');
    var input = qty.querySelector('input');
    if (!input) return;

    if (minus) {
      minus.addEventListener('click', function () {
        var val = parseInt(input.value, 10);
        if (val > 1) input.value = val - 1;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
    if (plus) {
      plus.addEventListener('click', function () {
        var val = parseInt(input.value, 10);
        input.value = val + 1;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
  });

  /* ── FP CAROUSEL ── */
  document.querySelectorAll('.fp-track[data-fp-id]').forEach(function (track) {
    var id = track.getAttribute('data-fp-id');
    var controls = document.querySelector('.fp-controls[data-fp-id="' + id + '"]');
    if (!controls) return;

    var prevBtn = controls.querySelector('.fp-prev');
    var nextBtn = controls.querySelector('.fp-next');
    var curEl   = controls.querySelector('.fp-cur');
    var totEl   = controls.querySelector('.fp-tot');
    var cards   = track.querySelectorAll('.fp-card');
    var total   = cards.length;
    var current = 0;

    function perPage() { return window.innerWidth >= 768 ? 3 : 1; }
    function pages()   { return Math.max(1, Math.ceil(total / perPage())); }
    function pad(n)    { return n < 10 ? '0' + n : '' + n; }

    function go(n) {
      current = Math.max(0, Math.min(n, pages() - 1));
      var cardW = cards[0].offsetWidth;
      track.style.transform = 'translateX(-' + (current * perPage() * cardW) + 'px)';
      if (prevBtn) prevBtn.disabled = current === 0;
      if (nextBtn) nextBtn.disabled = current >= pages() - 1;
      if (curEl)   curEl.textContent = pad(current + 1);
      if (totEl)   totEl.textContent = pad(pages());
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { go(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(current + 1); });

    /* touch swipe */
    var touchX = 0;
    track.addEventListener('touchstart', function (e) {
      touchX = e.changedTouches[0].screenX;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].screenX - touchX;
      if (Math.abs(dx) > 48) go(dx < 0 ? current + 1 : current - 1);
    }, { passive: true });

    window.addEventListener('resize', function () { go(0); });
    go(0);
  });

});
