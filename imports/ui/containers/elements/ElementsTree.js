import React, {useState} from 'react'
import {faCaretRight, faCaretDown, faCheck, faTimes} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {VOID_ELEMENTS} from '../../../infra/constants/void-elements'
import {AddElement} from './AddElement'
import {RemoveElement} from './RemoveElement'
import {ComponentsCollection} from '../../../collections/components'
import {TurnElementIntoChildrenContainer} from './TurnElementIntoChildrenContainer'
import {CUSTOM_ATTR_KEYS} from '../../../infra/constants/custom-attr-keys'

export const ElementsTree = ({
  appId,
  targetComponent,
  targetPage,
  elements,
  addElementDisabled,
  onElementClick,
  maxHeight,
}) => {
  const [selectedElement, setSelectedElement] = useState({})

  const containerElement = elements?.find((el) => !el?.parentId)
  if (!containerElement) return null
  let level = 0
  let childrenCount = 0
  const renderChildren = (children, level) => {
    if (!children || children.length === 0) return null
    level++
    return (
      <>
        {children?.map((element) => {
          childrenCount++
          return (
            <Element
              key={element?._id}
              appId={appId}
              targetComponent={targetComponent}
              targetPage={targetPage}
              element={element}
              elementChildren={elements?.filter((el) => el?.parentId === element._id)}
              selectedElement={selectedElement}
              addElementDisabled={addElementDisabled}
              onClick={(element) => {
                if (addElementDisabled) return null
                onElementClick && onElementClick(element)
                setSelectedElement((prev) => (prev._id !== element._id ? element : {}))
              }}
              level={level}
              renderChildren={renderChildren}
              isLastElement={elements?.length === childrenCount}
            />
          )
        })}
      </>
    )
  }
  return (
    <div className={`max-h-${maxHeight ? maxHeight : '100'} overflow-y-auto border`}>
      <div>{renderChildren([containerElement], level)}</div>
    </div>
  )
}

const checkIfComponentAcceptChildren = (component) => {
  return !!component.childrenContainerElementId
}

const checkIfElementAcceptChildren = (element) => {
  return element.isChildrenContainer || (element.tagName && !VOID_ELEMENTS.includes(element.tagName))
}

const Element = ({
  appId,
  targetComponent,
  targetPage,
  element,
  elementChildren,
  level,
  renderChildren,
  onClick,
  selectedElement,
  isLastElement,
}) => {
  const [open, setOpen] = useState(true)

  if (!element) return null
  const isSelected = selectedElement?._id === element._id
  const elementComponent = ComponentsCollection.findOne(element.component?._id)
  const acceptChildren =
    !element.isChildrenContainer && elementComponent
      ? checkIfComponentAcceptChildren(elementComponent)
      : checkIfElementAcceptChildren(element)

  return (
    <div className={` ${isSelected ? 'bg-gray-100 border-0 hover:bg-gray-100' : 'bg-white'}`}>
      <div
        className={`relative flex items-center gap-1 ${!isLastElement ? 'border-b' : ''} cursor-pointer px-2 ${
          isSelected ? 'h-10' : 'h-6'
        } ${element.success ? 'bg-green-50 bg-opacity-50' : ''} ${element.error ? 'bg-red-50 bg-opacity-50' : ''}`}
        style={{paddingLeft: `${level * 10 || 3}px`}}
        onClick={() => {
          onClick(element)
        }}
      >
        <div className="flex-1 flex items-center w-full">
          {elementChildren?.length > 0 && (
            <button
              type="button"
              className={`px-2 -ml-2 py-1 ${isSelected ? 'py-2' : ''}`}
              onClick={() => {
                setOpen((prev) => !prev)
              }}
            >
              <FontAwesomeIcon icon={open ? faCaretRight : faCaretDown} className="text-2xs" />
            </button>
          )}
          {elementComponent?.name || element?.attrs?.[CUSTOM_ATTR_KEYS.COMPONENT] || element?.tagName || (
            <span className="text-2xs truncate overflow-hidden inline-block w-full pr-4">Text: "{element?.text}"</span>
          )}
          {element.isChildrenContainer && <span className="text-2xs opacity-50"> {'{childrenContainer}'}</span>}
          {element.success && (
            <FontAwesomeIcon
              icon={faCheck}
              className="absolute right-2 top-1.5 text-green-600 text-opacity-50 text-2xs"
            />
          )}
          {element.error && (
            <FontAwesomeIcon
              icon={faTimes}
              className="absolute right-2 top-1.5 text-red-600 text-opacity-50 text-2xs"
            />
          )}
        </div>
        {isSelected && (
          <>
            {targetComponent && !elementComponent && (
              <TurnElementIntoChildrenContainer
                element={element}
                active={element._id === targetComponent?.childrenContainerElementId}
              />
            )}
            <RemoveElement element={element} />
          </>
        )}
      </div>
      {isSelected && (
        <div className="p-2">
          {acceptChildren ? (
            <AddElement
              appId={appId}
              targetComponent={targetComponent}
              targetPage={targetPage}
              parentElement={element}
            />
          ) : (
            <div className="py-1 px-2 bg-gray-300 border bg-opacity-25 text-2xs text-center">
              This element does not accept children
            </div>
          )}
        </div>
      )}
      {elementChildren?.length > 0 && (
        <div className={`${open ? 'block bg-gray-100' : 'hidden'} ${isSelected ? 'p-2' : ''}`}>
          {renderChildren(elementChildren, level)}
        </div>
      )}
    </div>
  )
}
