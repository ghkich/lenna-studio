const stringToArray = (string) => string.split(' ')

export const ComponentCategories = {
  LAYOUTS: 'Layouts',
  CONTROLS: 'Controls',
  FORM: 'Form',
}

export const INITIAL_COMPONENTS_DATA = [
  {
    tag: 'div',
    name: 'LoginLayout',
    category: ComponentCategories.LAYOUTS,
    children: [
      {
        tag: 'div',
        classes: ['content'],
        children: [
          {
            tag: 'form',
          },
        ],
      },
    ],
    selectors: [
      {
        value: '',
        classes: stringToArray('bg-primary'),
      },
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
    category: ComponentCategories.CONTROLS,
    children: [
      {
        text: 'Button label',
      },
    ],
    selectors: [
      {
        value: '',
        classes: stringToArray('py-2 px-5 bg-gray text-gray-500'),
      },
    ],
    variants: {
      styles: [
        {
          value: 'primary',
          selectors: [
            {
              value: '',
              classes: stringToArray('bg-primary text-white'),
            },
          ],
        },
        {
          value: 'secondary',
          selectors: [
            {
              value: '',
              classes: stringToArray('bg-secondary text-white'),
            },
          ],
        },
      ],
    },
  },
  {
    tag: 'div',
    name: 'AuthenticatedLayout',
    category: ComponentCategories.LAYOUTS,
    children: [
      {
        tag: 'div',
        classes: ['toolbar'],
        children: [
          {
            tag: 'a',
          },
        ],
      },
      {
        tag: 'div',
        classes: ['content'],
      },
    ],
    selectors: [
      {
        value: '',
        classes: stringToArray('h-screen bg-primary'),
      },
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
    tag: 'div',
    name: 'CustomSelect',
    category: ComponentCategories.FORM,
    children: [
      {
        tag: 'div',
      },
      {
        tag: 'div',
        classes: ['dropdown'],
        children: [
          {
            tag: 'div',
          },
        ],
      },
    ],
    selectors: [
      {
        value: '',
        classes: stringToArray('flex flex-col w-64 bg-white text-sm shadow-lg cursor-pointer'),
      },
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
    variants: {
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
          selectors: [
            {
              value: '',
              classes: stringToArray('border border-blue-500'),
            },
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
  },
]
