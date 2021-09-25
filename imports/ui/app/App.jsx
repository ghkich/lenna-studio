import 'normalize.css'
import React, {useEffect, useState} from 'react'
import {Router} from './Router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBrowsers, faCube, faPalette, faSwatchbook, faStarOfLife} from '@fortawesome/pro-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {Select} from '../components/Select'
import {Selector} from '../components/Selector'
import {transformClassToStyle} from '../../api/transformClassToStyle'
import {ComponentAttributes} from '../../infra/attributes'
import {useAccounts, useComponents, usePages, useThemes} from './hooks'
import {methodCall} from '../../infra/methodCall'
import {Tags} from '../components/Tags'
import {Textarea} from '../components/Textarea'
import {INITIAL_THEMES_DATA} from '../../infra/data/themes'
import {samples} from '../../infra/data/samples'

library.add(faBrowsers, faCube, faPalette, faSwatchbook, faStarOfLife)

const tabs = [
  {label: 'Pages', icon: faBrowsers},
  {label: 'Structure', icon: faCube},
  {label: 'Samples', icon: faSwatchbook},
  {label: 'Theme', icon: faPalette},
]

const getSelectorsFromComponent = (component) => {
  const selectors = [component?.name]
  let prefix = `>`
  const getSelectorsFromChildren = (children, parent) => {
    children?.forEach((child) => {
      const newSelectors = []

      if (child?.tag) {
        if (!parent) {
          newSelectors.push(`${prefix} ${child.tag}`)
        }

        if (child.classes?.length === 1) {
          newSelectors.push(`${prefix} ${child.tag}.${child.classes[0]}`)
        }

        if (parent?.classes?.length === 1) {
          newSelectors.push(`${prefix} ${parent.tag}.${parent.classes[0]} > ${child.tag}`)
        }

        newSelectors.forEach((newSelector) => {
          if (!selectors.includes(newSelector)) {
            selectors.push(newSelector)
          }
        })

        getSelectorsFromChildren(child?.children, child)
      }
    })
  }
  getSelectorsFromChildren(component?.children)

  return selectors
}

const getPageDataFromHTML = (pageElement, allComponents) => {
  const components = []
  const componentNames = []
  let parentComponentsName = []
  let levelCount = 0
  let mainSelector = `>`
  const getChildrenFromElement = (element, level) => {
    const children = []
    const elementChildren = element.querySelectorAll(':scope > *')
    const elementName = element.getAttribute(ComponentAttributes.NAME)
    if (elementChildren?.length > 0) {
      levelCount++
      parentComponentsName[level] = elementName || parentComponentsName[level - 1]
    }
    let instances = 1
    elementChildren?.forEach((child) => {
      const componentName = child.getAttribute(ComponentAttributes.NAME)
      const componentState = child.getAttribute(ComponentAttributes.STATE)
      const componentStyle = child.getAttribute(ComponentAttributes.STYLE)
      const existentComponent = allComponents?.find((comp) => comp.name === componentName) || {}
      const classes = [...child.classList]
      let selector = `> ${child.tagName?.toLowerCase()}`
      if (classes?.length === 1) {
        selector += `.${classes[0]}`
      }
      mainSelector = mainSelector !== selector ? selector : mainSelector
      const comp = {
        classes,
        name: componentName,
        tag: child.tagName?.toLowerCase(),
        mainSelector,
        ...existentComponent,
        instances,
        activeState: componentState,
        children: getChildrenFromElement(child, levelCount),
        activeStyle: componentStyle,
        parentName: parentComponentsName[level],
      }
      if (!componentNames.includes(componentName)) {
        children.push(comp)
      } else {
        const existentIndex = children.findIndex((e) => e.name === componentName)
        const existentComp = children[existentIndex]
        children[existentIndex] = {...existentComp, instances: existentComp.instances + 1}
      }
      if (componentName)
        if (componentName && !componentNames.includes(componentName)) {
          componentNames.push(componentName)
          components.push(comp)
        }
    })
    return children
  }

  const structure = {
    components,
    children: getChildrenFromElement(pageElement, levelCount),
  }

  console.log(structure)

  return structure
}

