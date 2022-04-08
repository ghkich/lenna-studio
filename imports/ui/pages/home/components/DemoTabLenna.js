import React, {useEffect, useState} from 'react'
import {DEMO_PAGES} from './DemoPages'
import {CREATION_OPTIONS, CREATION_TYPES} from '../../../../infra/constants/creation-types'
import {DemoSidebarLayout} from './DemoSidebarLayout'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle} from '@fortawesome/pro-light-svg-icons'
import {Textarea} from '../../../components/basic/Textarea'
import {DemoButton} from './DemoButton'
import {TextInput} from '../../../components/basic/TextInput'
import {ToggleButtonGroup} from '../../../components/basic/ToggleButtonGroup'
import {Select} from '../../../components/basic/Select'
import {faEye} from '@fortawesome/pro-solid-svg-icons'
import {DEMO_APP_ID, useDemoContext} from './DemoContext'

export const DemoTabLenna = () => {
  const [pagesCheckedState, setPagesCheckedState] = useState({[DEMO_PAGES[0]._id]: true})
  const [selectedPage, setSelectedPage] = useState(DEMO_PAGES[0])
  const [selectedCreationType, setSelectedCreationType] = useState(CREATION_TYPES.COPY)
  const [appCreated, setAppCreated] = useState(false)
  const {state, actions} = useDemoContext()

  useEffect(() => {
    if (state.demoEnd) {
      setAppCreated(false)
      setPagesCheckedState({[DEMO_PAGES[0]._id]: true})
      setSelectedPage(DEMO_PAGES[0])
      setSelectedCreationType(CREATION_TYPES.COPY)
    }
  }, [state.demoEnd])

  const handleCheckPage = (e) => {
    const pageId = e.target.name
    const isChecked = e.target.checked
    setPagesCheckedState((prev) => ({...prev, [pageId]: isChecked}))
  }

  const handleSelectPage = (page) => {
    setSelectedPage(page)
  }

  return (
    <DemoSidebarLayout
      refreshDeps={[appCreated]}
      content={
        appCreated ? (
          <div className="flex flex-col h-full w-full justify-center items-center">
            <div className="w-full max-w-sm p-6 text-xs font-light text-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-3xl mb-1 text-purple-400" />
              <h1 className="text-xl mb-3 text-purple-500 font-normal">App created</h1>
              <p className="text-md mb-3">
                Now, copy and paste the script below into the <b className="text-purple-500">&lt;head&gt;</b> of your
                project to start syncing it with Lenna Studio
              </p>
              <Textarea
                value={`\<script id="__lenna-script" data-app-id="${DEMO_APP_ID}" src="${window.location.origin}/sync-script.js"\>\</script\>`}
                className="w-full mb-3 p-2 border h-16 text-gray-400 leading-tight bg-white bg-opacity-75 border border-white rounded"
              />
              <div className="flex gap-2">
                <DemoButton style="primary" className="flex-1" onClick={() => actions.setActiveTabId('project')}>
                  Copy script
                </DemoButton>
              </div>
              <p className="mt-3 mx-auto">
                You are free to use it with <b className="text-purple-500">any framework</b>, as long as the generated
                code is HTML.
              </p>
              <hr className="my-3 mx-auto" />
              <p className="opacity-75 text-2xs">Copy the script to continue with the demo</p>
            </div>
          </div>
        ) : (
          <>{DEMO_PAGES.find((page) => page._id === selectedPage?._id)?.content}</>
        )
      }
      sidebarContent={
        appCreated ? (
          <>
            <TextInput defaultValue="My new app" />
            <hr className="my-0.5 opacity-75" />
            <div className="flex flex-col gap-1">
              {DEMO_PAGES.map((page) => (
                <div key={page._id} className="px-2 py-1 border cursor-pointer">
                  {page.name}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <TextInput defaultValue="My new app" />
            <ToggleButtonGroup
              buttons={CREATION_OPTIONS}
              activeButton={selectedCreationType}
              onToggle={(value) => setSelectedCreationType(value)}
            />
            {selectedCreationType === CREATION_TYPES.COPY && (
              <>
                <Select options={[{value: 0, label: 'Sample app'}]} />
                {DEMO_PAGES.map((page) => (
                  <div className="relative" key={page._id}>
                    <label
                      className="flex items-center border mb-0.5 px-2 py-1.5 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSelectPage(page)}
                    >
                      <input
                        type="checkbox"
                        name={page._id}
                        checked={pagesCheckedState[page._id] || false}
                        onChange={handleCheckPage}
                        className="mr-1.5"
                      />
                      <span>{page.name}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleSelectPage(page)}
                      className="py-1 px-3 text-xs text-gray-300 rounded absolute right-0 top-1"
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className={selectedPage?._id === page?._id ? 'text-purple-500' : ''}
                      />
                    </button>
                  </div>
                ))}
              </>
            )}
            <hr className="my-1" />
            <DemoButton
              style="primary"
              onClick={() => {
                actions.setLoading(true)
                setTimeout(() => {
                  actions.setLoading(false)
                  setAppCreated(true)
                }, 500)
              }}
              className="w-full relative z-10"
            >
              Create app
            </DemoButton>
          </>
        )
      }
    />
  )
}
