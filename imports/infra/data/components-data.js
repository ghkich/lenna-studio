import {COMPONENT_CATEGORIES} from '../constants/component-categories'
import {CUSTOM_ATTR_KEYS} from '../constants/custom-attr-keys'

const stringToArray = (string) => string.split(' ')

export const COMPONENTS_SEED = [
  {
    name: 'SearchBar',
    category: COMPONENT_CATEGORIES.FORM,
    childNodes: [
      {
        tagName: 'div',
        attrs: {
          [CUSTOM_ATTR_KEYS.COMPONENT]: 'SearchBar',
        },
        childNodes: [
          {
            tagName: 'input',
            attrs: {
              type: 'text',
              placeholder: 'Search...',
            },
          },
        ],
      },
    ],
  },
  {
    name: 'LoginLayout',
    category: COMPONENT_CATEGORIES.LAYOUTS,
    childNodes: [
      {
        tagName: 'div',
        attrs: {
          [CUSTOM_ATTR_KEYS.COMPONENT]: 'LoginLayout',
        },
        childNodes: [
          {
            tagName: 'form',
            childNodes: [
              {
                tagName: 'input',
                attrs: {
                  type: 'text',
                  placeholder: 'E-mail',
                },
              },
              {
                tagName: 'input',
                attrs: {
                  type: 'password',
                  placeholder: 'Password',
                },
              },
              {
                tagName: 'button',
                attrs: {
                  [CUSTOM_ATTR_KEYS.COMPONENT]: 'Button',
                  [CUSTOM_ATTR_KEYS.STYLE]: 'primary',
                },
                childNodes: [{text: 'Login'}],
              },
              {
                tagName: 'button',
                attrs: {
                  [CUSTOM_ATTR_KEYS.COMPONENT]: 'LinkButton',
                  [CUSTOM_ATTR_KEYS.STYLE]: 'primary',
                },
                childNodes: [{text: 'Forgot my password'}],
              },
            ],
          },
        ],
      },
    ],
    selectors: [
      {
        value: '',
        classes: stringToArray('bg-primary flex flex-col justify-center items-center h-screen'),
      },
      {
        value: '> form',
        classes: stringToArray('flex flex-col p-5 w-80 bg-white rounded shadow-xl'),
      },
      {
        value: '> form > input',
        classes: stringToArray('bg-white p-2 border'),
      },
    ],
  },
  {
    name: 'SidebarLayout',
    category: COMPONENT_CATEGORIES.LAYOUTS,
    childNodes: [
      {
        tagName: 'div',
        attrs: {
          [CUSTOM_ATTR_KEYS.COMPONENT]: 'SidebarLayout',
        },
        childNodes: [
          {
            tagName: 'div',
            childNodes: [
              {
                tagName: 'img',
                src: 'https://preview.keenthemes.com/metronic8/demo4/assets/media/logos/logo-demo4.svg',
              },
              {
                tagName: 'nav',
                childNodes: [
                  {
                    tagName: 'a',
                    childNodes: [
                      {
                        text: 'Dashboard',
                      },
                    ],
                  },
                  {
                    tagName: 'a',
                    childNodes: [
                      {
                        text: 'Account',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            tagName: 'div',
            childNodes: [
              {
                tagName: 'div',
                attrs: {
                  class: 'toolbar',
                },
                childNodes: [
                  {
                    text: 'Dashboard',
                  },
                  {
                    tagName: 'div',
                    attrs: {
                      [CUSTOM_ATTR_KEYS.COMPONENT]: 'SearchBar',
                    },
                  },
                ],
              },
              {
                tagName: 'div',
                structure: {
                  isChildrenContainer: true,
                },
                attrs: {
                  class: 'content',
                },
                childNodes: [{text: 'Welcome to dashboard :)'}],
              },
            ],
          },
        ],
      },
    ],
    selectors: [
      {
        value: '',
        classes: stringToArray('h-screen bg-primary flex'),
      },
      {
        value: '> div:first-child',
        classes: stringToArray('w-20 bg-primary text-white p-4'),
      },
      {
        value: '> div:last-child',
        classes: stringToArray('flex-1'),
      },
      {
        value: '> div.toolbar',
        classes: stringToArray('flex items-center justify-end w-full h-10 px-2 bg-primary text-white shadow-lg'),
      },
      {
        value: '> div.content',
        classes: stringToArray('flex flex-col p-5'),
      },
    ],
  },
  {
    name: 'Button',
    category: COMPONENT_CATEGORIES.CONTROLS,
    childNodes: [
      {
        tagName: 'button',
        structure: {
          isChildrenContainer: true,
        },
        attrs: {
          type: 'button',
          [CUSTOM_ATTR_KEYS.COMPONENT]: 'Button',
        },
        childNodes: [{text: 'Button'}],
      },
    ],
    selectors: [
      {
        value: '',
        classes: stringToArray('py-2 px-5 bg-gray text-gray-500'),
      },
    ],
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
  {
    name: 'LinkButton',
    category: COMPONENT_CATEGORIES.CONTROLS,
    childNodes: [
      {
        tagName: 'button',
        structure: {
          isChildrenContainer: true,
        },
        attrs: {
          type: 'button',
          [CUSTOM_ATTR_KEYS.COMPONENT]: 'LinkButton',
        },
        childNodes: [{text: 'Link Button'}],
      },
    ],
    selectors: [
      {
        value: '',
        classes: stringToArray('py-2 px-5 bg-transparent text-gray-500'),
      },
    ],
    styles: [
      {
        value: 'primary',
        selectors: [
          {
            value: '',
            classes: stringToArray('text-primary'),
          },
        ],
      },
      {
        value: 'secondary',
        selectors: [
          {
            value: '',
            classes: stringToArray('text-secondary'),
          },
        ],
      },
    ],
  },
]
