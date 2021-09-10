export default [
  {
    name: 'Login',
    path: '/login',
    thumbnail:
      '<div class="w-full h-full bg-blue-500 flex justify-center items-center"><div class="w-16 h-8 bg-white"></div></div>',
  },
  {
    name: 'Home',
    path: '/',
    thumbnail: '<div class="w-full h-full bg-gray-300"><div class="h-2 bg-blue-500"></div></div>',
    children: [
      {
        name: 'AuthenticatedLayout',
        children: [
          {
            name: 'CustomSelect',
          },
        ],
      },
    ],
  },
]
