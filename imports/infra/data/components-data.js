import {COMPONENT_CATEGORIES} from '../constants/component-categories'
import {LENNA_ATTR_KEYS} from '../constants/lenna-attr-keys'

const stringToArray = (string) => string.split(' ')

export const COMPONENTS_SEED = [
  {
    name: 'LoginLayout',
    category: COMPONENT_CATEGORIES.LAYOUTS,
    childNodes: [
      {
        tagName: 'div',
        attrs: {
          [LENNA_ATTR_KEYS.COMPONENT]: 'LoginLayout',
        },
        childNodes: [
          {
            tagName: 'div',
            attrs: {
              class: 'content',
            },
            childNodes: [
              {
                tagName: 'form',
              },
            ],
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
    name: 'CustomButton',
    category: COMPONENT_CATEGORIES.CONTROLS,
    childNodes: [
      {
        tagName: 'button',
        attrs: {
          [LENNA_ATTR_KEYS.COMPONENT]: 'CustomButton',
        },
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
    name: 'AuthenticatedLayout',
    category: COMPONENT_CATEGORIES.LAYOUTS,
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
            childNodes: [
              {
                tagName: 'a',
              },
            ],
          },
          {
            tagName: 'div',
            attrs: {
              class: 'content',
            },
          },
        ],
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
    name: 'CustomSelect',
    category: COMPONENT_CATEGORIES.FORM,
    childNodes: [
      {
        tagName: 'div',
        attrs: {
          [LENNA_ATTR_KEYS.COMPONENT]: 'CustomSelect',
        },
        childNodes: [
          {
            tagName: 'div',
          },
          {
            tagName: 'div',
            attrs: {
              class: 'dropdown',
            },
            childNodes: [
              {
                tagName: 'div',
              },
            ],
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
]
