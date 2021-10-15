import React from 'react'
import {useHistory} from 'react-router-dom'
import {faArrowLeft} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const PageHeader = ({title, goBackTo}) => {
  const history = useHistory()

  return (
    <button
      type="button"
      className="flex items-center gap-2 pb-3 hover:opacity-75 cursor-pointer"
      onClick={() => (goBackTo ? history.push(goBackTo) : history.goBack())}
    >
      <FontAwesomeIcon icon={faArrowLeft} className="" />
      <h2 className="leading-none">{title}</h2>
    </button>
  )
}
