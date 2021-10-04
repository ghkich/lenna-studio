import {useEffect, useState} from 'react'
import {Meteor} from 'meteor/meteor'

const METHOD_STATUSES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

export const useMethod = (
  methodName,
  options = {
    manual: true,
    withParams: {},
    onSuccess: () => {},
  },
) => {
  const [data, setData] = useState()
  const [status, setStatus] = useState(METHOD_STATUSES.IDLE)

  const call = (...args) => {
    setStatus(METHOD_STATUSES.LOADING)
    new Promise((resolve, reject) => {
      Meteor.call(methodName, ...args, (error, result) => {
        if (error) {
          setStatus(METHOD_STATUSES.ERROR)
          reject(error)
        } else {
          setData(result)
          setStatus(METHOD_STATUSES.SUCCESS)
          resolve(result)
        }
      })
    }).then((result) => {
      options.onSuccess(result)
    })
  }

  useEffect(() => {
    if (!options.manual) {
      call(options.withParams)
    }
  }, [options.manual])

  return {
    call,
    data,
    status,
  }
}
