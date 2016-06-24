'use babel';

export default class WritesimulatorView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('writesimulator');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'Select file: ';
    message.classList.add('message');
    this.element.appendChild(message);

    this.fileSelector  = document.createElement("input");
    this.fileSelector.type="file";

    message.appendChild(this.fileSelector);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
