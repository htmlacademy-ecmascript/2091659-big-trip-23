import Filters from './view/filters.js';
import Sorting from './view/sorting.js';
import EventList from './view/add-events-list.js';
import WayPoint from './view/way-point.js';
import EditForm from './view/edit-form.js';
import {render} from './render.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteSortingElement = document.querySelector('.trip-events');


render(new Filters(), siteFilterElement);
render(new Sorting(), siteSortingElement);
render(new EventList(), siteSortingElement);

const siteEventList = document.querySelector('.trip-events__list');

render(new EditForm(), siteEventList);
render(new WayPoint(), siteEventList);
render(new WayPoint(), siteEventList);
render(new WayPoint(), siteEventList);
