import Filters from './view/filters.js';
import Sorting from './view/sorting.js';
import MainPresenter from './presenter/main-presenter.js';
import {render} from './render.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteSortingElement = document.querySelector('.trip-events');
const presenter = new MainPresenter({container: siteSortingElement});


render(new Filters(), siteFilterElement);
render(new Sorting(), siteSortingElement);

presenter.init();
