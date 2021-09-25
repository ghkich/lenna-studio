export const INITIAL_PAGE_DATA = [
  {
    name: 'Login',
    path: '/login',
    children: [
      {
        name: 'LoginLayout',
      },
    ],
  },
  {
    name: 'Home',
    path: '/',
    children: [
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
            children: [
              {tag: 'div', name: 'CustomSelect'},
              {tag: 'div', classes: ['spacer', 'mb-5']},
              {tag: 'button', name: 'CustomButton', style: 'primary'},
              {tag: 'button', name: 'CustomButton', style: 'secondary'},
            ],
          },
        ],
      },
    ],
  },
]
