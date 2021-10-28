import React, {useState} from 'react'
import {faCaretRight, faCaretDown, faPlus} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {CUSTOM_ATTR_KEYS} from '../../infra/constants/custom-attr-keys'
import {VOID_ELEMENTS} from '../../infra/constants/void-elements'
import {AddElement} from './elements/AddElement'

export const ElementsTree = ({elements, onElementClick}) => {
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
              onClick={(element) => {
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

const checkIfElementAcceptChildren = (element) => element.tagName && !VOID_ELEMENTS.includes(element.tagName)

const Element = ({elements, element, level, renderChildren, onClick, selectedElement}) => {
  const [open, setOpen] = useState(true)

  if (!element) return null

  const isSelected = selectedElement?._id === element._id
  const acceptChildren = checkIfElementAcceptChildren(element)
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
          {element?.attrs?.[CUSTOM_ATTR_KEYS.COMPONENT] || element?.tagName || (
            <span className="text-2xs">Text: "{element?.text}"</span>
          )}
        </div>
        {isSelected && (
          <div>
            {acceptChildren && (
              <button
                type="button"
                className="w-6 h-6 flex items-center justify-center border rounded-sm bg-gray-50 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faPlus} className="" />
              </button>
            )}
          </div>
        )}
      </div>
      {isSelected && (
        <>
          <AddElement element={element} />
          {!acceptChildren && <div>This element does not accept children</div>}
        </>
      )}
      <div className={`${open ? 'block bg-gray-100' : 'hidden'} ${isSelected ? 'p-2' : ''}`}>
        {renderChildren(children, level)}
      </div>
    </div>
  )
}
