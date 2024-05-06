import {createElement} from '../render.js';

/**
 *создание списка для точек маршрута
 * @returns {string} разметку списка
 */

function createAddEventListTemplate() {
  return (
    `
    <ul class="trip-events__list"></ul>
    `
  );
}

export default class AddEventList {
  getTemplate() {
    return createAddEventListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
