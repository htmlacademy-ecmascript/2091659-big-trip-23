import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import { DateFormat, MSEC_IN_HOUR ,MSEC_IN_DAY } from '../const.js';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);

/**
 * Функция получения случайного элемента из массива
 * @template El
 * @param {El[] | readonly El[]} items массив
 * @returns {El} элемент массива
 */
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}
/**
 * Функции для преобразования полученных дат в привычный формат дат.
 * @param {string | number | Date | import('dayjs').Dayjs} date получаемые данные дат
 * @param {string} dateFormat  шаблон по преобразованию формата даты
 * @returns
 */
const humanizeDate = (date, dateFormat) => date ? dayjs(date).format(dateFormat) : '';

const formatFullDate = (inputDate) => //задаем дату в полном формате
  inputDate ? dayjs(inputDate).format(DateFormat.FULL) : '';

const formatShortDate = (inputDate) => //задаем месяцы
  inputDate ? dayjs(inputDate).format(DateFormat.DATE) : '';

const formatTime = (inputDate) => // задаем часы/минуты
  inputDate ? dayjs(inputDate).format(DateFormat.TIME) : '';

const calculateTripDuration = (dateFrom, dateTo) => {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  let tripDuration = 0;

  switch (true){
    case (timeDiff >= MSEC_IN_DAY):
      tripDuration = dayjs.duration(timeDiff).format(DateFormat.DAYS_HOURS_MINUTES);
      break;
    case (timeDiff > MSEC_IN_HOUR || timeDiff < MSEC_IN_DAY):
      tripDuration = dayjs.duration(timeDiff).format(DateFormat.HOURS_MINUTES);
      break;
    case (timeDiff < MSEC_IN_HOUR):
      tripDuration = dayjs.duration(timeDiff).format(DateFormat.MINUTES);
      break;
  }

  return tripDuration;
};

const isPastDate = (date) => dayjs(date).isBefore(dayjs());

const isPresentDate = (dateFrom, dateTo) => dayjs().isBetween(dateFrom, dateTo, 'day');

const isFutureDate = (date) => dayjs(date).isAfter(dayjs());

const firstLetterUpperCase = (string) => string ? string.charAt(0).toUpperCase() + string.slice(1) : string;

function updateItem(items, update){
  return items.map((item) => item.id === update.id ? update : item);
}

/**
 * Сортировка
 * @param {C} varA
 * @param {*} varB
 * @returns
 */
function getWeightForNull(varA, varB) {
  if (varA === null && varB === null) {
    return 0;
  }

  if (varA === null) {
    return 1;
  }

  if (varB === null) {
    return -1;
  }

  return null;
}

function sortPointDay(pointA, pointB) {
  const weight = getWeightForNull(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointTime(pointA, pointB) {
  const timeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  const weight = getWeightForNull(timeA, timeB);

  return weight ?? timeB - timeA;
}

function sortPointPrice(pointA, pointB) {
  const weight = getWeightForNull(pointA.basePrice, pointB.basePrice);

  return weight ?? pointB.basePrice - pointA.basePrice;
}

export {calculateTripDuration, getRandomArrayElement, humanizeDate, formatFullDate, formatShortDate, formatTime, isPastDate, isPresentDate, isFutureDate, firstLetterUpperCase, updateItem, sortPointDay, sortPointTime, sortPointPrice};
