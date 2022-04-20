import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {RoutePaths} from '../../app/routes'
import {DemoApp} from './components/DemoApp'
import {BackgroundContainer} from '../../components/basic/BackgroundContainer'
import {Button} from '../../components/basic/Button'

const HomeFooter = () => (
  <>
    <div className="flex justify-center items-center gap-4 my-6">
      <div className="border-b-none border-white pb-0.5 border-opacity-50 hover:border-opacity-100 transition-all">
        <NavLink to={RoutePaths.LOGIN} className="uppercase">
          Go to app
        </NavLink>
      </div>
    </div>
    <h3 className="font-thin text-xs sm:text-2xs mt-8">
      <a href="https://www.gustavokich.com" className="opacity-70 hover:opacity-100" target="_blank">
        A concept by Gustavo Kich
      </a>
    </h3>
    <div>
      <a
        href="https://github.com/ghkich/lenna-studio"
        target="_blank"
        className="inline-block text-white font-thin text-xs sm:text-2xs mt-2 sm:mt-1 mb-6 opacity-50 hover:opacity-100 transition-opacity"
      >
        Source code - Meteor / React / Tailwind CSS
      </a>
    </div>
  </>
)

export const Home = () => {
  const [showInteractiveDemo, setShowInteractiveDemo] = useState(false)
  const [afterTransitionDelay, setAfterTransitionDelay] = useState(false)

  useEffect(() => {
    if (showInteractiveDemo) {
      setTimeout(() => {
        setAfterTransitionDelay(true)
      }, 50)
    }
  }, [showInteractiveDemo])

  return (
    <BackgroundContainer imageUrl="/tareq-ajalyakin-VAGak8u8eiI-unsplash.jpg" className="from-pink-700 to-purple-900">
      <div className={`flex flex-col h-screen w-full justify-center items-center overflow-auto`}>
        <div className={`absolute ${afterTransitionDelay ? 'opacity-0 pointer-events-none' : ''}`}>
          <div className="p-4 w-full max-w-2xl text-xs text-center text-white">
            <div className="mb-8">
              <h1 className="font-thin text-base mt-8">
                <span>Welcome to</span>
                <strong className="block mt-1 mb-2 text-6xl font-thin">Lenna Studio</strong>
              </h1>
              <h2 className="font-thin text-base mb-1 max-w-md mx-auto">
                Your project's <b className="font-light">UI</b> and <b className="font-light">CSS</b> in the cloud
              </h2>
            </div>
            <Button style="transparent" onClick={() => {}} className={`mt-2 flex-1`}>
              Watch demonstration
            </Button>
            <HomeFooter />
          </div>
        </div>
        <div className="p-4 w-full max-w-2xl text-xs text-center text-white">
          <div
            className={`opacity-0 transition-opacity duration-500 pointer-events-none ${
              afterTransitionDelay ? 'opacity-100 pointer-events-auto' : ''
            }`}
          >
            <DemoApp />
            <HomeFooter />
          </div>
        </div>
      </div>
    </BackgroundContainer>
  )
}
