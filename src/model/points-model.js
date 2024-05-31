import { mockPoints, mockOffers, mockDestinations } from '../mock/mock-task.js';
export default class PointsModel {
  #points;
  #offers;
  #destinations;
  constructor() {
    this.#points = [];
    this.#offers = [];
    this.#destinations = [];

  }

  init() {
    this.#points = mockPoints;
    this.#offers = mockOffers;
    this.#destinations = mockDestinations;
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

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }
}
