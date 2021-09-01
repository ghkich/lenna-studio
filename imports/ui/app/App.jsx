import 'normalize.css'
import React, {useEffect, useRef, useState} from 'react'
import Axios from 'axios'
import HTML from 'html-parse-stringify'
import {Router} from './Router'

function findElementByText(str, tag = 'button') {
  return Array.prototype.slice
    .call(document.getElementsByTagName(tag))
    .filter((el) => el.textContent.trim() === str.trim())?.[0]
}

const Api = Axios.create({
  baseURL: 'http://localhost:4000',
})

const sendPageData = (route, scenario) => {
  const htmlString = document.getElementById('appWrapper').innerHTML
  const html = HTML.parse(htmlString).filter((h) => h.attrs.class !== 'expected')

  Api.post('/pageData', {route, scenario, html}).then((resp) => {
    const expectedHtml = HTML.stringify(resp.data)
    console.log(expectedHtml)
  })
}

export const App = () => {
  const [routes, setRoutes] = useState([])
  const [selectedRoutePath, setSelectedRoutePath] = useState('')
  const [selectedScenarioName, setSelectedScenarioName] = useState('')

  const selectedRoute = routes?.find((r) => r.path === selectedRoutePath)
  const selectedScenario = selectedRoute?.scenarios?.find((s) => s.name === selectedScenarioName)

  useEffect(() => {
    Api.get('/routes').then((resp) => {
      const currentRoute = resp.data.find((r) => r.path === window.location.pathname)
      setSelectedRoutePath(currentRoute.path)
      setSelectedScenarioName(currentRoute.scenarios[0].name)
      setRoutes(resp.data)
    })
  }, [])

  useEffect(() => {
    if (selectedScenario?.actions?.length) {
      selectedScenario.actions.forEach((action) => {
        if (action.type === 'click') {
          const el = findElementByText(action.targetText)
          el?.click()
        }
      })
    }

    if (selectedRoute && selectedScenario) {
      sendPageData(selectedRoute, selectedScenario)
    }
  }, [selectedScenario])

  const handleChangeRoute = (e) => {
    setSelectedRoutePath(e.target.value)
    window.location.href = e.target.value
  }

  const handleChangeScenario = (e) => {
    setSelectedScenarioName(e.target.value)
  }

  return (
    <>
      <div className="bg-gray-700 bg-opacity-75 border-r border-gray-700 border-opacity-25 p-2 absolute top-0 bottom-0 right-0 z-10 text-xs w-60">
        <div className="w-full pb-1 mb-1 text-white text-opacity-50 border-b border-white border-opacity-10 flex justify-between">
          <div>APIK</div>
          <button>Open Design system</button>
        </div>
        {routes.length && (
          <>
            <label className="pb-1 block text-white">Page</label>
            <select
              value={selectedRoutePath}
              onChange={handleChangeRoute}
              className="p-1 mb-2 border border-gray-300 w-full"
            >
              {routes?.map((route) => (
                <option key={route.path} value={route.path}>
                  {route.name}
                </option>
              ))}
            </select>
            <label className="pb-1 block text-white">Scenario</label>
            <select
              value={selectedScenarioName}
              onChange={handleChangeScenario}
              className="p-1 mb-3 border border-gray-300 w-full"
            >
              {selectedRoute?.scenarios.map((scenario, idx) => (
                <option key={scenario.name} value={scenario.name}>
                  #{idx + 1} - {scenario.description}
                </option>
              ))}
            </select>
            <label className="pb-1 block text-white">Details</label>
            <ul className="pb-1 mb-2 pl-5 text-white text-opacity-50 list-disc">
              <li className="mb-2">It should have the company icon and a message "Loading..."</li>
              <li className="">It should appear for a minimum of 5 seconds</li>
            </ul>
            <label className="pb-1 block text-white">Discussion</label>
            <div className="pb-1 text-white text-opacity-50">gustavokich: I'm not seeing the buttons</div>
            <div className="pb-2 text-white text-opacity-50">marcella: I'm almost done</div>
          </>
        )}
      </div>
      <div id="appWrapper" className={`appWrapper`}>
        <div className="expected" dangerouslySetInnerHTML={{__html: ''}}></div>
        <Router />
      </div>
    </>
  )
}
