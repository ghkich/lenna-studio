import React, {useState} from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {PageHeader} from '../../components/PageHeader'
import {RoutePaths} from '../../app/routes'
import {useForm} from 'react-hook-form'
import {Button} from '../../components/basic/Button'
import {TextInput} from '../../components/basic/TextInput'
import {ToggleButtonGroup} from '../../components/basic/ToggleButtonGroup'
import {InspirationApps} from '../inspiration/components/InspirationApps'
import {useMethod} from '../../../infra/hooks/useMethod'
import {useHistory} from 'react-router-dom'

const CREATION_TYPES = {
  SCRATCH: 'scratch',
  EXISTING: 'existing',
}

export const NewApp = () => {
  const [selectedCreationType, setSelectedCreationType] = useState(CREATION_TYPES.SCRATCH)
  const {register, handleSubmit} = useForm()
  const history = useHistory()

  const createPagesByIds = useMethod('pages.createByIds', {})

  const createApp = useMethod('apps.create', {
    onSuccess: (appId) => {
      if (appId) {
        if (selectedCreationType === CREATION_TYPES.SCRATCH) {
          history.push(`${RoutePaths.APPS}/${appId}`)
        } else {
        }
      }
    },
  })

  const onSubmit = (data) => {
    createApp.call({name: data.name})
  }

  return (
    <SidebarLayout menuMinimized>
      <PageHeader title="New app" goBackTo={RoutePaths.APPS} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <TextInput register={register} name="name" placeholder="Name to identify your app" />
        <ToggleButtonGroup
          buttons={[
            {value: CREATION_TYPES.SCRATCH, label: 'From scratch'},
            {value: CREATION_TYPES.EXISTING, label: 'From existing'},
          ]}
          activeButton={selectedCreationType}
          onToggle={(value) => setSelectedCreationType(value)}
        />
        {selectedCreationType === CREATION_TYPES.EXISTING && (
          <div>
            <InspirationApps />
          </div>
        )}
        <div className="border-t opacity-50" />
        <Button type="submit" style="primary">
          Create
        </Button>
      </form>
    </SidebarLayout>
  )
}