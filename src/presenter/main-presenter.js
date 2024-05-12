import AddEventsList from '../view/add-events-list.js';
import EditForm from '../view/edit-form.js';
import WayPoint from '../view/way-point.js';
import Sorting from '../view/sorting.js';
import {render} from '../render.js';


export default class MainPresenter {
  Sorting = new Sorting();
  EventsList = new AddEventsList();

  constructor({container, pointsModel}) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.pointsModel = [...this.pointsModel.getPoints()];
    render (this.Sorting, this.container);
    render(this.EventsList, this.container);
    render(new EditForm(), this.EventsList.getElement());

    for (let i = 0; i < this.pointsModel.length; i++) {
      render(new WayPoint({points:this.pointsModel[i]}), this.EventsList.getElement());
    }
  }
}
