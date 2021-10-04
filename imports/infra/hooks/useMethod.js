import {useEffect, useState} from 'react'
import {Meteor} from 'meteor/meteor'

const METHOD_STATUSES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

export const useMethod = (methodName, opt) => {
  const options = {
    manual: true,
    withParams: {},
    onSuccess: () => {},
    ...opt,
  }
  const [data, setData] = useState()
  const [status, setStatus] = useState(METHOD_STATUSES.IDLE)

  const call = (...args) => {
    setStatus(METHOD_STATUSES.LOADING)
    new Promise((resolve, reject) => {
      Meteor.call(methodName, ...args, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
      .then((result) => {
        setData(result)
        setStatus(METHOD_STATUSES.SUCCESS)
        options.onSuccess(result)
      })
      .catch((error) => {
        console.log(error)
        setStatus(METHOD_STATUSES.ERROR)
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
