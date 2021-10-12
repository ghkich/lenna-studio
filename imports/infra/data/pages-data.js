import {CUSTOM_DATA_KEY} from '../constants/lenna-attr-keys'
import {PAGE_CATEGORIES} from '../constants/page-categories'

export const PAGES_SEED = [
  {
    name: 'Home',
    path: '/welcome',
    category: PAGE_CATEGORIES.LANDING,
    childNodes: [
      {
        tagName: 'div',
        text: 'Home',
      },
    ],
  },
  {
    name: 'Register',
    path: '/register',
    category: PAGE_CATEGORIES.REGISTER,
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
            tagName: 'input',
            attrs: {
              type: 'password',
              placeholder: 'Confirm password',
            },
          },
        ],
      },
    ],
  },
  {
    name: 'Login',
    path: '/login',
    category: PAGE_CATEGORIES.LOGIN,
    childNodes: [
      {
        tagName: 'div',
        attrs: {
          [CUSTOM_DATA_KEY]: 'LoginLayout',
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
                  type: 'button',
                  [CUSTOM_DATA_KEY]: 'Button-primary',
                },
                childNodes: [{text: 'Login'}],
              },
              {
                tagName: 'button',
                attrs: {
                  type: 'button',
                  [CUSTOM_DATA_KEY]: 'LinkButton-primary',
                },
                childNodes: [{text: 'Forgot my password'}],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Dashboard',
    path: '/',
    category: PAGE_CATEGORIES.DASHBOARD,
    childNodes: [
      {
        tagName: 'div',
        attrs: {
          [CUSTOM_DATA_KEY]: 'SidebarLayout',
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
                      [CUSTOM_DATA_KEY]: 'SearchBar',
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
                tagName: 'div',
                attrs: {
                  class: 'content',
                },
                childNodes: [{text: 'Welcome to dashboard :)'}],
              },
            ],
          },
          {
            tagName: 'div',
          },
        ],
      },
    ],
  },
  {
    name: 'Account',
    path: '/account',
    category: PAGE_CATEGORIES.PROFILE,
    childNodes: [
      {
        tagName: 'div',
        childNodes: [{text: 'User profile'}],
      },
    ],
  },
]
