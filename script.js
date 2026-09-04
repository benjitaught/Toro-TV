// Countdown timer to the giveaway end date — always counts down to the
// 30th of the current (or next) month at midnight, so it auto-resets
// every month instead of ever running out.
(function () {
  var daysEl = document.getElementById('cd-days');
  var hoursEl = document.getElementById('cd-hours');
  var minsEl = document.getElementById('cd-mins');
  var secsEl = document.getElementById('cd-secs');

  if (!daysEl) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  // Returns the 30th of the given month/year at midnight. Falls back to
  // the last day of the month for months with fewer than 30 days (Feb).
  function thirtiethOf(year, month) {
    var d = new Date(year, month, 30, 0, 0, 0);
    if (d.getMonth() !== ((month % 12) + 12) % 12) {
      // Overflowed into the next month (short month) — use last day instead.
      d = new Date(year, month + 1, 0, 0, 0, 0);
    }
    return d;
  }

  function getNextEndDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth();
    var candidate = thirtiethOf(year, month);
    if (candidate <= now) {
      var nextMonth = month + 1;
      var nextYear = year;
      if (nextMonth > 11) { nextMonth = 0; nextYear++; }
      candidate = thirtiethOf(nextYear, nextMonth);
    }
    return candidate;
  }

  function tick() {
    var now = new Date();
    var endDate = getNextEndDate(now);
    var diff = endDate - now;

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
