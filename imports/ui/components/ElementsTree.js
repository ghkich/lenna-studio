import React, {useState} from 'react'
import {faCaretRight, faCaretDown} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {CUSTOM_DATA_KEY} from '../../infra/constants/lenna-attr-keys'

const Element = ({element, level, renderChildren, onClick}) => {
  const [open, setOpen] = useState(true)

  const className = `px-2 py-0.5 border border-b-0 cursor-pointer ${
    element?.success ? 'bg-green-50' : element?.error ? 'bg-red-50' : 'hover:bg-gray-50 '
  }`
  const style = {paddingLeft: `${level * 12 || 3}px`}

  return (
    <>
      {element.childrenIds?.length > 0 ? (
        <div
          className={className}
          style={style}
          onClick={() => {
            setOpen((prev) => !prev)
            onClick(element)
          }}
        >
          <FontAwesomeIcon icon={open ? faCaretRight : faCaretDown} className="text-2xs" />{' '}
          {element?.attrs?.[CUSTOM_DATA_KEY] || element?.tagName}
        </div>
      ) : (
        <div className={className} style={style} onClick={() => onClick(element)}>
          {element?.attrs?.[CUSTOM_DATA_KEY] || element?.tagName}
        </div>
      )}
      {open && <>{renderChildren(element.childrenIds, level)}</>}
    </>
  )
}

export const ElementsTree = ({elements, onElementClick}) => {
  const containerElement = elements?.find((el) => !el?.parentId)
  if (!containerElement) return null
  let level = 0
  const renderChildren = (childrenIds, level) => {
    if (!childrenIds || childrenIds.length === 0) return null
    level++
    return (
      <>
        {childrenIds?.map((childId) => {
          const element = elements?.find((el) => el?._id === childId)
          if (!element?.tagName) return
          return (
            <Element
              key={element?._id}
              element={element}
              level={level}
              onClick={onElementClick}
              renderChildren={renderChildren}
            />
          )
        })}
      </>
    )
  }
  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="border-b">{renderChildren([containerElement._id], level)}</div>
    </div>
  )
}
