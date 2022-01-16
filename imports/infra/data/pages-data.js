import {CUSTOM_ATTR_KEYS} from '../constants/custom-attr-keys'
import {PAGE_CATEGORIES} from '../constants/page-categories'

export const PAGES_SEED = [
  {
    name: 'Home',
    path: '/',
    category: PAGE_CATEGORIES.LANDING,
    layout: 'BlankLayout',
    childNodes: [
      {
        tagName: 'div',
        attrs: {
          [CUSTOM_ATTR_KEYS.COMPONENT]: 'CallToActionA',
        },
      },
    ],
  },
  {
    name: 'Login',
    path: '/login',
    category: PAGE_CATEGORIES.LOGIN,
    layout: 'BlankLayout',
    childNodes: [
      {
        tagName: 'div',
        attrs: {
          [CUSTOM_ATTR_KEYS.COMPONENT]: 'LoginForm',
        },
      },
    ],
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    category: PAGE_CATEGORIES.DASHBOARD,
    layout: 'AuthenticatedLayout',
    childNodes: [
      {
        tagName: 'header',
        childNodes: [
          {
            tagName: 'div',
            childNodes: [
              {
                tagName: 'h1',
                childNodes: [{text: 'Dashboard'}],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Profile',
    path: '/profile',
    category: PAGE_CATEGORIES.PROFILE,
    layout: 'AuthenticatedLayout',
    childNodes: [
      {
        tagName: 'header',
        childNodes: [
          {
            tagName: 'div',
            childNodes: [
              {
                tagName: 'h1',
                childNodes: [{text: 'Profile'}],
              },
            ],
          },
        ],
      },
    ],
  },
]
