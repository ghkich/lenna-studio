import React, {useState} from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {InspirationApps} from './components/InspirationApps'
import {InspirationPages} from './components/InspirationPages'

const INSPIRATION_TYPES = {
  APPS: 'apps',
  PAGES: 'pages',
  COMPONENTS: 'components',
}

const tabs = [
  {
    type: INSPIRATION_TYPES.APPS,
    label: 'Apps',
    component: InspirationApps,
  },
  {
    type: INSPIRATION_TYPES.PAGES,
    label: 'Pages',
    component: InspirationPages,
  },
  {
    type: INSPIRATION_TYPES.COMPONENTS,
    label: 'Components',
    component: () => <div>ee</div>,
  },
]

export const Inspiration = () => {
  const [selectedInspirationType, setSelectedInspirationType] = useState(INSPIRATION_TYPES.APPS)

  return (
    <SidebarLayout>
      <div className="flex border border-r-0">
        {tabs.map((tab) => (
          <div
            key={tab.type}
            className={`flex-1 border-r text-center py-1 capitalize cursor-pointer ${
              tab.type === selectedInspirationType ? 'bg-blue-50 text-blue-500' : ''
            }`}
            onClick={() => setSelectedInspirationType(tab.type)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {tabs.map(({type: tabType, component: TabComponent}) => (
        <>
          {tabType === selectedInspirationType && (
            <div key={tabType} className={``}>
              <TabComponent />
            </div>
          )}
        </>
      ))}
    </SidebarLayout>
  )
}
