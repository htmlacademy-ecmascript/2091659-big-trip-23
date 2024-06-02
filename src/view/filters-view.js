import AbstractView from '../framework/view/abstract-view';
import {firstLetterUpperCase} from '../utils/utils.js';

function createFilterItemTemplate(filter, isChecked) {
  const {type, count} = filter;
  return (`
    <div class="trip-filters__filter">
        <input
        id="filter-${type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${isChecked ? 'checked' : ''}
        ${count === 0 ? 'disables' : ''}
        />
        <label class="trip-filters__filter-label" for="filter-${type}">${firstLetterUpperCase(type)}</label>
    </div>
  `);
}

function createFiltersListTemplate(filtersItems) {
  const filtersListTemplate = filtersItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');
  return (`
    <form class="trip-filters" action="#" method="get">
      ${filtersListTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
}

/**
 * создание фильров
 * @returns {string} разметка фильров
 */

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersListTemplate(this.#filters);
  }
}
