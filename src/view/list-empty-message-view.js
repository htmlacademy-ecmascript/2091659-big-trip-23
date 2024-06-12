import AbstractView from '../framework/view/abstract-view.js';
import { emptyMessageTextType } from '../const';

const createListEmptyMessageTemplate = (filterType) => {
  const currentPageMessageTextTipe = emptyMessageTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${currentPageMessageTextTipe}
    </p>`
  );
};

export default class ListEmptyMessageView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyMessageTemplate(this.#filterType);
  }
}
