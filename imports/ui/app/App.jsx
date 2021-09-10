import 'normalize.css'
import React, {useEffect, useState} from 'react'
import HTML from 'html-parse-stringify'
import {Router} from './Router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBrowsers, faCube, faPalette, faListRadio} from '@fortawesome/pro-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {Select} from '../components/Select'
library.add(faBrowsers, faCube, faPalette, faListRadio)
import componentsFromApi from '../../infra/data/components'
import {Selector} from '../components/Selector'
import {transformClassToStyle} from '../../api/transformClassToStyle'
import {Components} from '../pages/components'

const tabs = [
  {label: 'Pages', icon: faBrowsers},
  {label: 'Components', icon: faCube},
  {label: 'Theme', icon: faPalette},
  {label: 'Actions', icon: faListRadio},
]

const getAllComponentsFromPageHtml = (html) => {
  const components = []
  const componentNamesAdded = []

  const getComponents = (elements = []) => {
    elements?.forEach((el) => {
      if (el.attrs?.hasOwnProperty('data-component')) {
        const componentName = el.attrs['data-component']
        if (componentNamesAdded.includes(componentName)) return
        components.push({
          name: componentName,
          tag: el.name,
        })
        componentNamesAdded.push(componentName)
      }
      getComponents(el.children)
    })
  }

  const objHtml = HTML.parse(html)
  getComponents(objHtml)

  return components
}

