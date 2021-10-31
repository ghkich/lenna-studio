import React, {useState} from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {PageHeader} from '../../components/PageHeader'
import {RoutePaths} from '../../app/routes'
import {Button} from '../../components/basic/Button'
import {TextInput} from '../../components/basic/TextInput'
import {ToggleButtonGroup} from '../../components/basic/ToggleButtonGroup'
import {InspirationApps} from '../inspiration/components/InspirationApps'
import {useMethod} from '../../../infra/hooks/useMethod'
import {useHistory} from 'react-router-dom'
import {CREATION_OPTIONS, CREATION_TYPES} from '../../../infra/constants/creation-types'
import {Form} from '../../components/form/Form'

export const NewApp = () => {
  const [selectedCreationType, setSelectedCreationType] = useState(CREATION_TYPES.SCRATCH)
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

  const handleSubmit = ({name}) => {
    createApp.call({name})
  }

  return (
    <SidebarLayout menuMinimized>
      <PageHeader title="New app" />
      <Form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <TextInput name="name" placeholder="Name" />
        <ToggleButtonGroup
          buttons={CREATION_OPTIONS}
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
      </Form>
    </SidebarLayout>
  )
}
