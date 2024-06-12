import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteSortingElement = document.querySelector('.trip-events');
const newPointButton = document.querySelector('.trip-main__event-add-btn');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter({
  container: siteSortingElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteFilterElement,
  filterModel,
  pointsModel,
});

const newPointButtonComponent = new NewPointButtonView({
  button: newPointButton,
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonComponent.template.disabled = false;
}

function handleNewPointButtonClick() {
  mainPresenter.createPoint();
  newPointButtonComponent.template.disabled = true;
}

filterPresenter.init();
mainPresenter.init();
pointsModel.init();
