class LocalizationForm extends HTMLElement {
  constructor() {
    super();
    this.elements = {
      input: this.querySelector('input[name="locale_code"], input[name="country_code"]'),
      button: this.querySelector('button'),
      panel: this.querySelector('.localization__list'),
    };
    this.elements.button.addEventListener('click', this.toggleSelector.bind(this));
    this.elements.button.addEventListener('focusout', this.closeSelector.bind(this));
    this.addEventListener('keyup', this.onContainerKeyUp.bind(this));

    this.querySelectorAll('a').forEach(item => item.addEventListener('click', this.onItemClick.bind(this)));
  }

  hidePanel() {
    this.elements.button.setAttribute('aria-expanded', 'false');
    this.elements.panel.classList.remove('active');
  }

  onContainerKeyUp(event) {
    if (event.code.toUpperCase() !== 'ESCAPE') return;

    this.hidePanel();
    this.elements.button.focus();
  }

  onItemClick(event) {
    event.preventDefault();

    if ( event.currentTarget.getAttribute('aria-current') ) {
      this.hidePanel();
      return;
    }

    const form = this.querySelector('form');
    this.elements.input.value = event.currentTarget.dataset.value;
    this.elements.button.querySelector('.button__text').innerText = event.currentTarget.innerText;
    if (form) {
      form.submit();
    }
    this.hidePanel();
  }

  toggleSelector() {
    if (this.elements.button.getAttribute('aria-expanded') === 'true') {
      this.hidePanel();
    } else {
      this.openSelector();
    }
  }

  openSelector() {
    this.elements.button.focus();
    this.elements.panel.classList.add('active');
    this.elements.button.setAttribute('aria-expanded', (this.elements.button.getAttribute('aria-expanded') === 'false').toString());
  }

  closeSelector(event) {
    const isInside = event.relatedTarget && event.relatedTarget.closest( 'localization-form' ) ? event.relatedTarget.closest( 'localization-form' ).isEqualNode(this) : false;
    const shouldClose = event.relatedTarget && event.relatedTarget.nodeName === 'BUTTON';
    if (event.relatedTarget === null || shouldClose || ! isInside) {
      this.hidePanel();
    }
  }
}

customElements.define('localization-form', LocalizationForm);