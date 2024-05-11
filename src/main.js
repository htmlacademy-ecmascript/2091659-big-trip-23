import Filters from './view/filters.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import {render} from './render.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteSortingElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
pointsModel.init();

const presenter = new MainPresenter({container: siteSortingElement, pointsModel: pointsModel});

render(new Filters(), siteFilterElement);
presenter.init();
