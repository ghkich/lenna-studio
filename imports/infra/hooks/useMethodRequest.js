import {useEffect, useState} from 'react'
import {methodCall} from '../methodCall'

const RequestStatuses = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

export const useMethodRequest = (methodRequest, opt) => {
  const options = {manual: false, onSuccess: () => {}, ...opt}
  const [data, setData] = useState()
  const [status, setStatus] = useState(RequestStatuses.IDLE)

  const run = async (params) => {
    try {
      setStatus(RequestStatuses.LOADING)
      let response = await methodCall(methodRequest, params)
      setData(response)
      options.onSuccess(response)
    } catch (e) {
      console.error(e)
      setStatus(RequestStatuses.ERROR)
    }
  }

  useEffect(() => {
    if (!options.manual) {
      run(options.with)
    }
  }, [options.manual])

  return {
    run,
    data,
    status,
  }
}
