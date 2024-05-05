import AddEventsList from '../view/add-events-list.js';
import EditForm from '../view/edit-form.js';
import WayPoint from '../view/way-point.js';
import {render} from '../render.js';


export default class MainPresenter {
  EventsList = new AddEventsList();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.EventsList, this.container);
    render(new EditForm(), this.EventsList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WayPoint(), this.EventsList.getElement());
    }
  }
}
