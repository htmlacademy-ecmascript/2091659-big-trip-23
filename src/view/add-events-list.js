import AbstractView from '../framework/view/abstract-view';

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

export default class AddEventList extends AbstractView {
  get template() {
    return createAddEventListTemplate();
  }
}
