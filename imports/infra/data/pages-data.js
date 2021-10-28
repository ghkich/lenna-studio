import {CUSTOM_ATTR_KEYS} from '../constants/custom-attr-keys'
import {PAGE_CATEGORIES} from '../constants/page-categories'

export const PAGES_SEED = [
  {
    name: 'Home',
    path: '/welcome',
    category: PAGE_CATEGORIES.LANDING,
    layout: 'SidebarLayout',
    childNodes: [
      {
        tagName: 'button',
        attrs: {
          [CUSTOM_ATTR_KEYS.COMPONENT]: 'Button',
          [CUSTOM_ATTR_KEYS.STYLE]: 'primary',
        },
      },
      {
        tagName: 'div',
        attrs: {
          [CUSTOM_ATTR_KEYS.COMPONENT]: 'Button',
          [CUSTOM_ATTR_KEYS.STYLE]: 'secondary',
        },
      },
      {
        tagName: 'div',
        attrs: {
          class: 'card',
        },
      },
    ],
  },
  {
    name: 'Register',
    path: '/register',
    category: PAGE_CATEGORIES.REGISTER,
    layout: 'SidebarLayout',
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
      {
        tagName: 'button',
        attrs: {
          [CUSTOM_ATTR_KEYS.COMPONENT]: 'LinkButton',
          [CUSTOM_ATTR_KEYS.STYLE]: 'primary',
        },
        childNodes: [{text: 'Forgot password'}],
      },
    ],
  },
  {
    name: 'Login',
    path: '/login',
    category: PAGE_CATEGORIES.LOGIN,
    layout: 'LoginLayout',
  },
  {
    name: 'Dashboard',
    path: '/',
    category: PAGE_CATEGORIES.DASHBOARD,
    layout: 'SidebarLayout',
    childNodes: [{text: 'Welcome to dashboard :)'}],
  },
  {
    name: 'Account',
    path: '/account',
    category: PAGE_CATEGORIES.PROFILE,
    layout: 'SidebarLayout',
    childNodes: [
      {
        tagName: 'div',
        childNodes: [{text: 'User profile'}],
      },
    ],
  },
]
