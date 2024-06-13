import SortingView from '../view/sorting-view.js';
import AddEventListView from '../view/add-events-list-view.js';
import ListEmptyMessageView from '../view/list-empty-message-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {render, remove} from '../framework/render.js';
import { updateItem, sortPointDay, sortPointTime, sortPointPrice } from '../utils/utils.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { filter } from '../utils/filter.js';


export default class MainPresenter {
  #container = null;
  #pointsModel = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #filterModel = null;

  #destinations = [];
  #offers = [];

  #sortView = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #eventsList = new AddEventListView();
  #noPointsView = null;

  constructor({container, pointsModel, filterModel, onNewPointDestroy}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#eventsList.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      destinationsData: this.#destinations,
      offersData: this.#offers,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointDay);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
    }
    return filteredPoints;
  }

  init(){
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];
    this.#renderMain();
  }

  #renderSort() {
    this.#sortView = new SortingView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortView, this.#container);
  }

  #renderPoints(points){
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints(){
    this.#noPointsView = new ListEmptyMessageView({
      filterType: this.#filterType,
    });
    render(this.#noPointsView, this.#eventsList.element);
  }

  #renderPointList() {
    render(this.#eventsList, this.#container);
    this.#renderPoints(this.points);
  }

  #renderMain(){
    render(this.#eventsList, this.#container);

    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointList(this.points);
  }


  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsList,
      destinationsData: this.#destinations,
      offersData: this.#offers,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handlePointChange = (updatedPoint) => {
    this.points = updateItem(this.points, updatedPoint);
    this.sourcedPoints = updateItem(this.sourcedPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType){
      return;
    }
    this.#currentSortType = sortType;
    this.#clearList({ resetRenderedTaskCount: true });
    this.#renderMain();
  };

  #clearList({ resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();
    remove(this.#sortView);
    remove(this.#noPointsView);
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderMain();
        break;
      case UpdateType.MAJOR:
        this.#clearList({
          resetSortType: true,
        });
        this.#renderMain();
        break;
    }
  };
}
