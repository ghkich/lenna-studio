import React, {useState} from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {PageHeader} from '../../components/PageHeader'
import {RoutePaths} from '../../app/routes'
import {useForm} from 'react-hook-form'
import {Button} from '../../components/basic/Button'
import {TextInput} from '../../components/basic/TextInput'
import {ToggleButtonGroup} from '../../components/basic/ToggleButtonGroup'
import {useMethod} from '../../../infra/hooks/useMethod'
import {useHistory} from 'react-router-dom'
import {CREATION_OPTIONS, CREATION_TYPES} from '../../../infra/constants/creation-types'

export const NewComponent = () => {
  const [selectedCreationType, setSelectedCreationType] = useState(CREATION_TYPES.SCRATCH)
  const {register, handleSubmit} = useForm()
  const history = useHistory()

  const createElementsByIds = useMethod('elements.createByIds', {})

  const createComponent = useMethod('components.create', {
    onSuccess: (componentId) => {
      if (componentId) {
        if (selectedCreationType === CREATION_TYPES.SCRATCH) {
          history.push(`${RoutePaths.COMPONENTS}/${componentId}`)
        } else {
        }
      }
    },
  })

  const onSubmit = ({name}) => {
    createComponent.call({name})
  }

  return (
    <SidebarLayout menuMinimized>
      <PageHeader title="New component" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <TextInput register={register} name="name" placeholder="Name" />
        <ToggleButtonGroup
          buttons={CREATION_OPTIONS}
          activeButton={selectedCreationType}
          onToggle={(value) => setSelectedCreationType(value)}
        />
        {selectedCreationType === CREATION_TYPES.SCRATCH && (
          <>
            <TextInput register={register} name="structure" placeholder="Structure (div > div + div)" />
          </>
        )}
        {selectedCreationType === CREATION_TYPES.EXISTING && <div></div>}
        <div className="border-t opacity-50" />
        <Button type="submit" style="primary">
          Create
        </Button>
      </form>
    </SidebarLayout>
  )
}
