import React from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {useHistory, useParams} from 'react-router-dom'
import {PageHeader} from '../../components/PageHeader'
import {TextInput} from '../../components/basic/TextInput'
import {useMethod} from '../../../infra/hooks/useMethod'
import {Form} from '../../components/form/Form'
import {Button} from '../../components/basic/Button'
import {ThemesCollection} from '../../../collections/themes'
import {RoutePaths} from '../../app/routes'

export const ViewTheme = () => {
  const {appId, themeId} = useParams() || {}
  const history = useHistory()

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

  const removeTheme = useMethod('themes.remove', {
    onSuccess: () => {
      history.push(`${RoutePaths.APPS}/${appId}${RoutePaths.THEMES}`)
    },
  })

  const onSubmit = ({name, colors, roundLevel}) => {
    updateTheme.call(theme?._id, {name, settings: {...theme.settings, colors, roundLevel}})
  }

  return (
    <SidebarLayout menuMinimized>
      <PageHeader title={theme?.name} onDelete={() => removeTheme.call(theme?._id)} />
      {theme?.name && (
        <>
          <Form
            onSubmit={onSubmit}
            defaultValues={{
              name: theme.name,
              'colors.primary': theme.settings?.colors?.primary,
              'colors.secondary': theme.settings?.colors?.secondary,
              roundLevel: theme.settings?.roundLevel,
            }}
          >
            <TextInput name="name" placeholder="Name" />
            <div className="flex items-center justify-between relative">
              <label className="text-gray-500 pt-1 leading-none text-2xs uppercase">Color Primary</label>
              <TextInput name="colors.primary" placeholder="Primary" className="text-gray-900" />
              <div
                className="w-5 h-5 absolute right-2 rounded"
                style={{backgroundColor: theme.settings?.colors?.primary}}
              />
            </div>
            <div className="flex items-center justify-between relative">
              <label className="text-gray-500 pt-1 leading-none text-2xs uppercase">Color Secondary</label>
              <TextInput name="colors.secondary" placeholder="Secondary" className="text-gray-900" />
              <div
                className="w-5 h-5 absolute right-2 rounded"
                style={{backgroundColor: theme.settings?.colors?.secondary}}
              />
            </div>
            <div className="flex items-center justify-between relative">
              <label className="text-gray-500 pt-1 leading-none text-2xs uppercase">Round level</label>
              <TextInput name="roundLevel" placeholder="Round level" className="text-gray-900" />
            </div>
            <div className="flex gap-2 pt-2 mt-0.5 border-t">
              <Button type="submit" className="flex-1">
                Save
              </Button>
            </div>
          </Form>
        </>
      )}
    </SidebarLayout>
  )
}
