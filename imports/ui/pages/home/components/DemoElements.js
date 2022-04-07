const actualElements = [
  {
    _id: 'RD4o7g2Pn948wSiGa',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    tagName: 'div',
    attrs: {},
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:51:32.440Z',
  },
  {
    _id: 'GStBnYKsnkzmT4AhQ',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'RD4o7g2Pn948wSiGa',
    tagName: 'h1',
    attrs: {},
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:51:32.447Z',
  },
  {
    _id: 'cdqxP8qaGAZ9MMi2a',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'GStBnYKsnkzmT4AhQ',
    text: 'Home',
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:51:32.457Z',
  },
  {
    _id: '6dBuR4m86SG3fdvc8',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'RD4o7g2Pn948wSiGa',
    tagName: 'p',
    attrs: {},
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:51:32.460Z',
  },
  {
    _id: 'FfWvwGMiqGv2ZdLBj',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: '6dBuR4m86SG3fdvc8',
    text: 'This is the home page HTML of the project.',
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:51:32.463Z',
  },
  {
    _id: 'GBCsFM3A2SmHiKeiu',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'RD4o7g2Pn948wSiGa',
    tagName: 'p',
    attrs: {},
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:51:32.465Z',
  },
  {
    _id: '5QyDR3osxMHHq7wLt',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'GBCsFM3A2SmHiKeiu',
    text: 'There is no CSS for this page because this is not the expected HTML.',
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:51:32.468Z',
  },
  {
    _id: 'yP6tu4CJvygvQp9Xo',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'RD4o7g2Pn948wSiGa',
    tagName: 'p',
    attrs: {},
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:51:32.470Z',
  },
  {
    _id: 'BBfsmhH8RsgyJwWr7',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'yP6tu4CJvygvQp9Xo',
    text: 'You can use the Lenna sidebar on the right, which was loaded by the script you just pasted, to check\n        the expected structure.',
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:51:32.472Z',
  },
]

const expectedElements = [
  {
    _id: 'SqMnMYN6Sbr4STxDX',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    tagName: 'div',
    attrs: {
      'data-component': 'MainLayout',
    },
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.138Z',
  },
  {
    _id: '9w22y6xofnj4RM9kT',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'SqMnMYN6Sbr4STxDX',
    tagName: 'h1',
    attrs: {},
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.149Z',
  },
  {
    _id: 'e3JtJZMwoNhpAAqYQ',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: '9w22y6xofnj4RM9kT',
    text: 'Home',
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.151Z',
  },
  {
    _id: 'DcS8xGoDSAf7iH6Ws',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'SqMnMYN6Sbr4STxDX',
    tagName: 'p',
    attrs: {},
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.152Z',
  },
  {
    _id: 'e9hj2emG6gdFPRars',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'DcS8xGoDSAf7iH6Ws',
    text: 'This is a demo page built in Lenna Studio. It was set as the',
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.154Z',
  },
  {
    _id: 'gZf4A6nYQoPLoRf7s',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'DcS8xGoDSAf7iH6Ws',
    tagName: 'b',
    attrs: {},
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.155Z',
  },
  {
    _id: 'XFozoSgsmGdrSNF7k',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'gZf4A6nYQoPLoRf7s',
    text: 'expected HTML',
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.157Z',
  },
  {
    _id: 'orS3p4SNrmBL4i2vn',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'DcS8xGoDSAf7iH6Ws',
    text: 'for the home.',
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.158Z',
  },
  {
    _id: 'Svrq63vLtErSwbD3W',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'SqMnMYN6Sbr4STxDX',
    tagName: 'p',
    attrs: {},
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.166Z',
  },
  {
    _id: 'hcELNm8tjXsXQpnYR',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'Svrq63vLtErSwbD3W',
    text: 'This HTML structure and the CSS being applied is',
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.168Z',
  },
  {
    _id: 'kzZw4mMbjtnsuKzKa',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'Svrq63vLtErSwbD3W',
    tagName: 'b',
    attrs: {},
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.169Z',
  },
  {
    _id: 'YksHPHB48SWziWfZj',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'kzZw4mMbjtnsuKzKa',
    text: 'stored in the cloud',
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.171Z',
  },
  {
    _id: '3ib8T7jSu9DYHcrCh',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'Svrq63vLtErSwbD3W',
    text: ", in your Lenna's account.",
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.172Z',
  },
  {
    _id: 'qeMSnMuschXCnTCJY',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'SqMnMYN6Sbr4STxDX',
    tagName: 'p',
    attrs: {},
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.173Z',
  },
  {
    _id: 'fqmBdYkNi6qDYy2ob',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'qeMSnMuschXCnTCJY',
    tagName: 'span',
    attrs: {},
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.174Z',
  },
  {
    _id: 'uQ8N7BGYTf5emstRh',
    appId: 'YYvMXNQRgoW8fpXWt',
    pageId: 'F7NbJ3PYxevHMaKFn',
    parentId: 'fqmBdYkNi6qDYy2ob',
    text: 'Copy the HTML to continue with the demo ->',
    structure: {
      type: 'actual',
    },
    createdAt: '2022-04-06T19:36:02.176Z',
  },
]

const expectedHtml = `<div data-component="MainLayout">
    <h1>
        Home
    </h1>
    <p>
        This is a demo page built in Lenna Studio. It was set as the{' '}
        <b>expected HTML</b> for the home.
    </p>
    <p>
        This HTML structure and the CSS being applied is{' '}
        <b>stored in the cloud</b>, in your Lenna's account.
    </p>
    <p>
        <span>
          Copy the HTML to continue with the demo ->
        </span>
    </p>
</div>`

export const DEMO_ELEMENTS = {
  ACTUAL: actualElements,
  EXPECTED: expectedElements,
  EXPECTED_HTML: expectedHtml,
}
