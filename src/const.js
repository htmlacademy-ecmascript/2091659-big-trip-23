const DateFormat = {
  DATE_IN_FORM: 'DD/MM/YY HH:mm',
  FULL: 'YYYY-MM-DD',
  DATE: 'MMM DD',
  TIME: 'HH:mm',
  MINUTES: 'mm[M]',
  HOURS_MINUTES: 'HH[H] mm[M]',
  DAYS_HOURS_MINUTES: 'DD[D] HH[H] mm[M]',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const Timing = {
  MSEC_IN_SEC: 1000,
  SEC_IN_MIN: 60,
  MIN_IN_HOUR: 60,
  HOUR_IN_DAY: 24,
};

const EventTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const MSEC_IN_HOUR = Timing.MIN_IN_HOUR * Timing.SEC_IN_MIN * Timing.MSEC_IN_SEC;
const MSEC_IN_DAY = Timing.HOUR_IN_DAY * MSEC_IN_HOUR;

const Mode = Object.freeze({
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
});

const CSSClass = {
  FAVORITE: 'event__favorite-btn',
  FAVORITE_ACTIVE: 'event__favorite-btn--active',
};

export { DateFormat, FilterType, MSEC_IN_HOUR ,MSEC_IN_DAY, Mode, SortType, CSSClass, EventTypes };
