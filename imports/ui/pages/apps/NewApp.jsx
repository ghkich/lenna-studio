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
import {Select} from '../../components/basic/Select'
import {useTracker} from 'meteor/react-meteor-data'
import {ThemesCollection} from '../../../collections/themes'
import {ElementsPreview} from '../../components/ElementsPreview'
import {usePageLayoutElements} from '../../hooks/usePageLayoutElements'
import {FromExistingApps} from './components/FromExistingApps'

export const NewApp = () => {
  const history = useHistory()
  const [selectedCreationType, setSelectedCreationType] = useState(CREATION_TYPES.SCRATCH)
  const [selectedPage, setSelectedPage] = useState()
  const [fromAppId, setFromAppId] = useState()
  const [checkedPageIds, setCheckedPageIds] = useState([])
  const [selectedThemeId, setSelectedThemeId] = useState()

  const {themes} = useTracker(() => {
    Meteor.subscribe('themes.byUserId')
    Meteor.subscribe('themes.global')
    const themes = ThemesCollection.find().fetch()

    return {
      themes,
    }
  }, [])

  const {previewElements} = usePageLayoutElements({
    pageId: selectedPage?._id,
    layoutComponentId: selectedPage?.layoutComponentId,
  })

  const createApp = useMethod('apps.create', {
    onSuccess: (appId) => {
      if (appId) {
        history.push(`${RoutePaths.APPS}/${appId}`)
      }
    },
  })

  const handleSubmit = ({name, themeId}) => {
    createApp.call({fromAppId, name, themeId, checkedPageIds})
  }

  return (
    <SidebarLayout
      menuMinimized
      contentComponent={
        <ElementsPreview appId={fromAppId} elements={previewElements} selectedThemeId={selectedThemeId} />
      }
    >
      <PageHeader title="New app" />
      <Form onSubmit={handleSubmit}>
        <TextInput name="name" placeholder="Name" />
        <Select
          name="themeId"
          options={[
            {value: '', label: 'Choose a theme...'},
            ...themes?.map((theme) => ({value: theme._id, label: theme.name})),
          ]}
          onChange={(e) => {
            setSelectedThemeId(e.target.value)
          }}
        />
        <ToggleButtonGroup
          buttons={CREATION_OPTIONS}
          activeButton={selectedCreationType}
          onToggle={(value) => setSelectedCreationType(value)}
        />
        {selectedCreationType === CREATION_TYPES.EXISTING && (
          <div>
            <FromExistingApps
              onAppSelect={(appId) => setFromAppId(appId)}
              onPageClick={(page) => setSelectedPage(page)}
              onPageCheck={(pageIds) => setCheckedPageIds(pageIds)}
            />
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
