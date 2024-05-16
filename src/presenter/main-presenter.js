import AddEventsList from '../view/add-events-list.js';
import EditForm from '../view/edit-form.js';
import WayPoint from '../view/way-point.js';
import Sorting from '../view/sorting.js';
import {render} from '../framework/render.js';


export default class MainPresenter {
  Sorting = new Sorting();
  EventsList = new AddEventsList();

  constructor({container, pointsModel}) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.destinationsData = [...this.pointsModel.getDestinations()];
    this.offersData = [...this.pointsModel.getOffers()];
    render (this.Sorting, this.container);
    render(this.EventsList, this.container);
    render(new EditForm(), this.EventsList.element);

    for (let i = 0; i < this.points.length; i++) {
      render(new WayPoint({points:this.points[i], destinationsData:this.destinationsData, offersData:this.offers}), this.EventsList.element);
    }
  }
}
