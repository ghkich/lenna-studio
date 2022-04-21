import React from 'react'
import {STRUCTURE_TYPES} from '../../../../infra/constants/structure-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRightArrowLeft} from '@fortawesome/pro-duotone-svg-icons'

export const ComparisonButtonGroup = ({structureType, onActualClick, onComparisonClick, onExpectedClick}) => {
  return (
    <div className="flex items-center mb-2 gap-8">
      <div
        className={`p-2 flex-1 bg-gray-50 border text-center cursor-pointer rounded-r-none ${
          structureType === STRUCTURE_TYPES.ACTUAL ? 'text-gray-700 bg-gray-100 font-semibold' : ''
        }`}
        onClick={onActualClick}
      >
        Actual
      </div>
      <div className="w-12 h-8.5 border-r border-l bg-white absolute left-1/2 -ml-6 flex justify-center items-center transform -skew-x-12">
        <div
          className={`w-8.5 h-8.5 flex justify-center items-center border bg-gray-50 cursor-pointer text-md ${
            structureType === undefined ? 'text-white bg-gray-700 border-gray-800' : ''
          }`}
          onClick={onComparisonClick}
        >
          <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        </div>
      </div>

      <div
        className={`p-2 flex-1 bg-gray-50 border text-center cursor-pointer rounded-l-none ${
          structureType === STRUCTURE_TYPES.EXPECTED ? 'text-gray-700 bg-gray-100 font-semibold' : ''
        }`}
        onClick={onExpectedClick}
      >
        Expected
      </div>
    </div>
  )
}
