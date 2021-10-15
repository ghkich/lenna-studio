import React from 'react'
import {NavLink} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/pro-solid-svg-icons'

export const ListControls = ({searchValue, onSearch, placeholder, onAddClickGoTo}) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="">
          <input
            type="text"
            placeholder={placeholder || 'Search...'}
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            className="py-2 px-1 w-full outline-none"
          />
        </div>
      </div>
      <div className="">
        <NavLink
          to={onAddClickGoTo}
          className="w-10 h-6 flex items-center justify-center border rounded-sm bg-gray-50 hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faPlus} className="" />
        </NavLink>
      </div>
    </div>
  )
}
