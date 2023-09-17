// Modal
class SoberModal extends HTMLElement {
  constructor() {
    super();

    this.isOpen = false;
    this.close = this.close.bind(this);

    document.body.addEventListener('keydown', (evt) => evt.code === 'Escape' && this.isOpen && this.close() );
    this.querySelector('.button-close-modal').addEventListener('click', this.close);
  }

  open() {
    this.isOpen = true;
    this.classList.add('open');

    let scrollBarWidth = window.innerWidth - document.documentElement.offsetWidth;

    document.body.style.paddingRight = scrollBarWidth + 'px';

    const openEvent = new CustomEvent('open', {detail: {panel: this}});
    document.body.dispatchEvent(openEvent);
    document.body.classList.add('modal-open');
  }

  close() {
    this.isOpen = false;
    this.classList.remove('open');

    document.body.style.removeProperty('padding-right');

    const closeEvent = new CustomEvent('close', {detail: {panel: this}});
    document.body.dispatchEvent(closeEvent);
    document.body.classList.remove('modal-open');
  }
}

customElements.define('sober-modal', SoberModal);

document.querySelectorAll('[data-toggle="modal"]').forEach(el => {
  el.addEventListener('click', event => {
    event.preventDefault();

    let modalId = el.getAttribute( 'data-target' );
    let modal = document.getElementById(modalId);

    if (!modal) {
      return;
    }

    if ( modal.isOpen ) {
      modal.close();
    } else {
      modal.open();
    }
  });
});