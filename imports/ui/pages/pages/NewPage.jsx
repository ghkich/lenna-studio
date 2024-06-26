import React, {useState} from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {PageHeader} from '../../components/PageHeader'
import {RoutePaths} from '../../app/routes'
import {Button} from '../../components/basic/Button'
import {TextInput} from '../../components/basic/TextInput'
import {ToggleButtonGroup} from '../../components/basic/ToggleButtonGroup'
import {METHOD_STATUSES, useMethod} from '../../../infra/hooks/useMethod'
import {useHistory, useParams} from 'react-router-dom'
import {CREATION_OPTIONS, CREATION_TYPES} from '../../../infra/constants/creation-types'
import {Select} from '../../components/basic/Select'
import {useTracker} from 'meteor/react-meteor-data'
import {COMPONENT_CATEGORIES} from '../../../infra/constants/component-categories'
import {ComponentsCollection} from '../../../collections/components'
import {Form} from '../../components/form/Form'
import {PAGE_CATEGORIES} from '../../../infra/constants/page-categories'

export const NewPage = () => {
  const {appId} = useParams() || {}
  const [selectedCreationType, setSelectedCreationType] = useState(CREATION_TYPES.BLANK)
  const history = useHistory()

  const {components} = useTracker(() => {
    const sub = Meteor.subscribe('components.byCategory', {appId, category: COMPONENT_CATEGORIES.LAYOUTS})
    const components = ComponentsCollection.find({appId, category: COMPONENT_CATEGORIES.LAYOUTS}).fetch()

    return {
      components,
      loading: !sub.ready(),
    }
  }, [])

  const createElementsByIds = useMethod('elements.createByIds', {})

  const createPage = useMethod('pages.create', {
    onSuccess: (pageId) => {
      if (pageId) {
        if (selectedCreationType === CREATION_TYPES.BLANK) {
          history.push(`${RoutePaths.APPS}/${appId}${RoutePaths.PAGES}/${pageId}`)
        } else {
        }
      }
    },
  })

  const handleSubmit = ({name, path, category, layoutComponentId}) => {
    createPage.call({appId, name, path, category, layoutComponentId})
  }

  return (
    <SidebarLayout menuMinimized loading={createPage.status === METHOD_STATUSES.LOADING}>
      <PageHeader title="New page" />
      <Form onSubmit={handleSubmit} className="mt-1">
        <TextInput name="name" placeholder="Name" required />
        <TextInput name="path" placeholder="Route path" required />
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
                ...Object.values(PAGE_CATEGORIES).map((category) => ({value: category, label: category})),
              ]}
            />
            <Select
              name="layoutComponentId"
              options={[
                {value: '', label: 'Choose a layout component...'},
                ...components?.map((comp) => ({value: comp._id, label: comp.name})),
              ]}
            />
          </>
        )}
        {selectedCreationType === CREATION_TYPES.COPY && <div>{/*<InspirationPages />*/}</div>}
        <div className="border-t opacity-50" />
        <Button type="submit" style="primary">
          Create
        </Button>
      </Form>
    </SidebarLayout>
  )
}
