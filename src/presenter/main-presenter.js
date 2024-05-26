import AddEventsList from '../view/add-events-list-view.js';
import EditForm from '../view/edit-form-view.js';
import WayPoint from '../view/way-point-view.js';
import Sorting from '../view/sorting-view.js';
import {render, replace} from '../framework/render.js';


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

    //this.#renderEditForm({points:this.#points, destinationsData:this.#destinationsData, offersData:this.#offersData});

    for (const point of this.#points) {
      this.#renderPoint({point, destinationsData:this.#destinationsData});
    }
  }

  #prepareOffersToShow(point) {
    const offers = this.#pointsModel.getOffersByType(point.type);
    const idx = new Set(point.offers);
    return offers.filter((offer)=>idx.has(offer.id));
  }

  #renderPoint ({point, destinationsData}) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const onEditClick = () => replacePointToForm();
    const onFormSubmit = () => replaceFormToPoint();
    const onFormCancel = () => replaceFormToPoint();

    const pointComponent = new WayPoint({point, destinationsData, offersData: this.#prepareOffersToShow(point), onEditClick: onEditClick,});
    const formComponent = new EditForm({point, destinationsData, offersData: this.#offersData, onFormSubmit: onFormSubmit, onFormCancel: onFormCancel,});

    function replacePointToForm() {
      replace(formComponent, pointComponent);
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function replaceFormToPoint() {
      replace(pointComponent, formComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(pointComponent, this.#eventsList.element);
  }

  #renderEditForm ({points, destinationsData, offersData}) {
    const formComponent = new EditForm({points, destinationsData, offersData});

    render(formComponent, this.#eventsList.element);
  }
}
