import React, {useState} from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {PageHeader} from '../../components/PageHeader'
import {RoutePaths} from '../../app/routes'
import {Button} from '../../components/basic/Button'
import {TextInput} from '../../components/basic/TextInput'
import {ToggleButtonGroup} from '../../components/basic/ToggleButtonGroup'
import {useMethod} from '../../../infra/hooks/useMethod'
import {useHistory, useParams} from 'react-router-dom'
import {CREATION_OPTIONS, CREATION_TYPES} from '../../../infra/constants/creation-types'
import {Form} from '../../components/form/Form'

export const NewTheme = () => {
  const {appId} = useParams() || {}
  const [selectedCreationType, setSelectedCreationType] = useState(CREATION_TYPES.SCRATCH)
  const history = useHistory()

  const createTheme = useMethod('themes.create', {
    onSuccess: (themeId) => {
      if (themeId) {
        if (selectedCreationType === CREATION_TYPES.SCRATCH) {
          history.push(`${RoutePaths.APPS}/${appId}${RoutePaths.THEMES}/${themeId}`)
        } else {
        }
      }
    },
  })

  const handleSubmit = ({name}) => {
    createTheme.call({appId, name, settings: {}})
  }

  return (
    <SidebarLayout menuMinimized>
      <PageHeader title="New theme" />
      <Form onSubmit={handleSubmit}>
        <TextInput name="name" placeholder="Name" />
        <ToggleButtonGroup
          buttons={CREATION_OPTIONS}
          activeButton={selectedCreationType}
          onToggle={(value) => setSelectedCreationType(value)}
        />
        {selectedCreationType === CREATION_TYPES.SCRATCH && <></>}
        {selectedCreationType === CREATION_TYPES.EXISTING && <></>}
        <div className="border-t opacity-50" />
        <Button type="submit" style="primary">
          Create
        </Button>
      </Form>
    </SidebarLayout>
  )
}
