import { mockPoints, mockOffers, mockDestinations } from '../mock/task.js';
export default class PointsModel {
  constructor() {
    this.points = [];
    this.offers = [];
    this.destinations = [];

  }

  init() {
    this.points = mockPoints;
    this.offers = mockOffers;
    this.destinations = mockDestinations;
  }

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
