import React from 'react'
import {FormProvider, useForm} from 'react-hook-form'

export const Form = ({onSubmit, defaultValues, className, children}) => {
  const methods = useForm({defaultValues})

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={`flex flex-col gap-2 ${className}`}>
        {children}
      </form>
    </FormProvider>
  )
}
