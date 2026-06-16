// Countdown timer to the giveaway end date
(function () {
  var endDate = new Date('2026-07-31T00:00:00');

  var daysEl = document.getElementById('cd-days');
  var hoursEl = document.getElementById('cd-hours');
  var minsEl = document.getElementById('cd-mins');
  var secsEl = document.getElementById('cd-secs');

  if (!daysEl) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    var now = new Date();
    var diff = endDate - now;
    if (diff <= 0) {
      daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00';
      return;
    }
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var mins = Math.floor((diff / (1000 * 60)) % 60);
    var secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();

// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Scroll-reveal animations
(function () {
  var targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(function (el) { observer.observe(el); });
})();

// Pricing monthly/yearly toggle (sign-up page)
(function () {
  var toggleWrap = document.querySelector('.plan-toggle');
  if (!toggleWrap) return;

  var buttons = toggleWrap.querySelectorAll('button');
  var cards = document.querySelectorAll('.pricing-card');

  function setPeriod(period) {
    buttons.forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.period === period);
    });
    cards.forEach(function (card) {
      var price = card.dataset['price' + (period === 'yearly' ? 'Yearly' : 'Monthly')];
      var save = card.dataset['save' + (period === 'yearly' ? 'Yearly' : 'Monthly')] || '';
      var link = card.dataset['link' + (period === 'yearly' ? 'Yearly' : 'Monthly')];
      var label = card.dataset['label' + (period === 'yearly' ? 'Yearly' : 'Monthly')];

      card.querySelector('.pricing-price').textContent = price;
      card.querySelector('.pricing-period').textContent = period === 'yearly' ? '/year' : '/month';
      card.querySelector('.pricing-save').textContent = save;

      var btn = card.querySelector('.pricing-btn');
      if (btn && link) btn.setAttribute('href', link);
      if (btn && label) btn.textContent = label;
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setPeriod(b.dataset.period); });
  });

  setPeriod('monthly');
})();

// Formspree-backed forms (contact + subscribe) — AJAX submit, no page leave
(function () {
  var forms = document.querySelectorAll('.js-form');
  if (!forms.length) return;

  forms.forEach(function (form) {
    var status = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }
      if (status) {
        status.textContent = '';
        status.classList.remove('form-status-error', 'form-status-success');
      }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            if (status) {
              status.textContent = form.dataset.success || 'Thanks — submitted!';
              status.classList.add('form-status-success');
            }
            form.reset();
          } else {
            if (status) {
              status.textContent = 'Something went wrong. Please try again or email us directly.';
              status.classList.add('form-status-error');
            }
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = 'Something went wrong. Please try again or email us directly.';
            status.classList.add('form-status-error');
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
        });
    });
  });
})();
