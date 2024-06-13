import AbstractView from '../framework/view/abstract-view.js';
import {DateFormat, CSSClass} from '../const.js';
import {calculateTripDuration, humanizeDate} from '../utils/utils.js';

/**
 *
 * @param {*} offers
 * @param {*} offersData
 * @returns {string}  разметка
 */
const createSelectedOffersItemTemplate = ({ title, price }) => `
  <li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>
`;

const createSelectedOffersTemplate = (offers) => {
  if (offers.length === 0) {
    return '';
  }
  const offersTemplate = offers
    .map(createSelectedOffersItemTemplate
    )
    .join('');

  return `
    <ul class="event__selected-offers">
      ${offersTemplate}
    </ul>
  `;
};


/**
 * создание элемента списка точка маршрута
 * @returns {string} разметка точки маршрута
 */
function createWayPointTemplate(points, destinationsData, offers) {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, type } = points;
  const destinationObject = destinationsData.find((dest) => dest.id === destination);
  const favoriteClasses = [CSSClass.FAVORITE];
  if (isFavorite) {
    favoriteClasses.push(CSSClass.FAVORITE_ACTIVE);
  }
  const startDateInForm = humanizeDate(dateFrom, DateFormat.DATE_IN_FORM);
  const endDateInForm = humanizeDate(dateTo, DateFormat.DATE_IN_FORM);
  const startDateFull = humanizeDate(dateFrom, DateFormat.FULL);
  const startDateShort = humanizeDate(dateFrom, DateFormat.DATE);
  const startTime = humanizeDate(dateFrom, DateFormat.TIME);
  const endTime = humanizeDate(dateTo, DateFormat.TIME);
  const selectedOffersTemplate = createSelectedOffersTemplate(offers);
  const duration = calculateTripDuration(dateFrom,dateTo);
  return (
    `
    <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${startDateFull}">${startDateShort}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destinationObject?.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startDateInForm}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${endDateInForm}">${endTime}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${selectedOffersTemplate}
      <button class="${ favoriteClasses.join(' ')}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
`);
}

export default class WayPointView extends AbstractView {
  #point = null;
  #destinationsData = null;
  #offersData = null;
  #handleEventClick = null;
  #favoriteClickCb;
  constructor({point, destinationsData, offersData, onEditClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#destinationsData = destinationsData;
    this.#offersData = offersData;
    this.#handleEventClick = onEditClick;
    this.#favoriteClickCb = onFavoriteClick;
    this.#setUpListeneres();
  }

  get template() {
    return createWayPointTemplate(this.#point, this.#destinationsData, this.#offersData);
  }

  #setUpListeneres() {
    this.element.querySelector(`.${CSSClass.FAVORITE}`).addEventListener('click', this.#handleFavoriteClick);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEventClick();
  };

  #handleFavoriteClick = (evt) => {
    evt.preventDefault();
    const button = evt.currentTarget;
    button.classList.toggle(CSSClass.FAVORITE_ACTIVE);
    this.#favoriteClickCb();
  };
}
