import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faTimes} from '@fortawesome/pro-light-svg-icons'
import {faFile, faFolder} from '@fortawesome/pro-solid-svg-icons'
import {faHtml5} from '@fortawesome/free-brands-svg-icons'
import {DemoButton} from './DemoButton'
import CodeHighlight from '../../../components/basic/CodeHighlight/CodeHighlight'
import {DEMO_APP_ID, useDemoContext} from './DemoContext'
import {DEMO_ELEMENTS} from './DemoElements'

const INITIAL_CODE_STRING = `<html lang="en">
  <head>
    <meta charSet="utf-8" />
    <meta name="description" content="" />
    <link rel="icon" href="%svelte.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %svelte.head%
    
    
    
  </head>
  <body>
    <div id="svelte-root">%svelte.body%</div>
  </body>
</html>`

export const DemoTabProject = () => {
  const [buildingMessage, setBuildingMessage] = useState('')
  const [lineSelection, setLineSelection] = useState('')
  const [codeString, setCodeString] = useState(INITIAL_CODE_STRING)
  const {state, actions} = useDemoContext()

  useEffect(() => {
    if (state.demoEnd) {
      setBuildingMessage('')
      setLineSelection('')
      setCodeString(INITIAL_CODE_STRING)
    }
  }, [state.demoEnd])

  useEffect(() => {
    if (state.fileSelected === 'home') {
      setBuildingMessage('')
      setLineSelection('1-9')
      setCodeString(`<div>
  <h1>Home</h1>
  <p>This is the home page HTML of the project.</p>
  <p>There is no CSS for this page because this is not the expected HTML.</p>
  <p>
    You can use the Lenna sidebar on the right, which was loaded by the script you just pasted, to check
    the expected structure.
  </p>
</div>`)
    }
  }, [state.fileSelected])

  const startBuildingApp = ({onEnd}) => {
    setTimeout(() => {
      setBuildingMessage('Building packages...')
    }, 600)
    setTimeout(() => {
      setBuildingMessage('Building the application...')
    }, 1500)
    setTimeout(() => {
      setBuildingMessage('App running at: http://localhost:5000')
    }, 4500)
    setTimeout(() => {
      onEnd()
    }, 5500)
  }

  const handlePasteScript = () => {
    startBuildingApp({
      onEnd: () => {
        actions.setActiveTabId('localhost')
      },
    })
    setLineSelection('8-12')
    setCodeString(`<html lang="en">
  <head>
    <meta charSet="utf-8" />
    <meta name="description" content="" />
    <link rel="icon" href="%svelte.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %svelte.head%
    <script
      id="__lenna-script"
      data-app-id="${DEMO_APP_ID}"
      src="${window.location.origin}/sync-script.js"
    ></script>
  </head>
  <body>
    <div id="svelte-root">%svelte.body%</div>
  </body>
</html>`)
  }

  const handlePasteExpected = () => {
    startBuildingApp({
      onEnd: () => {
        actions.setActiveTabId('localhost')
        actions.setStructureType(undefined)
        actions.setActualElements(DEMO_ELEMENTS.EXPECTED)
        actions.setDemoEnd(true)
      },
    })
    setLineSelection('')
    setCodeString(`<div data-component="MainLayout">
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
</div>`)
  }

  return (
    <div className="flex relative rounded-md overflow-hidden">
      <div
        className={`absolute bottom-0 bg-gray-900 h-24 w-full z-10 text-left transition-transform transform translate-y-${
          buildingMessage ? '0' : '24'
        }`}
      >
        <div className="w-full px-2 py-1 bg-gray-800 text-2xs border-t border-gray-700 text-gray-400">
          Terminal: Local
        </div>
        <div className="p-2 text-xs text-gray-300">{buildingMessage}</div>
      </div>
      <div className="w-1/3 hidden sm:block bg-gray-700 border border-gray-800 border-opacity-25">
        <div className="flex items-center gap-1 px-2 py-2">
          <FontAwesomeIcon icon={faChevronDown} className="text-2xs mr-1" />
          <FontAwesomeIcon icon={faFolder} />
          src
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-2 ${
            state.fileSelected === 'index' ? 'bg-gray-500 bg-opacity-25' : ''
          }`}
        >
          <FontAwesomeIcon icon={faHtml5} className="text-red-400" />
          index.html
        </div>
        <div className="flex items-center gap-1 px-7 py-2">
          <FontAwesomeIcon icon={faChevronDown} className="text-2xs mr-1" />
          <FontAwesomeIcon icon={faFolder} />
          routes
        </div>
        <div
          className={`flex items-center gap-1 px-11 py-2 ${
            state.fileSelected === 'home' ? 'bg-gray-500 bg-opacity-25' : ''
          }`}
        >
          <FontAwesomeIcon icon={faFile} className="text-red-400" />
          index.svelte
        </div>
        <div className="flex items-center gap-1 px-11 py-2">
          <FontAwesomeIcon icon={faFile} className="text-red-400" />
          login.svelte
        </div>
      </div>
      <div className="w-full sm:w-2/3 bg-gray-800">
        <div className="w-full h-92 relative">
          <div className="flex gap-px bg-gray-700 border-t border-gray-800 border-opacity-25">
            <div className={`${state.fileSelected === 'index' ? 'bg-gray-700' : 'bg-gray-800 text-gray-400'}`}>
              <div className="w-24 py-1 flex justify-center items-center bg-gray-500 bg-opacity-50">
                index.html
                <FontAwesomeIcon icon={faTimes} className="pl-2 opacity-50" />
              </div>
            </div>
            {state.fileSelected === 'home' && (
              <div className="bg-gray-700">
                <div className="w-24 py-1 flex justify-center items-center bg-gray-500 bg-opacity-50">
                  index.svelte
                  <FontAwesomeIcon icon={faTimes} className="pl-2 opacity-50" />
                </div>
              </div>
            )}
          </div>
          {state.fileSelected === 'home' && lineSelection && (
            <div className="absolute left-20 top-40 mt-5 z-10">
              <DemoButton style="primary" onClick={handlePasteExpected} className="w-48">
                Paste expected HTML
              </DemoButton>
            </div>
          )}
          {state.fileSelected === 'index' && !lineSelection && (
            <div className="absolute left-10 top-40 mt-3 z-10">
              <DemoButton style="primary" onClick={handlePasteScript} className="w-48">
                Paste script
              </DemoButton>
            </div>
          )}
          <CodeHighlight language="html" lineSelectionRange={lineSelection} code={codeString} />
        </div>
      </div>
    </div>
  )
}
