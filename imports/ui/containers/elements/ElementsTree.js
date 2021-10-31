import React, {useState} from 'react'
import {faCaretRight, faCaretDown} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {VOID_ELEMENTS} from '../../../infra/constants/void-elements'
import {AddElement} from './AddElement'
import {RemoveElement} from './RemoveElement'
import {ComponentsCollection} from '../../../collections/components'

export const ElementsTree = ({elements, allowAddChildren, onElementClick}) => {
  const [selectedElement, setSelectedElement] = useState({})

  const containerElement = elements?.find((el) => !el?.parentId)
  if (!containerElement) return null
  let level = 0
  const renderChildren = (children, level) => {
    if (!children || children.length === 0) return null
    level++
    return (
      <>
        {children?.map((element) => {
          return (
            <Element
              key={element?._id}
              elements={elements}
              element={element}
              selectedElement={selectedElement}
              allowAddChildren={allowAddChildren}
              onClick={(element) => {
                if (!allowAddChildren) return null
                onElementClick && onElementClick(element)
                setSelectedElement((prev) => (prev._id !== element._id ? element : {}))
              }}
              level={level}
              renderChildren={renderChildren}
            />
          )
        })}
      </>
    )
  }
  return (
    <div className="max-h-96 overflow-y-auto border">
      <div>{renderChildren([containerElement], level)}</div>
    </div>
  )
}

const checkIfComponentAcceptChildren = (component) => {
  return !!component.childrenContainerElementId
}

const checkIfElementAcceptChildren = (element) => {
  return element.tagName && !VOID_ELEMENTS.includes(element.tagName)
}

const Element = ({elements, element, level, renderChildren, onClick, selectedElement}) => {
  const [open, setOpen] = useState(true)

  if (!element) return null

  const isSelected = selectedElement?._id === element._id

  let component = ComponentsCollection.findOne(element.component?._id)
  if (!element.parentId) {
    component = ComponentsCollection.findOne(element.componentId)
  }
  const acceptChildren = component ? checkIfComponentAcceptChildren(component) : checkIfElementAcceptChildren(element)
  const children = elements?.filter((el) => el?.parentId === element._id)

  return (
    <div className={` ${isSelected ? 'bg-gray-100 border-0 hover:bg-gray-100' : 'bg-white'}`}>
      <div
        className={`flex justify-between items-center border-b cursor-pointer px-2 ${isSelected ? 'h-10' : 'h-6'}`}
        style={{paddingLeft: `${level * 10 || 3}px`}}
        onClick={() => {
          onClick(element)
        }}
      >
        <div>
          {children?.length > 0 && (
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
          {component?.name || element?.tagName || <span className="text-2xs">Text: "{element?.text}"</span>}
        </div>
        {isSelected && element.parentId && <RemoveElement element={element} />}
      </div>
      {isSelected && (
        <div className="p-2">
          {acceptChildren ? (
            <AddElement element={element} />
          ) : (
            <div className="py-1 px-2 bg-gray-300 border bg-opacity-25 text-2xs text-center">
              This element does not accept children
            </div>
          )}
        </div>
      )}
      {children?.length > 0 && (
        <div className={`${open ? 'block bg-gray-100' : 'hidden'} ${isSelected ? 'p-2' : ''}`}>
          {renderChildren(children, level)}
        </div>
      )}
    </div>
  )
}