export const App = () => {
  const [pages, setPages] = useState([])
  const [currentPagePath, setCurrentPagePath] = useState('/')
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const [pageComponents, setPageComponents] = useState([])
  const [selectedPageComponentName, setSelectedPageComponentName] = useState()
  const [selectedPageComponent, setSelectedPageComponent] = useState()
  const [componentStyles, setComponentStyles] = useState([])
  const [selectedStyle, setSelectedStyle] = useState()
  const [componentStates, setComponentStates] = useState([])
  const [selectedState, setSelectedState] = useState()
  const [addedSelectors, setAddedSelectors] = useState()
  const [css, setCss] = useState('')

  useEffect(() => {
    import pagesFromApi from '../../api/pages'
    const pages = pagesFromApi
    const currentPagePath = window.location.pathname
    if (!pages.some((page) => page.path === currentPagePath)) {
      pages.push({
        name: currentPagePath.replace('/', '').replace('p', 'P'),
        path: currentPagePath,
        thumbnail: '<div class="w-full h-full bg-gray-300"><div class="h-2 bg-blue-500"></div></div>',
      })
    }
    setPages(pages)
    setCurrentPagePath(currentPagePath)

    const comps = getAllComponentsFromPageHtml(document.getElementById('appWrapper').innerHTML)
    setPageComponents(comps)

    const tabIndexParam = new URLSearchParams(window.location.search).get('tab')
    setSelectedTabIndex(tabIndexParam ? parseInt(tabIndexParam, 10) : 0)

    handleGenerateCss(componentsFromApi)

    setSelectedPageComponentName(comps[0]?.name)
  }, [])

  useEffect(() => {
    if (selectedPageComponentName) {
      import componentsFromApi from '../../infra/data/components'
      const components = componentsFromApi
      if (!components.some((comp) => comp.name === selectedPageComponentName)) {
        components.push({
          name: selectedPageComponentName,
          classes: '',
        })
      }
      const component = components.find((comp) => comp.name === selectedPageComponentName)
      setSelectedPageComponent(component)
      setComponentStyles(component?.styles || [])
      setComponentStates(component?.states || [])
      setSelectedStyle(component?.styles?.[0]?.name)
      setSelectedState(component?.states?.[0]?.name)
    }
  }, [selectedPageComponentName, selectedTabIndex])

  const handleChangePagePath = (path, tabIndex = 0) => {
    setCurrentPagePath(path)
    window.location.href = `${path}?tab=${tabIndex}`
  }

  const handleSelectPage = (e) => {
    handleChangePagePath(e.target.value, 1)
  }

  const handleSelectPageComponentName = (e) => {
    setSelectedPageComponentName(e.target.value)
  }

  const handleSelectStyle = (e) => {
    setSelectedStyle(e.target.value)
  }

  const handleSelectState = (e) => {
    setSelectedState(e.target.value)
  }

  const handleSelectorChange = (selector) => {
    console.log('selector', selector)
    import componentsFromApi from '../../infra/data/components'
    const components = [...componentsFromApi]
    const modifiedComponentIndex = components.findIndex((c) => c.name === selectedPageComponentName)
    let modifiedComponent = selectedPageComponent

    if (selector.state) {
      const modifiedStateIndex = selectedPageComponent?.states?.findIndex((s) => s.name === selector.state)
      const modifiedStates = [...selectedPageComponent?.states]
      const modifiedSelectorIndex = modifiedStates[modifiedStateIndex]?.selectors?.findIndex(
        (sel) => sel.value === selector.value,
      )
      const modifiedSelectors = [...modifiedStates[modifiedStateIndex]?.selectors]
      modifiedSelectors[modifiedSelectorIndex] = selector
      modifiedStates[modifiedStateIndex] = {name: selector.state, selectors: modifiedSelectors}
      modifiedComponent = {
        ...selectedPageComponent,
        states: modifiedStates,
      }
      components[modifiedComponentIndex] = modifiedComponent
      handleGenerateCss(components)
      return
    }

    if (selector.style) {
      components[modifiedComponentIndex] = modifiedComponent
      handleGenerateCss(components)
      return
    }

    if (!selector.value) {
      modifiedComponent = {
        ...selectedPageComponent,
        classes: selector.classes,
      }
      components[modifiedComponentIndex] = modifiedComponent
      handleGenerateCss(components)
      return
    }

    const modifiedSelectorIndex = selectedPageComponent?.selectors?.findIndex((sel) => sel.value === selector.value)
    const modifiedSelectors = [...selectedPageComponent?.selectors]
    if (modifiedSelectorIndex > 0) {
      modifiedSelectors[modifiedSelectorIndex] = selector
    } else {
      modifiedSelectors.push(selector)
    }
    modifiedComponent = {
      ...selectedPageComponent,
      selectors: modifiedSelectors,
    }

    components[modifiedComponentIndex] = modifiedComponent
    handleGenerateCss(components)
  }

  const handleGenerateCss = (components) => {
    console.log(components)
    let styles = ''
    components?.forEach((comp) => {
      styles += `[data-component='${comp.name}'] {`
      comp.classes.split(' ').forEach((className) => {
        styles += transformClassToStyle(className)
      })
      styles += `}`

      comp.selectors?.forEach((sel) => {
        styles += `[data-component='${comp.name}'] ${sel.value} {`
        sel.classes.split(' ').forEach((className) => {
          styles += transformClassToStyle(className)
        })
        styles += `}`
      })

      comp.states?.forEach((state) => {
        state.selectors?.forEach((sel) => {
          styles += `[data-component='${comp.name}'][data-state='${state.name}'] ${sel.value} {`
          sel.classes.split(' ').forEach((className) => {
            styles += transformClassToStyle(className)
          })
          styles += `}`
        })
      })
    })

    setCss(styles)
  }

  const selectedPageComponentState = componentStates?.find((c) => c.name === selectedState)

  return (
    <>
      <style>{css}</style>
      <div className="flex">
        <div id="appWrapper" className={`appWrapper flex-1`}>
          <Router />
        </div>
        <div className="w-1 h-screen bg-black bg-opacity-75"></div>
        <div className="bg-white text-gray-500 text-xs w-80 h-screen">
          <div className="w-full border-b border-gray-200 flex justify-between">
            <div className="flex w-full h-14 justify-between">
              {tabs?.map((tab, idx) => (
                <div
                  key={idx}
                  className={`flex-1 flex flex-col justify-center items-center border-r border-gray-200 cursor-pointer ${
                    idx === selectedTabIndex ? 'bg-gray-100  text-blue-500' : ''
                  }`}
                  onClick={() => setSelectedTabIndex(idx)}
                >
                  <FontAwesomeIcon icon={tab.icon} className={`text-lg mb-1`} />
                  <div className={`text-2xs`}>{tab.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3">
            {selectedTabIndex === 0 && (
              <div>
                <div className="flex justify-end mb-1 pb-1 border-b border-gray-100">
                  <button type="button" className="py-2">
                    Add new page
                  </button>
                </div>
                {pages?.map((page, idx) => (
                  <div key={idx} className={`mb-2 cursor-pointer`} onClick={() => handleChangePagePath(page.path, 1)}>
                    <div className={`${currentPagePath === page.path ? 'text-blue-500' : ''}`}>{page.name}</div>
                    <div
                      className={`flex flex-col justify-center items-center w-full h-40 bg-gray-100 border-4 ${
                        currentPagePath === page.path ? 'border-blue-500' : 'border-gray-300'
                      } hover:opacity-50`}
                      dangerouslySetInnerHTML={{__html: page.thumbnail}}
                    />
                  </div>
                ))}
              </div>
            )}
            {selectedTabIndex === 1 && (
              <>
                <Components />
                <Select
                  value={currentPagePath}
                  onChange={handleSelectPage}
                  options={pages?.map((page) => ({label: page.name, value: page.path}))}
                />
                <div className="pt-1 mb-3 border-b border-gray-200" />
                <Select
                  label="Page components"
                  value={selectedPageComponentName}
                  onChange={handleSelectPageComponentName}
                  options={pageComponents?.map((comp) => ({label: comp.name, value: comp.name}))}
                />
                <Selector
                  selector={{value: '', classes: selectedPageComponent?.classes}}
                  onChange={handleSelectorChange}
                  className="-mt-2"
                />
                {selectedPageComponent?.selectors?.map((selector, idx) => (
                  <Selector key={idx} selector={selector} onChange={handleSelectorChange} />
                ))}
                {!!componentStyles?.length && (
                  <Select
                    label="Component styles"
                    value={selectedStyle}
                    onChange={handleSelectStyle}
                    options={componentStyles?.map((style) => ({label: style.name, value: style.name}))}
                  />
                )}
                {!!componentStates?.length && (
                  <Select
                    label="Component states"
                    value={selectedState}
                    onChange={handleSelectState}
                    options={componentStates?.map((state) => ({label: state.name, value: state.name}))}
                  />
                )}
                {selectedPageComponentState?.selectors?.map((selector, idx) => (
                  <Selector key={idx} selector={selector} state={selectedState} onChange={handleSelectorChange} />
                ))}
                {/*{addedSelectors?.map((selector, idx) => (*/}
                {/*  <Selector key={idx} selector={selector} onChange={handleSelectorChange} />*/}
                {/*))}*/}
                <Selector selector={{value: '> div', classes: ''}} onChange={handleSelectorChange} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
