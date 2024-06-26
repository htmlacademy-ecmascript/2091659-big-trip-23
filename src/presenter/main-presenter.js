import SortingView from '../view/sorting-view.js';
import AddEventListView from '../view/add-events-list-view.js';
import ListEmptyMessageView from '../view/list-empty-message-view.js';
import PointPresenter from './point-presenter.js';
import {render} from '../framework/render.js';
import { updateItem, sortPointDay, sortPointTime, sortPointPrice } from '../utils/utils.js';
import { SortType } from '../const.js';


export default class MainPresenter {
  #container = null;
  #pointsModel = null;
  #pointPresenters = new Map();
  #sourcedPoints = [];

  #sortView = null;
  #currentSortType = SortType.DAY;
  #eventsList = new AddEventListView();
  #noPointMessage = new ListEmptyMessageView();

  #points = [];
  #destinationsData = [];
  #offersData = [];

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init(){
    this.#points = [...this.#pointsModel.points];
    this.#sourcedPoints = [...this.#pointsModel.points];

    this.#destinationsData = [...this.#pointsModel.destinations];
    this.#offersData = [...this.#pointsModel.offers];
    this.#renderMain();
  }


  #renderSort() {
    this.#sortView = new SortingView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortView, this.#container);
  }

  #renderPoints(from, to){
    this.#points.slice(from,to).forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints(){
    render(this.#noPointMessage, this.#eventsList.element);
  }

  #renderPointList() {
    render(this.#eventsList, this.#container);
    this.#renderPoints(0,this.#points.length);
  }

  #renderMain(){

    if (this.#points.length === 0){
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointList();

  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsList,
      destinationsData: this.#destinationsData,
      offersData: this.#offersData,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortPointDay);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPointPrice);
        break;
      case SortType.TIME:
        this.#points.sort(sortPointTime);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType){
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  };

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

}
