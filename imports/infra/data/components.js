const stringToArray = (string) => string.split(' ')

export const INITIAL_COMPONENTS_DATA = [
  {
    name: 'LoginLayout',
    children: [
      {
        tag: 'div',
        classes: ['content'],
        children: [{tag: 'form'}],
      },
    ],
    classes: stringToArray('bg-primary'),
    selectors: [
      {
        value: '> .content',
        classes: stringToArray('flex flex-col justify-center items-center h-screen'),
      },
      {
        value: '> .content > form',
        classes: stringToArray('flex flex-col p-5 w-80 bg-white rounded shadow-xl'),
      },
    ],
  },
  {
    tag: 'button',
    name: 'CustomButton',
    children: [
      {
        text: 'Button label',
      },
    ],
    classes: stringToArray('py-2 px-5 bg-gray text-gray-500'),
    variants: ['styles'],
    styles: [
      {value: 'primary', classes: stringToArray('bg-primary text-white')},
      {value: 'secondary', classes: stringToArray('bg-secondary text-white')},
    ],
  },
  {
    name: 'AuthenticatedLayout',
    children: [
      {
        tag: 'div',
        classes: ['toolbar'],
        children: [{tag: 'a'}],
      },
      {
        tag: 'div',
        classes: ['content'],
      },
    ],
    classes: stringToArray('h-screen bg-primary'),
    selectors: [
      {
        value: '> div.toolbar',
        classes: stringToArray('flex items-center justify-end w-full h-10 px-2 bg-primary text-white shadow-lg'),
      },
      {
        value: '> div.toolbar > a',
        classes: stringToArray('text-xs pl-2'),
      },
      {
        value: '> div.content',
        classes: stringToArray('flex flex-col p-5'),
      },
    ],
  },
  {
    name: 'CustomSelect',
    children: [
      {
        tag: 'div',
      },
      {
        tag: 'div',
        classes: ['dropdown'],
        children: [{tag: 'div'}],
      },
    ],
    classes: stringToArray('flex flex-col w-64 bg-white text-sm shadow-lg cursor-pointer'),
    selectors: [
      {
        value: '> div:first-child',
        classes: stringToArray('py-2 px-5 border rounded'),
      },
      {
        value: '> div.dropdown',
        classes: stringToArray('border border-t-0'),
      },
      {
        value: '> div.dropdown > div',
        classes: stringToArray('py-1 px-5 hover:bg-gray-100'),
      },
    ],
    variants: ['states'],
    states: [
      {
        value: 'closed',
        selectors: [
          {
            value: '> div:first-child',
            classes: stringToArray('border-gray text-gray-500'),
          },
          {
            value: '> div.dropdown',
            classes: stringToArray('hidden'),
          },
        ],
      },
      {
        value: 'opened',
        classes: stringToArray('border border-blue-500'),
        selectors: [
          {
            value: '> div:first-child',
            classes: stringToArray('border-blue-500 text-blue-500'),
          },
          {
            value: '> div.dropdown',
            classes: stringToArray('border-blue-500 block'),
          },
        ],
      },
    ],
  },
]
