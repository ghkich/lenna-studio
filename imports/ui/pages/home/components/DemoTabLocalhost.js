import React from 'react'
import {STRUCTURE_TYPES} from '../../../../infra/constants/structure-types'
import {DemoSidebarLayout} from './DemoSidebarLayout'
import {DemoTextBubble} from './DemoTextBubble'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRightLong} from '@fortawesome/pro-solid-svg-icons'
import {ComparisonButtonGroup} from '../../pages/components/ComparisonButtonGroup'
import {ElementsTree} from '../../../containers/elements/ElementsTree'
import {DEMO_ELEMENTS} from './DemoElements'
import {ElementsComparison} from '../../../components/ElementsComparison'
import {DemoButton} from './DemoButton'
import {useDemoContext} from './DemoContext'

export const ExpectedPage = ({hideCopyMessage}) => (
  <div className="p-6">
    <h1 className="font-bold text-lg text-center pb-2 uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
      Home
    </h1>
    <DemoTextBubble>
      This is a demo page built in Lenna Studio. It was set as the <b className="text-pink-600">expected HTML</b> for
      the home.
    </DemoTextBubble>
    <DemoTextBubble>
      This HTML structure and the CSS being applied is <b className="text-pink-600">stored in the cloud</b>, in your
      Lenna's account.
    </DemoTextBubble>
    {!hideCopyMessage && (
      <p className="my-6 text-center">
        <span className="opacity-75">
          Copy the HTML to continue with the demo <FontAwesomeIcon icon={faArrowRightLong} />{' '}
        </span>
      </p>
    )}
  </div>
)

const ActualPage = () => {
  const {state} = useDemoContext()

  if (state.fileSelected === 'home') {
    return <ExpectedPage />
  }

  return (
    <div className="bg-white h-full p-2">
      <h1 className="text-base pb-1">Home</h1>
      <p className="pb-1">This is the home page HTML of the project.</p>
      <p className="pb-1">There is no CSS for this page because this is not the expected HTML.</p>
      <p className="pb-1">
        You can use the Lenna sidebar on the right, which was loaded by the script you just pasted, to check the
        expected structure.
      </p>
    </div>
  )
}

export const DemoTabLocalhost = () => {
  const {state, actions} = useDemoContext()

  return (
    <div className="flex relative">
      <div className="bg-white w-full h-92 flex flex-col rounded-md text-gray-600 text-left overflow-hidden">
        <div className="h-8 px-3 flex gap-1 items-center bg-white border-b">
          <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
          <div className="w-2/3 h-5 bg-gray-100 border rounded-md text-gray-500 text-center text-2xs mx-auto">
            localhost:5000
          </div>
        </div>
        <div className="bg-white w-full h-84 flex">
          <DemoSidebarLayout
            height={84}
            startWithSidebarHidden={true}
            content={
              <>
                {state.structureType === STRUCTURE_TYPES.ACTUAL ? <ActualPage /> : <ExpectedPage />}
                {!state.structureType && state.demoEnd && (
                  <div className="absolute top-0 right-0 bottom-0 left-0 z-20 p-8 sm:p-12 backdrop-filter backdrop-blur flex justify-center items-center">
                    <div className="bg-white bg-opacity-90 flex flex-col p-4 w-full max-w-sm mx-auto rounded-md shadow-lg text-gray-500">
                      <h3 className="uppercase text-center font-semibold">Structure validated</h3>
                      <hr className="my-3" />
                      <p className="pb-2">
                        As you can see in the sidebar, the actual HTML of the home <b>is now matching</b> the expected.
                      </p>
                      <p className="pb-2">
                        That means the page was developed exactly <b>how it was designed</b>.
                      </p>
                      <p>Any change you make to your project can be seen in Lenna Studio and vice versa.</p>
                      <hr className="my-3" />
                      <button
                        type="button"
                        onClick={() => actions.resetState()}
                        className="uppercase hover:opacity-75 transition-opacity"
                      >
                        Restart demo
                      </button>
                    </div>
                  </div>
                )}
              </>
            }
            sidebarContent={
              <div className="">
                <ComparisonButtonGroup
                  structureType={state.structureType}
                  onActualClick={() => {
                    actions.setStructureType(STRUCTURE_TYPES.ACTUAL)
                  }}
                  onComparisonClick={() => {
                    actions.setStructureType(undefined)
                  }}
                  onExpectedClick={() => {
                    actions.setStructureType(STRUCTURE_TYPES.EXPECTED)
                  }}
                />
                {state.structureType === STRUCTURE_TYPES.ACTUAL && (
                  <>
                    <ElementsTree elements={state.actualElements} addElementDisabled maxHeight={32} />
                  </>
                )}
                {!state.structureType && (
                  <ElementsComparison actual={state.actualElements} expected={state.expectedElements} maxHeight={32} />
                )}
                {state.structureType === STRUCTURE_TYPES.EXPECTED && (
                  <>
                    <ElementsTree elements={state.expectedElements} maxHeight={32} />
                    <hr className="my-3" />
                    <DemoButton
                      style="primary"
                      onClick={async () => {
                        await navigator.clipboard.writeText(DEMO_ELEMENTS.EXPECTED_HTML)
                        actions.setActiveTabId('project')
                        actions.setFileSelected('home')
                      }}
                    >
                      Copy expected HTML
                    </DemoButton>
                  </>
                )}
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}
