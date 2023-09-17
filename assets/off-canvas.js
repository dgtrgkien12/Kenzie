// Offscreen panels
class OffPanel extends HTMLElement {
  constructor() {
    super();

    this.isOpen = false;
    this.close = this.close.bind(this);

    document.body.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.isOpen && this.close());
    this.querySelector('.offpanel__backdrop').addEventListener('click', this.close );
  }

  open() {
    this.isOpen = true;
    this.classList.add('open');

    let scrollBarWidth = window.innerWidth - document.documentElement.offsetWidth;

    document.body.style.paddingRight = scrollBarWidth + 'px';

    const openEvent = new CustomEvent('offpanel_opened', {detail: {panel: this}});
    document.body.dispatchEvent(openEvent);
    document.body.classList.add('offpanel-opened');
  }

  close() {
    this.isOpen = false;
    this.classList.add('hidding');
    this.classList.remove('open');

    setTimeout(() => {
      this.classList.remove('hidding');

      document.body.style.removeProperty('padding-right');

      const closeEvent = new CustomEvent('offpanel_closed', {detail: {panel: this}});
      document.body.dispatchEvent(closeEvent);
      document.body.classList.remove('offpanel-opened');
  }, 500);
  }
}

customElements.define('off-panel', OffPanel);

document.querySelectorAll('[data-toggle="offpanel"]').forEach(el => {
  el.addEventListener('click', event => {
    event.preventDefault();


    let panelId = el.getAttribute( 'data-target' );
    let panel = document.getElementById(panelId);

    if (!panel) {
      return;
    }

    if ( panel.isOpen ) {
      panel.close();
    } else {
      panel.open();
    }
  });
});
