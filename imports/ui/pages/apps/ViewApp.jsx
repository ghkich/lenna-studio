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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowsRotate} from '@fortawesome/pro-solid-svg-icons'

export const ViewApp = () => {
  const {appId} = useParams() || {}
  const history = useHistory()
  const [themeId, setThemeId] = useState()

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

  const devDomainAttr = process.env.NODE_ENV ? `data-dev-domain="${window.location.origin}"` : ''
  const scriptString = `\<script id="__lenna-script" data-app-id="${appId}" data-root-container-id="" ${devDomainAttr} src="${window.location.origin}/sync-script.js"\>\</script\>`

  return (
    <SidebarLayout
      contentComponent={
        <div className="flex flex-col p-4 h-screen w-full justify-center items-center">
          <div className="w-80 text-xs text-center text-white">
            <FontAwesomeIcon icon={faArrowsRotate} className="text-7xl" />
            <h1 className="font-light text-3xl my-5">Sync script</h1>
            <p className="font-thin text-lg mb-3">
              Copy and paste the script below into the &lt;head&gt; of your project to start syncing
            </p>
            <Textarea
              value={scriptString}
              disabled
              className="w-full mb-3 p-2 border border-white border-opacity-25 h-20 leading-tight bg-black bg-opacity-25 rounded opacity-75"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                className="flex-1"
                onClick={async () => {
                  await navigator.clipboard.writeText(scriptString)
                }}
              >
                Copy script
              </Button>
            </div>
            <p className="mt-3 font-thin w-64 mx-auto">
              Every page with the script will load and show the Lenna Studio sidebar into it.
            </p>
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
