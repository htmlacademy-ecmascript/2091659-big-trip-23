import dayjs from 'dayjs';
import { DateFormat } from '../const.js';
/**
 * Функция получения случайного элемента из массива
 * @param {*} массив
 * @returns элемент массива
 */
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const humanizeDate = (date, dateFormat) => date ? dayjs(date).format(dateFormat) : '';

const formatFullDate = (inputDate) => //задаем дату в полном формате
  inputDate ? dayjs(inputDate).format(DateFormat.FULL) : '';

const formatShortDate = (inputDate) => //задаем месяцы
  inputDate ? dayjs(inputDate).format(DateFormat.DATE) : '';

const formatTime = (inputDate) => // задаем часы/минуты
  inputDate ? dayjs(inputDate).format(DateFormat.TIME) : '';

export {getRandomArrayElement, humanizeDate, formatFullDate, formatShortDate, formatTime};
