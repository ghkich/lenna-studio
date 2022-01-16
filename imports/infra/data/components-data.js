import {COMPONENT_CATEGORIES} from '../constants/component-categories'
import {CUSTOM_ATTR_KEYS} from '../constants/custom-attr-keys'

const stringToArray = (string) => string.split(' ')

export const COMPONENTS_SEED = [
  {
    name: 'BlankLayout',
    category: COMPONENT_CATEGORIES.LAYOUTS,
    childNodes: [
      {
        tagName: 'div',
        structure: {
          isChildrenContainer: true,
        },
      },
    ],
    selectors: [
      {
        value: '',
        classes: stringToArray('w-full h-screen'),
      },
    ],
  },
  {
    name: 'AuthenticatedLayout',
    category: COMPONENT_CATEGORIES.LAYOUTS,
    childNodes: [
      {
        tagName: 'div',
        childNodes: [
          {
            tagName: 'nav',
            childNodes: [
              {
                tagName: 'div',
                childNodes: [
                  {
                    tagName: 'div',
                    childNodes: [
                      {
                        tagName: 'div',
                        childNodes: [
                          {
                            tagName: 'img',
                            attrs: {
                              src: 'https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg',
                              alt: 'Workflow',
                            },
                          },
                          {
                            tagName: 'div',
                            childNodes: [
                              {tagName: 'a', attrs: {class: 'active', href: '#'}, childNodes: [{text: 'Dashboard'}]},
                              {tagName: 'a', attrs: {href: '#'}, childNodes: [{text: 'Team'}]},
                              {tagName: 'a', attrs: {href: '#'}, childNodes: [{text: 'Projects'}]},
                              {tagName: 'a', attrs: {href: '#'}, childNodes: [{text: 'Calendar'}]},
                              {tagName: 'a', attrs: {href: '#'}, childNodes: [{text: 'Reports'}]},
                            ],
                          },
                        ],
                      },
                      {
                        tagName: 'div',
                        childNodes: [
                          {
                            tagName: 'div',
                            childNodes: [
                              {
                                tagName: 'button',
                                attrs: {
                                  type: 'button',
                                },
                                childNodes: [
                                  {
                                    tagName: 'svg',
                                    attrs: {
                                      xmlns: 'http://www.w3.org/2000/svg',
                                      fill: 'none',
                                      viewBox: '0 0 24 24',
                                      stroke: 'currentColor',
                                    },
                                    childNodes: [
                                      {
                                        tagName: 'path',
                                        attrs: {
                                          strokeLinecap: 'round',
                                          strokeLinejoin: 'round',
                                          strokeWidth: '2',
                                          d: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
                                        },
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
                                tagName: 'button',
                                attrs: {
                                  type: 'button',
                                },
                                childNodes: [
                                  {
                                    tagName: 'img',
                                    attrs: {
                                      src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            tagName: 'main',
            structure: {
              isChildrenContainer: true,
            },
          },
        ],
      },
    ],
    selectors: [
      {
        value: '',
        classes: stringToArray('w-full h-screen'),
      },
      {
        value: '> nav',
        classes: stringToArray('bg-gray-800'),
      },
      {
        value: '> nav > div',
        classes: stringToArray('mx-auto px-4'),
      },
      {
        value: '> nav > div > div',
        classes: stringToArray('flex items-center justify-between h-16'),
      },
      {
        value: '> nav > div > div > div:first-child',
        classes: stringToArray('flex items-center'),
      },
      {
        value: '> nav > div > div > div:first-child > img',
        classes: stringToArray('h-8 w-8'),
      },
      {
        value: '> nav > div > div > div:first-child > div',
        classes: stringToArray('ml-10 flex items-baseline'),
      },
      {
        value: '> nav > div > div > div:first-child > div > a',
        classes: stringToArray('text-gray-300 px-3 py-2 rounded-md text-sm font-medium'),
      },
      {
        value: '> nav > div > div > div:first-child > div > a.active',
        classes: stringToArray('bg-gray text-white'),
      },
      {
        value: '> nav > div > div > div:last-child',
        classes: stringToArray('ml-4 flex items-center'),
      },
      {
        value: '> nav > div > div > div:last-child > div:first-child button',
        classes: stringToArray('bg-gray-800 p-1 rounded-full text-gray-400'),
      },
      {
        value: '> nav > div > div > div:last-child > div:first-child svg',
        classes: stringToArray('h-6 w-6'),
      },
      {
        value: '> nav > div > div > div:last-child > div:last-child',
        classes: stringToArray('ml-3 relative'),
      },
      {
        value: '> nav > div > div > div:last-child > div:last-child button',
        classes: stringToArray('max-w-xs bg-gray-800 rounded-full flex items-center text-sm'),
      },
      {
        value: '> nav > div > div > div:last-child > div:last-child img',
        classes: stringToArray('h-8 w-8 rounded-full'),
      },
      {
        value: '> main > header',
        classes: stringToArray('bg-white shadow'),
      },
      {
        value: '> main > header > div',
        classes: stringToArray('py-6 px-4'),
      },
      {
        value: '> main > header > div > h1',
        classes: stringToArray('text-3xl font-bold text-gray-900'),
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
        },
        childNodes: [{text: 'Button label'}],
      },
    ],
    selectors: [
      {
        value: '',
        classes: stringToArray('py-2 px-4 rounded bg-gray text-white text-center'),
      },
    ],
    styles: [
      {
        value: 'primary',
        selectors: [
          {
            value: '',
            classes: stringToArray('bg-primary'),
          },
        ],
      },
      {
        value: 'secondary',
        selectors: [
          {
            value: '',
            classes: stringToArray('bg-secondary'),
          },
        ],
      },
    ],
  },
  {
    name: 'CallToAction',
    category: COMPONENT_CATEGORIES.MISC,
    childNodes: [
      {
        tagName: 'div',
        childNodes: [
          {
            tagName: 'header',
            childNodes: [],
          },
          {
            tagName: 'div',
            childNodes: [
              {
                tagName: 'h2',
                childNodes: [
                  {
                    tagName: 'span',
                    childNodes: [{text: 'Ready to dive in?'}],
                  },
                  {
                    tagName: 'span',
                    childNodes: [{text: 'Start your free trial today.'}],
                  },
                ],
              },
              {
                tagName: 'div',
                childNodes: [
                  {
                    tagName: 'div',
                    childNodes: [
                      {
                        tagName: 'a',
                        attrs: {
                          href: '#',
                        },
                        childNodes: [{text: 'Get started'}],
                      },
                    ],
                  },
                  {
                    tagName: 'div',
                    childNodes: [
                      {
                        tagName: 'a',
                        attrs: {
                          href: '#',
                        },
                        childNodes: [{text: 'Learn more'}],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    selectors: [
      {
        value: '',
        classes: stringToArray('w-full h-screen bg-gray-50'),
      },
      {
        value: '> header',
        classes: stringToArray('w-full h-5 bg-primary'),
      },
      {
        value: '> div',
        classes: stringToArray('mx-auto py-12 px-10 flex items-center justify-between'),
      },
      {
        value: '> div > h2',
        classes: stringToArray('text-3xl font-extrabold tracking-tight text-gray-900'),
      },
      {
        value: '> div > h2 > span:first-child',
        classes: stringToArray('block'),
      },
      {
        value: '> div > h2 > span:last-child',
        classes: stringToArray('block text-primary'),
      },
      {
        value: '> div > div',
        classes: stringToArray('mt-8 flex'),
      },
      {
        value: '> div > div > div:first-child',
        classes: stringToArray('inline-flex rounded-md shadow'),
      },
      {
        value: '> div > div > div a',
        classes: stringToArray(
          'inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md',
        ),
      },
      {
        value: '> div > div > div:first-child a',
        classes: stringToArray('text-white bg-primary'),
      },
      {
        value: '> div > div > div:last-child',
        classes: stringToArray('ml-3 inline-flex rounded-md shadow'),
      },
      {
        value: '> div > div > div:last-child a',
        classes: stringToArray('text-primary bg-white'),
      },
    ],
  },
  {
    name: 'LoginForm',
    category: COMPONENT_CATEGORIES.FORM,
    childNodes: [
      {
        tagName: 'div',
        childNodes: [
          {
            tagName: 'div',
            childNodes: [
              {
                tagName: 'img',
                attrs: {
                  src: 'https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg',
                  alt: 'Workflow',
                },
              },
              {
                tagName: 'h2',
                childNodes: [{text: 'Sign in to your account'}],
              },
              {
                tagName: 'p',
                childNodes: [
                  {text: `Or`},
                  {
                    tagName: 'a',
                    childNodes: [{text: 'start your 14-day free trial'}],
                  },
                ],
              },
              {
                tagName: 'form',
                attrs: {
                  action: '#',
                  method: 'POST',
                },
                childNodes: [
                  {
                    tagName: 'div',
                    childNodes: [
                      {
                        tagName: 'input',
                        attrs: {
                          type: 'email',
                          placeholder: 'Email address',
                        },
                      },
                      {
                        tagName: 'input',
                        attrs: {
                          type: 'password',
                          placeholder: 'Password',
                        },
                      },
                    ],
                  },
                  {
                    tagName: 'div',
                    childNodes: [
                      {
                        tagName: 'div',
                        childNodes: [
                          {
                            tagName: 'input',
                            attrs: {
                              type: 'checkbox',
                              id: 'remember-me',
                            },
                          },
                          {
                            tagName: 'label',
                            attrs: {
                              htmlFor: 'remember-me',
                            },
                            childNodes: [{text: 'Remember me'}],
                          },
                        ],
                      },
                      {
                        tagName: 'a',
                        childNodes: [{text: 'Forgot your password?'}],
                      },
                    ],
                  },
                  {
                    tagName: 'button',
                    attrs: {
                      [CUSTOM_ATTR_KEYS.COMPONENT]: 'Button',
                      [CUSTOM_ATTR_KEYS.STYLE]: 'primary',
                      type: 'submit',
                    },
                    childNodes: [{text: 'Sign in'}],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    selectors: [
      {
        value: '',
        classes: stringToArray('w-full h-screen flex items-center justify-center text-gray py-12 px-4'),
      },
      {
        value: '> div',
        classes: stringToArray('max-w-md text-center w-full'),
      },
      {
        value: '> div > img',
        classes: stringToArray('mx-auto h-12 w-auto'),
      },
      {
        value: '> div > h2',
        classes: stringToArray('mt-6 text-3xl font-extrabold'),
      },
      {
        value: '> div > p',
        classes: stringToArray('mt-2 text-sm'),
      },
      {
        value: '> div > p > a',
        classes: stringToArray('font-medium text-primary'),
      },
      {
        value: 'form',
        classes: stringToArray('mt-8'),
      },
      {
        value: 'form > div:first-child',
        classes: stringToArray('rounded-md shadow-sm'),
      },
      {
        value: 'form > div:first-child input',
        classes: stringToArray('appearance-none rounded-none relative block w-full px-3 py-2 border border-gray'),
      },
      {
        value: 'form > div:first-child input:first-child',
        classes: stringToArray('rounded-t-md'),
      },
      {
        value: 'form > div:first-child input:last-child',
        classes: stringToArray('rounded-b-md'),
      },
      {
        value: 'form > div:nth-child(2)',
        classes: stringToArray('flex items-center justify-between my-6'),
      },
      {
        value: 'form > div:nth-child(2) > div',
        classes: stringToArray('flex items-center'),
      },
      {
        value: 'form > div:nth-child(2) > div > input',
        classes: stringToArray('h-4 w-4 text-primary border-gray rounded'),
      },
      {
        value: 'form > div:nth-child(2) > div > label',
        classes: stringToArray('ml-2 block text-sm'),
      },
      {
        value: 'form > div:nth-child(2) > a',
        classes: stringToArray('text-sm font-medium text-primary'),
      },
      {
        value: 'form > button',
        classes: stringToArray('w-full'),
      },
    ],
  },
]
