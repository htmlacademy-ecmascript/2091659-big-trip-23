import {render} from './framework/render.js';
import Filters from './view/filters-view.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/mock-filter.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteSortingElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
pointsModel.init();

const filters = generateFilter(pointsModel.points);

const presenter = new MainPresenter({container: siteSortingElement, pointsModel: pointsModel});
render(new Filters({filters}), siteFilterElement);

presenter.init();
