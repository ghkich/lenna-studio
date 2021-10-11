import React, {useEffect, useState} from 'react'
import {CUSTOM_DATA_KEY} from '../../infra/constants/lenna-attr-keys'
import {ElementsTree} from './ElementsTree'

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
        if (expectedEl?.attrs?.[CUSTOM_DATA_KEY] !== actual[i]?.attrs?.[CUSTOM_DATA_KEY]) {
          setError(`Wrong component container`)
          setActualString(actual[i]?.attrs?.[CUSTOM_DATA_KEY])
          setExpectedString(expectedEl?.attrs?.[CUSTOM_DATA_KEY])
          asserted.push(newElement)
          return false
        }
        if (expectedEl?.tagName && expectedEl?.tagName !== actual[i]?.tagName) {
          setError(`Wrong tag`)
          setActualString(actual[i]?.tagName)
          setExpectedString(expectedEl?.tagName)
          asserted.push(newElement)
          return false
        }
        if (expectedEl?.childrenIds?.length > 0 && actual[i]?.childrenIds?.length !== expectedEl?.childrenIds?.length) {
          setError(`Wrong children length`)
          asserted.push(newElement)
          const childrenElements = actual.filter((el) => actual[i]?.childrenIds?.includes(el?._id))
          asserted = [...asserted, ...childrenElements]
          setActualString(String(actual[i]?.childrenIds?.length || 0))
          setExpectedString(String(expectedEl?.childrenIds?.length))
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
      <ElementsTree elements={assertedElements} />
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
    </div>
  )
}
