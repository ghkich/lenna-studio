import {LENNA_ATTR_KEYS} from '../constants/lenna-attr-keys'

export const PAGES_SEED = [
  {
    name: 'Login',
    path: '/login',
    childNodes: [
      {
        tagName: 'div',
        attrs: {
          [LENNA_ATTR_KEYS.COMPONENT]: 'LoginLayout',
        },
      },
    ],
  },
  {
    name: 'Home',
    path: '/',
    childNodes: [
      {
        tagName: 'div',
        attrs: {
          [LENNA_ATTR_KEYS.COMPONENT]: 'AuthenticatedLayout',
        },
        childNodes: [
          {
            tagName: 'div',
            attrs: {
              class: 'toolbar',
            },
            childNodes: [{tagName: 'a'}],
          },
          {
            tagName: 'div',
            attrs: {
              class: 'content',
            },
            childNodes: [
              {
                tagName: 'div',
                attrs: {
                  [LENNA_ATTR_KEYS.COMPONENT]: 'CustomSelect',
                },
              },
              {
                tagName: 'div',
                attrs: {
                  class: 'spacer mb-5',
                },
              },
              {
                tagName: 'button',
                attrs: {
                  [LENNA_ATTR_KEYS.COMPONENT]: 'CustomButton',
                  [LENNA_ATTR_KEYS.STYLE]: 'primary',
                },
              },
              {
                tagName: 'button',
                attrs: {
                  [LENNA_ATTR_KEYS.COMPONENT]: 'CustomButton',
                  [LENNA_ATTR_KEYS.STYLE]: 'secondary',
                },
              },
            ],
          },
        ],
      },
    ],
  },
]
