import { mockPoints, mockOffers, mockDestinations } from '../mock/mock-task.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = [];
  #offers = [];
  #destinations = [];
  #types = [];
  constructor() {
    super();
    this.#points = [];
    this.#offers = [];
    this.#destinations = [];
  }

  init() {
    this.#points = mockPoints;
    this.#offers = mockOffers;
    this.#destinations = mockDestinations;
    this.#types = this.#offers.map((offer) => offer.type);
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get types() {
    return this.#types;
  }

  getDestinationById(id) {
    return this.destinations.find((element) => element.id === id) || [];
  }

  getDestinationByName(name) {
    return this.destinations.find((element) => element.name === name) || [];
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers || [];
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [update, ...this.#points];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient = (point) => {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };
}
