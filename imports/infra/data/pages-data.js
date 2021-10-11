import {CUSTOM_DATA_KEY} from '../constants/lenna-attr-keys'

export const PAGES_SEED = [
  {
    name: 'Login',
    path: '/login',
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
]