const STRUCTURE_VIEWS = {
  ACTUAL: 'actual',
  EXPECTED: 'expected',
}

export const App = () => {
  const [currentPagePath, setCurrentPagePath] = useState('/')
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const [actualPageStructure, setActualPageStructure] = useState({})
  const [expectedPageStructure, setExpectedPageStructure] = useState({})
  const [structureView, setStructureView] = useState(STRUCTURE_VIEWS.ACTUAL)
  const [pageComponents, setPageComponents] = useState([])
  const [allSelectors, setAllSelectors] = useState([])
  const [baseClasses, setBaseClasses] = useState([])
  const [styleClasses, setStyleClasses] = useState([])
  const [stateClasses, setStateClasses] = useState([])
  const [selectedSelector, setSelectedSelector] = useState()
  const [selectedState, setSelectedState] = useState()
  const [selectedStyle, setSelectedStyle] = useState()
  const [selectedPageComponentName, setSelectedPageComponentName] = useState()
  const [selectedPageComponent, setSelectedPageComponent] = useState()
  const [css, setCss] = useState('')
  const [active, setActive] = useState('')
  const [selectedTheme, setSelectedTheme] = useState()
  const [currentAccount, setCurrentAccount] = useState()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')
  const [selectedSample, setSelectedSample] = useState()

  const categories = ['Admin templates', 'Corporate', 'Ecommerce', 'Blogs', 'Landing Pages']
  const componentTypes = ['Pages', 'Layouts', 'Cards', 'Tables', 'Form', 'Controls', 'Text', 'Image']

  const pages = usePages()
  const components = useComponents()
  const themes = useThemes()
  const accounts = useAccounts()

  const pageHTML = document.getElementById('appWrapper')?.innerHTML

  useEffect(() => {
    setCurrentPagePath(window.location.pathname)
    const tabIndexParam = new URLSearchParams(window.location.search).get('tab')
    setSelectedTabIndex(tabIndexParam ? parseInt(tabIndexParam, 10) : 0)
  }, [])

  useEffect(() => {
    if (components?.data?.length > 0 && themes?.data?.length > 0 && accounts?.data?.length > 0) {
      const currentTheme = themes?.data?.find((t) => t.name === accounts?.data?.[0].theme)
      setSelectedTheme(currentTheme)
      setCurrentAccount(accounts?.data?.[0])
      const pageElement = document.getElementById('appWrapper')
      const pageData = getPageDataFromHTML(pageElement, components?.data)
      setActualPageStructure(pageData)
      handleGenerateCss(pageData?.components, currentTheme)
    }
  }, [components.data, themes.data, accounts.data, pageHTML])

  useEffect(() => {
    const pageStructure = pages.data.find((page) => page.path === currentPagePath)
    setExpectedPageStructure(pageStructure)
  }, [pages.data, currentPagePath])

  useEffect(() => {
    let baseClasses = []
    let styleClasses = []
    let stateClasses = []
    if (!selectedSelector || selectedSelector === selectedPageComponent?.name) {
      baseClasses = selectedPageComponent?.classes || []
      if (selectedStyle) {
        styleClasses = selectedPageComponent?.styles?.find((style) => style.value === selectedStyle)?.classes || []
      }
      if (selectedState) {
        stateClasses = selectedPageComponent?.states?.find((state) => state.value === selectedState)?.classes || []
      }
    } else {
      baseClasses = selectedPageComponent?.selectors?.find((sel) => sel.value === selectedSelector)?.classes || []
      if (selectedStyle) {
        const componentStyle = selectedPageComponent?.styles?.find((style) => style.value === selectedStyle)
        styleClasses = componentStyle?.selectors?.find((sel) => sel.value === selectedSelector)?.classes || []
      }
      if (selectedState) {
        const componentState = selectedPageComponent?.states?.find((state) => state.value === selectedState)
        stateClasses = componentState?.selectors?.find((sel) => sel.value === selectedSelector)?.classes || []
      }
    }
    setBaseClasses(baseClasses)
    setStyleClasses(styleClasses)
    setStateClasses(stateClasses)
  }, [selectedPageComponent, selectedSelector, selectedStyle, selectedState])

  useEffect(() => {
    if (components?.data) {
      const newComponent = prepareNewComponent(selectedPageComponent)

      let newComponents = [...components?.data]
      const modifiedComponentIndex = components?.data?.findIndex((c) => c.name === selectedPageComponentName)
      newComponents[modifiedComponentIndex] = newComponent

      handleGenerateCss(newComponents, selectedTheme)
    }
  }, [baseClasses, styleClasses, stateClasses])

  useEffect(() => {
    // const selectors = getSelectorsFromComponent(selectedPageComponent)
    const selectors = [selectedPageComponent?.name]
    selectedPageComponent?.selectors?.forEach((sel) => !selectors.includes(sel.value) && selectors.push(sel.value))
    selectedPageComponent?.states?.forEach((state) =>
      state?.selectors?.forEach((sel) => !selectors.includes(sel.value) && selectors.push(sel.value)),
    )
    selectedPageComponent?.styles?.forEach((style) =>
      style?.selectors?.forEach((sel) => !selectors.includes(sel.value) && selectors.push(sel.value)),
    )
    setAllSelectors(selectors)
  }, [selectedPageComponent])

  const prepareNewComponent = (component) => {
    let newClasses = component?.classes || []
    let newSelectors = component?.selectors ? [...component?.selectors] : []
    let newStates = component?.states ? [...component?.states] : []
    let newStyles = component?.styles ? [...component?.styles] : []

    if (selectedSelector !== component?.name) {
      const modifiedSelectorIndex = newSelectors?.findIndex((sel) => sel.value === selectedSelector)
      if (modifiedSelectorIndex >= 0) {
        newSelectors[modifiedSelectorIndex] = {value: selectedSelector, classes: baseClasses}
      }
    } else {
      if (baseClasses) {
        newClasses = baseClasses
      }
    }

    const modifiedStateIndex = newStates?.findIndex((s) => s.value === selectedState)
    if (modifiedStateIndex >= 0) {
      const modifiedStateSelectors = newStates[modifiedStateIndex]?.selectors
      if (selectedSelector !== component?.name) {
        const modifiedSelectorIndex = modifiedStateSelectors?.findIndex((sel) => sel.value === selectedSelector)
        if (modifiedSelectorIndex >= 0) {
          modifiedStateSelectors[modifiedSelectorIndex] = {value: selectedSelector, classes: stateClasses}
          newStates[modifiedStateIndex].selectors = modifiedStateSelectors
        } else {
          if (selectedSelector) {
            newStates[modifiedStateIndex].selectors.push({value: selectedSelector, classes: stateClasses})
          } else {
            newStates[modifiedStateIndex] = {
              value: selectedState,
              selectors: newStates[modifiedStateIndex].selectors,
              classes: stateClasses,
            }
          }
        }
      } else {
        newStates[modifiedStateIndex] = {
          value: selectedState,
          selectors: newStates[modifiedStateIndex].selectors,
          classes: stateClasses,
        }
      }
    }

    const modifiedStyleIndex = newStyles?.findIndex((s) => s.value === selectedStyle)
    if (modifiedStyleIndex >= 0) {
      const modifiedStyleSelectors = newStyles[modifiedStyleIndex]?.selectors
      if (selectedSelector !== component?.name) {
        const modifiedSelectorIndex = modifiedStyleSelectors?.findIndex((sel) => sel.value === selectedSelector)
        if (modifiedSelectorIndex >= 0) {
          modifiedStyleSelectors[modifiedSelectorIndex] = {value: selectedSelector, classes: styleClasses}
          newStyles[modifiedStyleIndex].selectors = modifiedStyleSelectors
        } else {
          if (selectedSelector) {
            newStyles[modifiedStyleIndex].selectors.push({value: selectedSelector, classes: styleClasses})
          } else {
            newStyles[modifiedStyleIndex] = {
              value: selectedStyle,
              selectors: newStyles[modifiedStyleIndex].selectors,
              classes: styleClasses,
            }
          }
        }
      } else {
        newStyles[modifiedStyleIndex] = {
          value: selectedStyle,
          selectors: newStyles[modifiedStyleIndex].selectors,
          classes: styleClasses,
        }
      }
    }

    return {
      ...component,
      classes: newClasses,
      selectors: newSelectors,
      states: newStates,
      styles: newStyles,
    }
  }

  const createComponent = (comp) => {
    methodCall('components.insert', comp).then((result) => {
      console.log(result)
      setSelectedPageComponent({...comp, _id: result})
    })
  }

  const updateComponent = (comp) => {
    const newComponent = prepareNewComponent(comp)
    methodCall('components.update', newComponent).then((result) => {
      setSelectedPageComponent(newComponent)
    })
  }

  const updateTheme = (theme) => {
    methodCall('themes.update', theme).then((result) => {})
  }

  const updateAccount = (account) => {
    methodCall('accounts.update', account).then((result) => {})
  }

  const handleChangePagePath = (path, tabIndex = 0) => {
    setCurrentPagePath(path)
    window.location.href = `${path}?tab=${tabIndex}`
  }

  const handleSelectPage = (e) => {
    handleChangePagePath(e.target.value, 1)
  }

  const handleSelectComponent = (el) => {
    const compName = el.name || el.parentName
    setSelectedPageComponentName(compName)
    const comp = components?.data?.find((c) => c.name === compName) || el
    setSelectedPageComponent(comp)
    setSelectedSelector(comp?.name)
    setSelectedState(comp?.states?.[0]?.value)
    setSelectedStyle(comp?.styles?.[0]?.value)
  }

  const handleGenerateCss = (components, theme) => {
    let styles = ''
    components?.forEach((comp) => {
      styles += `[data-component='${comp.name}'] {`
      comp.classes.forEach((className) => {
        styles += transformClassToStyle(className, theme)
      })
      styles += `}`

      comp.selectors?.forEach((sel) => {
        styles += `[data-component='${comp.name}'] ${sel.value} {`
        sel.classes.forEach((className) => {
          styles += transformClassToStyle(className, theme)
        })
        styles += `}`
      })

      comp.states?.forEach((state) => {
        styles += `[data-component='${comp.name}'][data-state='${state.value}'] {`
        state.classes?.forEach((className) => {
          styles += transformClassToStyle(className, theme)
        })
        styles += `}`
        state.selectors?.forEach((sel) => {
          styles += `[data-component='${comp.name}'][data-state='${state.value}'] ${sel.value} {`
          sel.classes.forEach((className) => {
            styles += transformClassToStyle(className, theme)
          })
          styles += `}`
        })
      })

      comp.styles?.forEach((style) => {
        styles += `[data-component='${comp.name}'][data-style='${style.value}'] {`
        style.classes?.forEach((className) => {
          styles += transformClassToStyle(className, theme)
        })
        styles += `}`
        style.selectors?.forEach((sel) => {
          styles += `[data-component='${comp.name}'][data-style='${style.value}'] ${sel.value} {`
          sel.classes.forEach((className) => {
            styles += transformClassToStyle(className, theme)
          })
          styles += `}`
        })
      })
    })

    setCss(styles)
  }

  const renderPageStructure = (structure, expected) => {
    let levelCount = 0
    const renderElement = (el, idx, level) => {
      levelCount += 1
      return (
        <div key={`${idx}-${level}`} className={`${level > 0 && active && el.parentName === active ? 'pl-5' : ''} `}>
          <div
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              handleSelectComponent(el)
            }}
          >
            {el.name ? (
              <div
                className={`flex px-2 py-1 bg-gray-50 border-b border-white hover:bg-gray-100`}
                onClick={() => setActive((prev) => (prev === el.name ? '' : el.name))}
                onMouseEnter={() => {
                  const compName = el.name || el.parentName
                  document
                    .querySelectorAll(`[data-component=\'${compName}\']`)
                    .forEach((el) => el?.classList.add('outline-red'))
                }}
                onMouseLeave={() => {
                  const compName = el.name || el.parentName
                  document
                    .querySelectorAll(`[data-component=\'${compName}\']`)
                    .forEach((el) => el?.classList.remove('outline-red'))
                }}
              >
                <div
                  className={`font-semibold ${
                    selectedPageComponentName === el.name ? 'text-blue-500' : 'text-gray-600'
                  }`}
                >
                  {!expected && !el._id ? (
                    <FontAwesomeIcon icon={faStarOfLife} className="text-yellow-500 text-2xs" />
                  ) : (
                    ''
                  )}{' '}
                  {el.name} {el.instances > 1 && <span className="text-2xs text-gray-400">({el.instances})</span>}
                </div>
                {/*{el.activeStyle && <div className="ml-1 text-2xs text-gray-400">/ {el.activeStyle}</div>}*/}
                {/*{el.activeState && <div className="ml-1 text-2xs text-gray-400">/ {el.activeState}</div>}*/}
              </div>
            ) : (
              <div
                className={`${active === `${el.parentName}` ? 'block' : 'hidden'}`}
                onClick={() => {
                  if (el?.mainSelector) {
                    setTimeout(() => {
                      if (allSelectors.some((sel) => sel === el.mainSelector)) {
                        setSelectedSelector(el?.mainSelector)
                      }
                    }, 100)
                  }
                }}
              >
                {el.tag}
                <span>{el.classes?.length === 1 ? `.${el.classes[0]}` : ''}</span>
              </div>
            )}
          </div>
          {el?.children?.map((childElement, idx) => renderElement(childElement, idx, levelCount))}
        </div>
      )
    }

    return structure?.children?.map((childElement, idx) => renderElement(childElement, idx, levelCount))
  }

  return (
    <>
      <style>{css}</style>
      <div className="flex">
        {selectedSample && (
          <div className="absolute top-0 left-0 bottom-0 z-10 bg-white bg-opacity-80" style={{right: '325px'}}>
            <iframe className="w-full h-screen" src={selectedSample.iframeSrc} />
          </div>
        )}
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
                  onClick={() => {
                    setSelectedSample(undefined)
                    setSelectedTabIndex(idx)
                  }}
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
                {pages?.data?.map((page, idx) => (
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
                <Select
                  value={currentPagePath}
                  onChange={handleSelectPage}
                  options={pages?.data?.map((page) => ({label: page.name, value: page.path}))}
                />
                <div className="mt-2 flex">
                  {Object.entries(STRUCTURE_VIEWS).map(([key, value]) => (
                    <div
                      className={`py-1 flex-1 capitalize text-center cursor-pointer ${
                        structureView === STRUCTURE_VIEWS[key]
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-500'
                      }`}
                      onClick={() => setStructureView(value)}
                    >
                      {STRUCTURE_VIEWS[key]}
                    </div>
                  ))}
                </div>
                <div className="bg-white p-2 mb-2 border border-gray-200">
                  {structureView === STRUCTURE_VIEWS.ACTUAL && <div>{renderPageStructure(actualPageStructure)}</div>}
                  {structureView === STRUCTURE_VIEWS.EXPECTED && (
                    <div>{renderPageStructure(expectedPageStructure, true)}</div>
                  )}
                </div>
                {selectedPageComponent?._id && (
                  <>
                    <Select
                      value={selectedSelector}
                      onChange={(e) => {
                        setSelectedSelector(e.target.value)
                      }}
                      options={allSelectors?.map((selector) => ({label: selector, value: selector}))}
                    />
                    <Textarea
                      value={baseClasses?.join(' ')}
                      onChange={(e) => {
                        setBaseClasses(e.target.value.split(' '))
                      }}
                    />
                    {!!selectedPageComponent?.styles?.length && (
                      <>
                        <Tags
                          value={selectedStyle}
                          onChange={(style) => setSelectedStyle(style)}
                          tags={selectedPageComponent?.styles?.map((style) => style.value)}
                        />
                        <Textarea
                          value={styleClasses?.join(' ')}
                          onChange={(e) => {
                            setStyleClasses(e.target.value.split(' '))
                          }}
                        />
                      </>
                    )}
                    {!!selectedPageComponent?.states?.length && (
                      <>
                        <Tags
                          value={selectedState}
                          onChange={(state) => setSelectedState(state)}
                          tags={selectedPageComponent?.states?.map((state) => state.value)}
                        />
                        <Textarea
                          value={stateClasses?.join(' ')}
                          onChange={(e) => {
                            setStateClasses(e.target.value.split(' '))
                          }}
                        />
                      </>
                    )}
                  </>
                )}
                {selectedPageComponent && !selectedPageComponent?._id ? (
                  <>
                    <div className="p-2 bg-yellow-100 border border-yellow-500">
                      <FontAwesomeIcon icon={faStarOfLife} className="text-yellow-500 text-2xs" /> No component found
                    </div>
                    <div className="flex justify-end mt-2 pt-2 border-t border-gray-200">
                      <button
                        className="px-3 py-1 bg-gray-600 rounded text-white text-xs"
                        onClick={() => {
                          createComponent(selectedPageComponent)
                        }}
                      >
                        Create
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-end mt-1 pt-1 border-t border-gray-200">
                    <button
                      className="px-3 py-1 bg-gray-600 rounded text-white text-xs"
                      onClick={() => {
                        updateComponent(selectedPageComponent)
                      }}
                    >
                      Save
                    </button>
                  </div>
                )}
              </>
            )}
            {selectedTabIndex === 2 && (
              <div>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  options={categories.map((category) => ({value: category, label: category}))}
                />
                <div className="mb-2" />
                <Select
                  value={selectedComponentType}
                  onChange={(e) => setSelectedComponentType(e.target.value)}
                  options={componentTypes.map((type) => ({value: type, label: type}))}
                />
                <div className="mt-2">
                  <div>
                    {samples?.data?.map((sample) => (
                      <div
                        className={`mb-1 w-full border-4 border-gray-300 hover:opacity-75 cursor-pointer ${
                          selectedSample?.name === sample.name ? 'border-blue-500' : ''
                        } ${selectedSample && selectedSample?.name !== sample.name ? 'hidden' : ''}`}
                        onClick={() => {
                          if (selectedSample?.name === sample.name) {
                            setSelectedSample(undefined)
                          } else {
                            setSelectedSample(sample)
                          }
                        }}
                      >
                        <div className="w-full flex">
                          <div className="w-16 h-40 bg-gray-800" />
                          <div className="flex flex-col w-full h-40 bg-gray-300">
                            <div className="w-full h-4 bg-white" />
                            <div />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedSample && (
                  <div className="mt-1">
                    {selectedSample?.components.map((comp) => (
                      <div className="p-1 hover:bg-gray-100 cursor-pointer">{comp}</div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {selectedTabIndex === 3 && (
              <div className="p-2">
                <Select
                  defaultValue={selectedTheme?.name}
                  onChange={(e) => {
                    setSelectedTheme(themes?.data?.find((t) => t.name === e.target.value))
                  }}
                  options={themes?.data?.map((theme) => ({value: theme.name, label: theme.name}))}
                />
                {selectedTheme?.colors && (
                  <div className="mt-2">
                    {Object.entries(selectedTheme.colors).map(([key, value], idx) => (
                      <div key={idx} className="flex">
                        <label className="capitalize w-20">{key}</label>
                        <input
                          type="text"
                          value={selectedTheme.colors[key]}
                          onChange={(e) =>
                            setSelectedTheme({
                              ...selectedTheme,
                              colors: {...selectedTheme.colors, [key]: e.target.value},
                            })
                          }
                          className="flex-1 p-1"
                          style={{backgroundColor: selectedTheme.colors[key], color: 'white'}}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-end mt-2 pt-2 border-t border-gray-200">
                  <button
                    className="px-3 py-1 mr-2 bg-gray-400 rounded text-white text-xs"
                    onClick={() => {
                      const themeDefaults = INITIAL_THEMES_DATA.find((t) => t.name === selectedTheme.name)
                      updateTheme({_id: selectedTheme._id, ...themeDefaults})
                      setSelectedTheme(themeDefaults)
                    }}
                  >
                    Reset to theme defaults
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-600 rounded text-white text-xs"
                    onClick={() => {
                      updateAccount({...currentAccount, theme: selectedTheme.name})
                      updateTheme(selectedTheme)
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
