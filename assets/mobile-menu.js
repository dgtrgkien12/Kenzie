function slideUp (target, duration=500, easing='ease') {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.transitionTimingFunction = easing;
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;

  setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    target.style.removeProperty('transition-timing-function');
  }, duration);
}

function slideDown(target, duration=500, easing='ease') {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none')
    display = 'block';

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.transitionTimingFunction = easing;
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');

  setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    target.style.removeProperty('transition-timing-function');
  }, duration);
}

function slideToggle(target, duration = 1000) {
  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
}

// Collapsible menu buttons
document.querySelectorAll('.menu-collapsible__toggle').forEach(el => {
  el.addEventListener('click', (event) => {
    event.preventDefault();

    const submenu = el.closest('li').querySelector(':scope > ul')
    const style = window.getComputedStyle(submenu);
    let duration = parseFloat(style.getPropertyValue('transition-duration')) * 1000;
    let timing = style.getPropertyPriority('transition-timing-function');

    duration = duration ? duration : 1000;
    timing = timing ? timing.toString() : 'ease'

    if (el.classList.contains('active')) {
      el.classList.remove('active');
      submenu.setAttribute('aria-hidden', 'true');
      submenu.setAttribute('aria-expanded', 'false');

      slideUp(submenu, duration, timing);
    } else {
      el.classList.add('active');
      submenu.setAttribute('aria-hidden', 'false');
      submenu.setAttribute('aria-expanded', 'true');

      slideDown(submenu, duration, timing);
    }
  });
});