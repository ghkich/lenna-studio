module.exports = [
  {
    name: 'Splash',
    path: '/',
    scenarios: [
      {
        name: 'default',
        description: 'Default',
        html: '<div class="page"><div class="loading"></div></div>',
      },
      {
        name: 'redirectToWelcome',
        description: 'Redirect to Welcome',
        actions: [
          {
            type: 'redirect',
            path: '/welcome',
          },
        ],
      },
    ],
  },
  {
    name: 'Welcome',
    path: '/welcome',
    scenarios: [
      {
        name: 'default',
        description: 'Default',
        html: '<div class="page"><div class="slides"><div class="slide active">Slide 1</div><div class="slide">Slide 2</div></div><div class="controls"><button>Next slide</button></div></div>',
      },
      {
        name: 'onboardingSlide2',
        description: 'Onboarding slide 02',
        html: '<div class="page"><div class="slides"><div class="slide">Slide 1</div><div class="slide active">Slide 2</div></div><div class="footer"><button class="secondary">Register</button><button class="primary">Login</button></div></div>',
        actions: [
          {
            type: 'click',
            targetText: 'Next slide',
          },
        ],
      },
    ],
  },
  {
    name: 'Register',
    path: '/register',
    scenarios: [
      {
        name: 'blankForm',
        description: 'Blank form',
        html: '<div class="page"><form><input type="text" /><input type="text" placeholder="Name" /><input type="text" /><button class="primary" type="submit">Register</button></form></div>',
      },
      {
        name: 'errorNameEmpty',
        description: 'Error name empty',
        html: '<div class="page"><form><input type="text" /><input class="error" type="text" placeholder="Name" /><input type="text" /><button class="primary" type="submit">Register</button></form></div>',
        actions: [
          {
            type: 'click',
            targetText: 'Register',
          },
        ],
      },
    ],
  },
]
