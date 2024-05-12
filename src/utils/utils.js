/**
 * Функция получения случайного элемента из массива
 * @param {*} массив
 * @returns элемент массива
 */
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export {getRandomArrayElement};
