import AbstractView from '../framework/view/abstract-view.js';

function createListEmptyMessageTemplate() {
  return (`
  <p class="trip-events__msg">Click New Event to create your first point</p>
  `);
}

export default class ListEmptyMessageView extends AbstractView {
  get template() {
    return createListEmptyMessageTemplate();
  }
}
