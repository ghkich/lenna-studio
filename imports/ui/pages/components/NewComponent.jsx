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
import {COMPONENT_CATEGORIES} from '../../../infra/constants/component-categories'
import {Select} from '../../components/basic/Select'

export const NewComponent = () => {
  const {appId} = useParams() || {}
  const [selectedCreationType, setSelectedCreationType] = useState(CREATION_TYPES.BLANK)
  const history = useHistory()

  const createComponent = useMethod('components.create', {
    onSuccess: (componentId) => {
      if (componentId) {
        if (selectedCreationType === CREATION_TYPES.BLANK) {
          history.push(`${RoutePaths.APPS}/${appId}${RoutePaths.COMPONENTS}/${componentId}`)
        } else {
        }
      }
    },
  })

  const handleSubmit = ({name, category, structure}) => {
    const elements = [{tagName: structure}]
    createComponent.call({appId, name, category}, elements)
  }

  return (
    <SidebarLayout menuMinimized>
      <PageHeader title="New component" />
      <Form onSubmit={handleSubmit} className="mt-1">
        <TextInput name="name" placeholder="Name" />
        <ToggleButtonGroup
          buttons={CREATION_OPTIONS}
          activeButton={selectedCreationType}
          onToggle={(value) => setSelectedCreationType(value)}
        />
        {selectedCreationType === CREATION_TYPES.BLANK && (
          <>
            <Select
              name="category"
              options={[
                {value: '', label: 'Choose a category...'},
                ...Object.values(COMPONENT_CATEGORIES).map((category) => ({value: category, label: category})),
              ]}
            />
            <TextInput name="structure" placeholder="Structure (div > div + div)" />
          </>
        )}
        {selectedCreationType === CREATION_TYPES.COPY && <div></div>}
        <div className="border-t opacity-50" />
        <Button type="submit" style="primary">
          Create
        </Button>
      </Form>
    </SidebarLayout>
  )
}
