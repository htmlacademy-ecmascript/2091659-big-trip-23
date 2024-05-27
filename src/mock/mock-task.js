/**
 * @type {Array<Point>} mockPoints - массив точек маршрута состоит из объектов точек маршрута
 * @typedef {Object} Point -точка маршрута
 * @property {string} id - id точки маршрута
 * @property {number} basePrice - цена предложенного маршрута
 * @property {string} dateFrom - дата начала тура
 * @property {string} dateTo - дата завершения тура
 * @property {string} destination - ключ (id) для получения точки назначения из массива mockDestinations
 * @property {boolean} isFavorite - флаг пометки избранного
 * @property {string[]} offers -ключи (id) для получения дополнительной услуги из mockOffers.offers
 * @property {string} type -  enum  название типа предложений
 */
const mockPoints = [
  {
    id: '1',
    basePrice: 1100,
    dateFrom: '2019-05-10T20:55:56.845Z',
    dateTo: '2020-07-11T10:22:13.375Z',
    destination: '1',
    isFavorite: false,
    offers: [
      '1'
    ],
    type: 'taxi'
  },
  {
    id: '2',
    basePrice: 1200,
    dateFrom: '2022-02-11T21:55:56.845Z',
    dateTo: '2023-04-12T11:22:13.375Z',
    destination: '2',
    isFavorite: true,
    offers: [
      '2'
    ],
    type: 'flight'
  },
  {
    id: '3',
    basePrice: 1300,
    dateFrom: '2024-010-12T22:55:56.845Z',
    dateTo: '2024-12-13T12:22:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: [
      '3'
    ],
    type: 'train'
  },
  {
    id: '4',
    basePrice: 1100,
    dateFrom: '2024-08-10T20:55:56.845Z',
    dateTo: '2025-09-11T21:42:13.375Z',
    destination: '1',
    isFavorite: false,
    offers: [
      '1'
    ],
    type: 'taxi'
  },
  {
    id: '5',
    basePrice: 1200,
    dateFrom: '2024-02-11T21:55:56.845Z',
    dateTo: '2024-05-14T11:45:13.375Z',
    destination: '2',
    isFavorite: true,
    offers: [
      '2'
    ],
    type: 'flight'
  },
  {
    id: '6',
    basePrice: 1300,
    dateFrom: '2024-05-26T09:55:56.845Z',
    dateTo: '2024-05-26T23:22:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: [
      '3'
    ],
    type: 'train'
  }
];

/**
 * @type {Array<OfferByType>} mockOffers - массив предложения состоит из объектов
 * @typedef {Object} OfferByType - предложение состоит из названия и массива дополнительных услуг для этого типа
 * @property {string} type - название типа предложения
 * @property {Array<offer>} offers - массив дополнительных услуг для этого предложения состоит из объектов
 * @typedef {Object} offer - объект дополнительной услуги состоит
 * @property {string} id - id дополнительной услуги
 * @property {string} title - заголовок дополнительной услуги
 * @property {number} price - цена дополнительной услуги
 */
const mockOffers = [
  {
    type: 'taxi',
    offers:[
      {
        id: '1',
        title: 'Business class',
        price: 500
      },
      {
        id: '2',
        title: 'Economy class',
        price: 120
      },
    ]
  },
  {
    type: 'flight',
    offers:[
      {
        id: '1',
        title: 'Add food',
        price: 50
      },
      {
        id: '2',
        title: 'Increase the weight of luggage',
        price: 120
      },
    ]
  },
  {
    type: 'train',
    offers:[
      {
        id: '1',
        title: 'Add food',
        price: 50
      },
      {
        id: '2',
        title: 'Increase the weight of luggage',
        price: 120
      },
      {
        id: '3',
        title: 'Increase the weight of luggage',
        price: 220
      },
    ]
  }
];

/**
 * @type {Array<Destinations>} mockDestinations - массив объектов точек назначений
 * @typedef {Object} Destinations - точка назначения
 * @property {string} id - id
 * @property {string} description - описание точки назначения
 * @property {string} name - название точки назначения
 * @property {Array<picture>} pictures - изображения(картинки) точки назначения
 * @typedef {Object} picture - изображение точки назначения
 * @property {string} src - адрес до изображения
 * @property {string} description - описание изображения
 */
const mockDestinations = [
  {
    id: '1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    name: 'Moscow',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/5.jpg',
        description: 'photo-5',
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/4.jpg',
        description:
          'photo-4',
      },
    ],
  },
  {
    id: '2',
    description: 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    name: 'Samara',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/7.jpg',
        description: 'photo-7',
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/17.jpg',
        description:
          'photo-17',
      },
    ],
  },
  {
    id: '3',
    description: 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    name: 'London',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/6.jpg',
        description: 'photo-6',
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/16.jpg',
        description:
          'photo-16',
      },
    ],
  },
  {
    id: '4',
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    name: 'New Dely',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/2.jpg',
        description: 'photo-2',
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/1.jpg',
        description:
          'photo-1',
      },
    ],
  }
];

export {mockPoints, mockOffers, mockDestinations};
