import React, {useState} from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {PageHeader} from '../../components/PageHeader'
import {RoutePaths} from '../../app/routes'
import {Button} from '../../components/basic/Button'
import {TextInput} from '../../components/basic/TextInput'
import {ToggleButtonGroup} from '../../components/basic/ToggleButtonGroup'
import {useMethod} from '../../../infra/hooks/useMethod'
import {useHistory} from 'react-router-dom'
import {CREATION_OPTIONS, CREATION_TYPES} from '../../../infra/constants/creation-types'
import {Form} from '../../components/form/Form'
import {COMPONENT_CATEGORIES} from '../../../infra/constants/component-categories'
import {Select} from '../../components/basic/Select'

export const NewComponent = () => {
  const [selectedCreationType, setSelectedCreationType] = useState(CREATION_TYPES.SCRATCH)
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

  const handleSubmit = ({name, category}) => {
    createComponent.call({name, category})
  }

  return (
    <SidebarLayout menuMinimized>
      <PageHeader title="New component" />
      <Form onSubmit={handleSubmit}>
        <TextInput name="name" placeholder="Name" />
        <ToggleButtonGroup
          buttons={CREATION_OPTIONS}
          activeButton={selectedCreationType}
          onToggle={(value) => setSelectedCreationType(value)}
        />
        {selectedCreationType === CREATION_TYPES.SCRATCH && (
          <>
            <Select
              name="category"
              options={[
                {value: '', label: 'Choose a component category...'},
                ...Object.values(COMPONENT_CATEGORIES).map((category) => ({value: category, label: category})),
              ]}
            />
            <TextInput name="structure" placeholder="Structure (div > div + div)" />
          </>
        )}
        {selectedCreationType === CREATION_TYPES.EXISTING && <div></div>}
        <div className="border-t opacity-50" />
        <Button type="submit" style="primary">
          Create
        </Button>
      </Form>
    </SidebarLayout>
  )
}
