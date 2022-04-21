import {DemoTextBubble} from './DemoTextBubble'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRightLong, faEye} from '@fortawesome/pro-solid-svg-icons'
import {TextInput} from '../../../components/basic/TextInput'
import {Button} from '../../../components/basic/Button'
import {faChevronDown} from '@fortawesome/pro-light-svg-icons'
import React from 'react'
import {ExpectedPage} from './DemoTabLocalhost'

export const DEMO_PAGES = [
  // {
  //   _id: 'home',
  //   name: 'Home',
  //   content: <ExpectedPage hideCopyMessage />,
  // },
  {
    _id: 'home',
    name: 'Home',
    content: (
      <div className="h-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-100 text-gray-500">
        <div className="p-6">
          <h2 className="font-bold text-lg text-center pb-2 uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-gray-700">
            How it works
          </h2>
          <DemoTextBubble>
            <b className="text-pink-600">1.</b> After creating an account and login in, you will be able to create an
            app.
          </DemoTextBubble>
          <DemoTextBubble>
            <b className="text-pink-600">2.</b> An app can be created <b className="text-pink-600">blank</b> (without
            any page) or have its pages <b className="text-pink-600">copied</b> from other apps.
          </DemoTextBubble>
          <DemoTextBubble>
            <b className="text-pink-600">3.</b> When copying, it's possible to visualize a preview of the page by
            clicking on the <FontAwesomeIcon icon={faEye} className="text-pink-600" /> icon.
          </DemoTextBubble>
          <p className="my-6 text-center">
            <b className="text-pink-500">Try it!</b>{' '}
            <span className="opacity-75">
              Use the sidebar to create an app <FontAwesomeIcon icon={faArrowRightLong} />{' '}
            </span>
          </p>
        </div>
      </div>
    ),
  },
  {
    _id: 'login',
    name: 'Login',
    content: (
      <div className="bg-gradient-to-br from-gray-100 to-gray-100 p-6 h-full flex flex-col justify-center">
        <div className="flex flex-col gap-2 bg-white bg-opacity-50 border border-white border-opacity-100 p-4 rounded w-48 mx-auto">
          <TextInput
            placeholder="username"
            className="w-full bg-white bg-opacity-75 border border-white border-opacity-100 placeholder-gray-500 placeholder-opacity-50"
          />
          <TextInput
            placeholder="password"
            className="w-full bg-white bg-opacity-75 border border-white border-opacity-100 placeholder-gray-500 placeholder-opacity-50"
          />
          <hr className="my-0.5 border-white" />
          <Button style="primary" className="bg-pink-500">
            Login
          </Button>
        </div>
      </div>
    ),
  },
  {
    _id: 'dashboard',
    name: 'Dashboard',
    content: (
      <div className="bg-gradient-to-br from-gray-100 to-gray-100 h-full">
        <div className="px-6 pt-6 flex items-center justify-between">
          <h2 className="font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-gray-700 flex-1">
            Dashboard
          </h2>
          <span className="text-2xs opacity-50">
            username <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </div>
        <div className="p-6 pt-4 grid grid-cols-3 grid-rows-2 gap-2">
          <div className="bg-white bg-opacity-75 border border-white border-opacity-100 rounded col-span-2 h-20" />
          <div className="bg-white bg-opacity-75 border border-white border-opacity-100 rounded h-20" />
          <div className="bg-white bg-opacity-75 border border-white border-opacity-100 rounded h-20" />
          <div className="bg-white bg-opacity-75 border border-white border-opacity-100 rounded h-20" />
          <div className="bg-white bg-opacity-75 border border-white border-opacity-100 rounded h-20" />
          <div className="bg-white bg-opacity-75 border border-white border-opacity-100 rounded h-20" />
          <div className="bg-white bg-opacity-75 border border-white border-opacity-100 rounded col-span-2 h-20" />
        </div>
      </div>
    ),
  },
]
