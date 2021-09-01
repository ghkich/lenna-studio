module.exports = [
  {
    type: 'tag',
    name: 'div',
    voidElement: false,
    attrs: {
      class: 'page',
    },
    children: [
      {
        type: 'tag',
        name: 'div',
        voidElement: false,
        attrs: {
          class: 'pageHeader',
        },
        children: [
          {
            type: 'text',
            content: 'Teste de header',
          },
        ],
      },
      {
        type: 'tag',
        name: 'div',
        voidElement: false,
        attrs: {
          class: 'pageBody',
        },
        children: [
          {
            type: 'tag',
            name: 'div',
            voidElement: false,
            attrs: {
              class: 'button missing',
            },
            children: [
              {
                type: 'text',
                content: 'Botão',
              },
            ],
          },
          {
            type: 'text',
            content: ' ',
          },
        ],
      },
      {
        type: 'tag',
        name: 'div',
        voidElement: false,
        attrs: {
          class: 'pageFooter',
        },
        children: [
          {
            type: 'text',
            content: 'Teste de footer',
          },
        ],
      },
    ],
  },
]
