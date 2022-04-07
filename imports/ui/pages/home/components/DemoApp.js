import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLoader} from '@fortawesome/pro-solid-svg-icons'
import {DEMO_TABS, DemoProvider, useDemoContext} from './DemoContext'

const App = () => {
  const {state} = useDemoContext()

  return (
    <section className="flex flex-col w-full mt-4 mb-10">
      <div className="flex items-center justify-center">
        <div className="flex relative">
          <div
            className="h-16 w-24 bg-white rounded-t absolute transition-transform bg-opacity-10"
            style={{transform: `translateX(${DEMO_TABS.findIndex((tab) => tab.id === state.activeTabId) * 96}px)`}}
          />
          {DEMO_TABS.map((tab) => (
            <div
              key={tab.id}
              className={`flex flex-col justify-center h-16 w-24 relative z-10 cursor-pointer ${
                tab.id === state.activeTabId ? 'text-white' : 'opacity-50'
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} className="text-2xl" />
              <h2 className="text-2xs mt-1">{tab.label}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-full h-96">
        {state.loading && (
          <div className="absolute right-2 bottom-2 top-2 left-2 z-30 bg-white bg-opacity-90 rounded-md flex justify-center items-center">
            <FontAwesomeIcon icon={faLoader} className="text-purple-500 text-2xl animate-spin" />
          </div>
        )}
        {DEMO_TABS.map(({id, component: TabContent}) => (
          <div
            key={id}
            className={`${
              state.activeTabId === id ? 'opacity-1' : 'opacity-0 pointer-events-none'
            } absolute right-0 bottom-0 top-0 left-0 pt-2 p-2 bg-white shadow-lg bg-opacity-20 rounded-lg`}
          >
            <TabContent idx={id} />
          </div>
        ))}
      </div>
    </section>
  )
}

export const DemoApp = () => (
  <DemoProvider>
    <App />
  </DemoProvider>
)
