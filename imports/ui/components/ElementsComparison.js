import React, {useEffect, useState} from 'react'
import {CUSTOM_ATTR_KEYS} from '../../infra/constants/custom-attr-keys'
import {ElementsTree} from '../containers/elements/ElementsTree'
import {ComponentsCollection} from '../../collections/components'

export const ElementsComparison = ({actual, expected}) => {
  const [error, setError] = useState('')
  const [assertedElements, setAssertedElements] = useState([])
  const [expectedString, setExpectedString] = useState('')
  const [actualString, setActualString] = useState('')

  useEffect(() => {
    let asserted = []
    if (actual?.length > 0 && expected?.length > 0) {
      expected?.every((expectedEl, i) => {
        let newElement = {
          ...actual[i],
          error: true,
        }
        if (expectedEl?.component?._id) {
          const component = ComponentsCollection.findOne(expectedEl?.component?._id)
          if (component?.name !== actual[i]?.attrs?.[CUSTOM_ATTR_KEYS.COMPONENT]) {
            setError(`Wrong component container`)
            setActualString(actual[i]?.attrs?.[CUSTOM_ATTR_KEYS.COMPONENT])
            setExpectedString(expectedEl?.attrs?.[CUSTOM_ATTR_KEYS.COMPONENT])
            asserted.push(newElement)
            return false
          }
        } else {
          if (expectedEl?.attrs?.[CUSTOM_ATTR_KEYS.COMPONENT] !== actual[i]?.attrs?.[CUSTOM_ATTR_KEYS.COMPONENT]) {
            setError(`Wrong component container`)
            setActualString(actual[i]?.attrs?.[CUSTOM_ATTR_KEYS.COMPONENT])
            setExpectedString(expectedEl?.attrs?.[CUSTOM_ATTR_KEYS.COMPONENT])
            asserted.push(newElement)
            return false
          }
        }
        if (expectedEl?.tagName && expectedEl?.tagName !== actual[i]?.tagName) {
          setError(`Wrong tag`)
          setActualString(actual[i]?.tagName)
          setExpectedString(expectedEl?.tagName)
          asserted.push(newElement)
          return false
        }
        const expectedElChildren = expected.filter((e) => e.parentId === expectedEl?._id)
        const actualElChildren = actual.filter((a) => a.parentId === actual[i]?._id)
        if (actualElChildren?.length !== expectedElChildren?.length) {
          setError(`Wrong children length`)
          asserted.push(newElement)
          asserted = [...asserted, ...actualElChildren]
          setActualString(String(actualElChildren?.length || 0))
          setExpectedString(String(expectedElChildren?.length))
          return false
        }
        newElement = {
          ...newElement,
          error: false,
          success: true,
        }
        asserted.push(newElement)
        return true
      })
    }

    setAssertedElements(asserted)
  }, [actual, expected])

  return (
    <div>
      <ElementsTree elements={assertedElements} addElementDisabled />
      {error && (
        <div className="bg-red-50 p-2 mt-2 border border-red-400 text-2xs">
          <div className="pb-1 mb-1 border-b border-red-100 text-red-400 text-xs font-semibold">{error}</div>
          <div className="pb-1">
            <span>Actual: </span>
            <b className="font-semibold">{actualString}</b>
          </div>
          <div>
            Expected: <b className="font-semibold">{expectedString}</b>
          </div>
        </div>
      )}
      {(actual?.length === 0 || expected?.length === 0) && (
        <div className="bg-gray-50 p-2 mt-2 border border-gray-300 text-center text-2xs">
          <div>No elements to compare</div>
        </div>
      )}
      {actual?.length > 0 && expected?.length > 0 && !error && (
        <div className="bg-green-50 p-2 mt-2 border border-green-400 text-2xs">
          <div className="pb-1 mb-1 border-b border-green-100 text-green-400 text-xs font-semibold">Success</div>
          <div>All validations passed</div>
        </div>
      )}
    </div>
  )
}
