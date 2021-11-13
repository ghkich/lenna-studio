import React from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {useParams} from 'react-router-dom'
import {PageHeader} from '../../components/PageHeader'
import {TextInput} from '../../components/basic/TextInput'
import {useMethod} from '../../../infra/hooks/useMethod'
import {Form} from '../../components/form/Form'
import {Button} from '../../components/basic/Button'
import {ThemesCollection} from '../../../collections/themes'

export const ViewTheme = () => {
  const {id: themeId} = useParams() || {}

  const {theme} = useTracker(() => {
    if (!themeId) return {}
    const sub = Meteor.subscribe('themes.byId', {themeId})
    const theme = ThemesCollection.findOne({_id: themeId})

    return {
      theme,
      loading: !sub.ready(),
    }
  }, [themeId])

  const updateTheme = useMethod('themes.update', {
    onSuccess: () => {},
  })

  const onSubmit = ({name}) => {
    updateTheme.call({_id: theme?._id, name, settings: {...theme.settings}})
  }

  return (
    <SidebarLayout menuMinimized>
      <PageHeader title={theme?.name} />
      {theme?.name && (
        <>
          <Form
            onSubmit={onSubmit}
            defaultValues={{
              name: theme.name,
              'colors.primary': theme.settings?.colors?.primary,
              'colors.secondary': theme.settings?.colors?.secondary,
            }}
          >
            <TextInput name="name" placeholder="Name" />
            <div className="flex gap-2 pb-2 mb-2 border-b">
              <Button type="submit" className="flex-1">
                Save
              </Button>
            </div>
            <h2 className="text-gray-500 pt-1 leading-none text-2xs uppercase">Colors</h2>
            <TextInput name="colors.primary" placeholder="Primary" />
            <TextInput name="colors.secondary" placeholder="Secondary" />
          </Form>
        </>
      )}
    </SidebarLayout>
  )
}