import React, {useState} from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {useHistory, useParams} from 'react-router-dom'
import {useTracker} from 'meteor/react-meteor-data'
import {AppsCollection} from '../../../collections/apps'
import {TextInput} from '../../components/basic/TextInput'
import {Select} from '../../components/basic/Select'
import {Button} from '../../components/basic/Button'
import {Form} from '../../components/form/Form'
import {useMethod} from '../../../infra/hooks/useMethod'
import {ThemesCollection} from '../../../collections/themes'
import {RoutePaths} from '../../app/routes'
import {Textarea} from '../../components/basic/Textarea'

export const ViewApp = () => {
  const {appId} = useParams() || {}
  const history = useHistory()
  const [themeId, setThemeId] = useState()
  const [selectedFramework, setSelectedFramework] = useState('svelte')

  const {app} = useTracker(() => {
    if (!appId) return {}
    const sub = Meteor.subscribe('apps.byId', appId)
    const app = AppsCollection.findOne(appId)

    setThemeId(app?.themeId)

    return {
      app,
      loading: !sub.ready(),
    }
  }, [appId])

  const {themes} = useTracker(() => {
    Meteor.subscribe('themes.byUserId')
    Meteor.subscribe('themes.global')
    const themes = ThemesCollection.find().fetch()

    return {
      themes,
    }
  }, [])

  const updateApp = useMethod('apps.update')

  const removeApp = useMethod('apps.remove', {
    onSuccess: () => {
      history.push(`${RoutePaths.APPS}`)
    },
  })

  const handleSubmit = ({name}) => {
    updateApp.call(appId, {name, themeId})
  }

  if (!app) return null

  const FRAMEWORKS = [
    {value: '', name: 'No framework'},
    {value: 'react', name: 'React'},
    {value: 'vue', name: 'Vue'},
    {value: 'svelte', name: 'Svelte'},
    {value: 'angular', name: 'Angular'},
  ]

  const scriptString = `\<script id="__lenna-script" data-app-id="${appId}" ${
    selectedFramework ? `data-framework="${selectedFramework}"` : ''
  } src="${window.location.origin}/lenna-script.js"\>\</script\>`

  return (
    <SidebarLayout
      contentComponent={
        <div className="flex flex-col p-4 h-screen w-full justify-center items-center">
          <div className="max-w-sm w-full text-xs">
            <h2 className="font-bold text-md mb-1">Setup</h2>
            <p className="mb-3">
              Copy and paste this script below into the &lt;head&gt; of your project and you will be able to use Lenna
              Studio inside your app.
            </p>
            <Textarea value={scriptString} disabled className="w-full mb-2 p-2 border h-20" />
            <div className="flex gap-2">
              <Select
                value={selectedFramework}
                options={[...FRAMEWORKS?.map((framework) => ({value: framework.value, label: framework.name}))]}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="flex-1"
                disabled
              />
              <Button
                type="button"
                style="primary"
                className="flex-1"
                onClick={async () => {
                  await navigator.clipboard.writeText(scriptString)
                }}
              >
                Copy script
              </Button>
            </div>
          </div>
        </div>
      }
      menuMinimized={false}
    >
      <Form onSubmit={handleSubmit} defaultValues={{name: app.name}}>
        <TextInput name="name" placeholder="Name" />
        <Select
          value={themeId}
          onChange={(e) => setThemeId(e.target.value)}
          options={[
            {value: '', label: 'Choose a theme...'},
            ...themes?.map((theme) => ({value: theme._id, label: theme.name})),
          ]}
        />
        <div className="border-t opacity-50" />
        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            Save
          </Button>
        </div>
      </Form>
      <div className="mt-1.5 flex">
        <Button
          type="button"
          className="flex-1 hover:bg-gray-50 hover:text-red-500"
          onClick={() => removeApp.call(app._id)}
        >
          Remove
        </Button>
      </div>
    </SidebarLayout>
  )
}
