/**
 * Массив точек маршрута состоит из объектов
 * Объект - точка маршрута состоит из следующих полей
 * @param id:  string
 * @param basePrice:  number
 * @param dateFrom:  string
 * @param dateTo:  string
 * @param destination:  string
 * @param isFavorite: boolean
 * @param offers: [string]
 * @param type: enum, string
 */
const mockPoints = [
  {
    id: '1',
    basePrice: 1100,
    dateFrom: '2019-07-10T20:55:56.845Z',
    dateTo: '2019-07-11T10:22:13.375Z',
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
    dateFrom: '2019-07-11T21:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
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
    dateFrom: '2019-07-12T22:55:56.845Z',
    dateTo: '2019-07-11T12:22:13.375Z',
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
    dateFrom: '2019-07-10T20:55:56.845Z',
    dateTo: '2019-07-11T10:22:13.375Z',
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
    dateFrom: '2019-07-11T21:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
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
    dateFrom: '2019-07-12T22:55:56.845Z',
    dateTo: '2019-07-11T12:22:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: [
      '3'
    ],
    type: 'train'
  }
];

/**
 * Массив дополнительных предложений.
 * Состоит из объектов
 * Объект "предложение" состоит из следующих полей
 * type: @param enumб, string
 * offers - @param array   массив
 * массив offers состоит из
 * id: @param string
 * title: @param string
 * price: @param number
 */
const mockOffers = [
  {
    type: 'taxi',
    offers:[
      {
        id: 1,
        title: 'Business class',
        price: 500
      },
      {
        id: 2,
        title: 'Economy class',
        price: 120
      },
    ]
  },
  {
    type: 'flight',
    offers:[
      {
        id: 1,
        title: 'Add food',
        price: 50
      },
      {
        id: 2,
        title: 'Increase the weight of luggage',
        price: 120
      },
    ]
  },
  {
    type: 'train',
    offers:[
      {
        id: 1,
        title: 'Add food',
        price: 50
      },
      {
        id: 2,
        title: 'Increase the weight of luggage',
        price: 120
      },
      {
        id: 3,
        title: 'Increase the weight of luggage',
        price: 220
      },
    ]
  }
];

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
