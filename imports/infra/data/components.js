const stringToArray = (string) => string.split(' ')

export const INITIAL_COMPONENTS_DATA = [
  {
    name: 'LoginLayout',
    classes: stringToArray('bg-primary'),
    selectors: [
      {
        value: '.content',
        classes: stringToArray('flex flex-col justify-center items-center h-screen'),
      },
      {
        value: '.content > form',
        classes: stringToArray('flex flex-col p-5 w-80 bg-white rounded shadow-xl'),
      },
    ],
  },
  {
    name: 'CustomInput',
    classes: stringToArray('py-2 px-5 bg-white border border-gray mb-2'),
  },
  {
    name: 'CustomButton',
    classes: stringToArray('py-2 px-5 bg-primary text-white'),
  },
  {
    name: 'AuthenticatedLayout',
    classes: stringToArray('h-screen bg-primary'),
    selectors: [
      {
        value: 'div.toolbar',
        classes: stringToArray('flex items-center justify-end w-full h-10 px-2 bg-primary text-white shadow-lg'),
      },
      {
        value: 'div.toolbar > a',
        classes: stringToArray('text-xs pl-2'),
      },
      {
        value: 'div.content',
        classes: stringToArray('flex flex-col p-5'),
      },
    ],
  },
  {
    name: 'CustomSelect',
    classes: stringToArray('flex flex-col w-64 bg-white text-sm shadow-lg cursor-pointer'),
    selectors: [
      {
        value: '> div:first-child',
        classes: stringToArray('py-2 px-5 border rounded'),
      },
      {
        value: 'div.dropdown',
        classes: stringToArray('border border-t-0'),
      },
      {
        value: 'div.dropdown > div',
        classes: stringToArray('py-1 px-5 hover:bg-gray-100'),
      },
    ],
    states: [
      {
        name: 'Closed',
        selectors: [
          {
            value: '> div:first-child',
            classes: stringToArray('border-gray text-gray-500'),
          },
          {
            value: 'div.dropdown',
            classes: stringToArray('hidden'),
          },
        ],
      },
      {
        name: 'Opened',
        classes: stringToArray('border border-blue-500'),
        selectors: [
          {
            value: '> div:first-child',
            classes: stringToArray('border-blue-500 text-blue-500'),
          },
          {
            value: 'div.dropdown',
            classes: stringToArray('border-blue-500 block'),
          },
        ],
      },
    ],
  },
]
