import React from 'react'
import {STRUCTURE_TYPES} from '../../../../infra/constants/structure-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRightArrowLeft} from '@fortawesome/pro-duotone-svg-icons'

export const ComparisonButtonGroup = ({structureType, onActualClick, onComparisonClick, onExpectedClick}) => {
  return (
    <div className="flex items-center mb-2 gap-8">
      <div
        className={`p-2 flex-1 bg-gray-100 border text-center cursor-pointer rounded-r-none ${
          structureType === STRUCTURE_TYPES.ACTUAL ? 'text-purple-500 bg-purple-50' : ''
        }`}
        onClick={onActualClick}
      >
        Actual
      </div>
      <div className="w-12 h-12 rounded-full bg-white absolute left-1/2 -ml-6 flex justify-center items-center">
        <div
          className={`w-9 h-9 flex justify-center items-center border bg-gray-100 cursor-pointer text-md rounded-full  ${
            structureType === undefined ? 'text-white bg-purple-500 border-purple-600' : ''
          }`}
          onClick={onComparisonClick}
        >
          <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        </div>
      </div>

      <div
        className={`p-2 flex-1 bg-gray-100 border text-center cursor-pointer rounded-l-none ${
          structureType === STRUCTURE_TYPES.EXPECTED ? 'text-purple-500 bg-purple-50' : ''
        }`}
        onClick={onExpectedClick}
      >
        Expected
      </div>
    </div>
  )
}
