import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {firstLetterUpperCase, humanizeDate} from '../utils/utils.js';
import {DateFormat, EventTypes} from '../const.js';
/**
 * редактирование имеющеся точки маршрута
 * @returns {string} разметка формы
 */
//points, destinationsData, offersData
function createEditFormTemplate(point, offerData, destinationData) {
  const {basePrice, dateFrom, dateTo, type} = point;
  const typeOffers = offerData.find((elem) => elem.type === point.type).offers;
  const selectedOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const destinationPoint = destinationData.find((elem) => elem.id === point.destination) || {};
  const {name = '', description = '', pictures = []} = destinationPoint;
  const eventId = point.id || 0;

  const createOffersData = (title, price, id, state) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}-${id}" ${state}">
      <label class="event__offer-label" for="event-offer-${type}-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;

  const createOffersContainer = () =>
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offer</h3>
      <div class="event__available-offers">
      ${typeOffers.map((offer) => selectedOffers.find((elem) => elem.id === offer.id) ? createOffersData(offer.title, offer.price, offer.id, 'checked') : createOffersData(offer.title, offer.price, offer.id, '')).join('')}
      </div>
    </section>`;

  const createPhotosData = (photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;

  const createDescriptionContainer = () =>
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${pictures.map((photo) => createPhotosData(photo)).join('')}
        </div>
      </div>
    </section>`;

  const createEventDestinationList = (destination) =>
    `<option value="${destination}"></option>`;

  const createEventTypeList = (lowerCaseType, upperCaseType, state) =>
    `<div class="event__type-item">
      <input id="event-type-${lowerCaseType}-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerCaseType}" ${state}>
      <label class="event__type-label  event__type-label--${lowerCaseType}" for="event-type-${lowerCaseType}-${eventId}">${upperCaseType}</label>
    </div>`;
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${eventId}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${eventId}" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${EventTypes.map((elem) => elem === type ? createEventTypeList(elem, firstLetterUpperCase(elem), 'checked') : createEventTypeList(elem, firstLetterUpperCase(elem))).join('')}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${eventId}">${type}</label>
            <input class="event__input  event__input--destination" id="event-destination-${eventId}" type="text" name="event-destination" value="${name}" list="destination-list-${eventId}">
            <datalist id="destination-list-${eventId}">
              ${destinationData.map((destination) => createEventDestinationList(destination.name))}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${eventId}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${eventId}" type="text" name="event-start-time" value="${humanizeDate(dateFrom, DateFormat.DATE_IN_FORM)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${eventId}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${eventId}" type="text" name="event-end-time" value="${humanizeDate(dateTo, DateFormat.DATE_IN_FORM)}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${eventId}"><span class="visually-hidden">Price</span>&euro;</label>
            <input class="event__input  event__input--price" id="event-price-${eventId}" type="text" name="event-price" value="${basePrice}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        ${typeOffers.length !== 0 || description ? `<section class="event__details">
            ${typeOffers ? createOffersContainer() : ''}
            ${description ? createDescriptionContainer() : ''}
          </section>` : ''}
      </form>
    </li>`
  );
}

export default class EditFormView extends AbstractStatefulView {
  #point = null;
  #destinationsData = null;
  #offersData = null;
  #handleFormSubmit = null;
  #handleCloseEditFormButton = null;

  constructor({point, destinationsData, offersData, onFormSubmit, onFormClick}) {
    super();
    this._setState(EditFormView.parsePointToState(point));
    this.#point = point;
    this.#destinationsData = destinationsData;
    this.#offersData = offersData;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseEditFormButton = onFormClick;
    this._restoreHandlers();

  }

  get template() {
    return createEditFormTemplate(this._state, this.#offersData, this.#destinationsData);
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeEditFormButtonHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const currentDestination = this.#destinationsData.find((elem) => elem.id === this._state.destination);
    const checkedDestination = this.#destinationsData.find((elem) => elem.name === evt.target.value);
    if(!checkedDestination) {
      return;
    } if(checkedDestination) {
      this.updateElement({
        destination: checkedDestination.id,
      });
    } else {
      this.updateElement({
        destination: currentDestination.id,
      });
    }
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offersData: [],
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStatetoPoint(this._state));
  };

  #closeEditFormButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseEditFormButton();
  };

  reset(point) {
    this.updateElement(EditFormView.parsePointToState(point));
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }
}
