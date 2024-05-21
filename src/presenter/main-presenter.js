import AddEventsList from '../view/add-events-list.js';
import EditForm from '../view/edit-form.js';
import WayPoint from '../view/way-point.js';
import Sorting from '../view/sorting.js';
import {render} from '../framework/render.js';


export default class MainPresenter {
  #container;
  #pointsModel;
  #sorting = new Sorting();
  #eventsList = new AddEventsList();
  #points = [];
  #destinationsData = [];
  #offersData = [];

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinationsData = [...this.#pointsModel.destinations];
    this.#offersData = [...this.#pointsModel.offers];
    render (this.#sorting, this.#container);
    render(this.#eventsList, this.#container);

    this.#renderEditForm({points:this.#points, destinationsData:this.#destinationsData, offersData:this.#offersData});

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint({points:this.#points[i], destinationsData:this.#destinationsData, offersData:this.#offersData});
    }
  }

  #renderPoint ({points, destinationsData, offersData}) {
    const pointComponent = new WayPoint({points, destinationsData, offersData});

    render(pointComponent, this.#eventsList.element);
  }

  #renderEditForm ({points, destinationsData, offersData}) {
    const formComponent = new EditForm({points, destinationsData, offersData});

    render(formComponent, this.#eventsList.element);
  }
}
