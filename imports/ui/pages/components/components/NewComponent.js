import React, {useState} from 'react'
import {useMethod} from '../../../../infra/hooks/useMethod'
import {faBorderAll, faBorderCenterH, faBorderCenterV} from '@fortawesome/pro-light-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {COMPONENT_CATEGORIES} from '../../../../infra/constants/component-categories'
import {useAppContext} from '../../../app/AuthContext'
import {CUSTOM_DATA_KEY} from '../../../../infra/constants/lenna-attr-keys'

export const NewComponent = () => {
  const [tagName, setTagName] = useState('')
  const [componentName, setComponentName] = useState('')
  const [componentCategory, setComponentCategory] = useState(COMPONENT_CATEGORIES.LAYOUTS)
  const [layoutType, setLayoutType] = useState()
  const {state} = useAppContext()

  const createElement = useMethod('elements.create')
  const createComponent = useMethod('components.create', {
    onSuccess: (componentId) => {
      if (componentId) {
        createElement.call({
          appId: state.selectedAppId,
          componentId,
          tagName,
          attrs: {
            [CUSTOM_DATA_KEY]: componentName,
          },
        })
      }
    },
  })

  const handleCreateComponent = () => {
    createComponent.call({
      appId: state.selectedAppId,
      name: componentName,
      category: componentCategory,
    })
  }

  return (
    <div className="mb-2">
      <div className="flex mr-2">
        <input
          type="text"
          value={tagName}
          onChange={(e) => {
            setTagName(e.target.value)
          }}
          className="border p-1 w-8"
          placeholder="tag"
        />
        <input
          type="text"
          value={componentName}
          onChange={(e) => {
            setComponentName(e.target.value)
          }}
          className="border p-1 mr-1"
          placeholder="Component"
        />
        <select value={componentCategory} onChange={(e) => setComponentCategory(e.target.value)}>
          {Object.values(COMPONENT_CATEGORIES).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        {['div', 'section'].includes(tagName) && (
          <div>
            <div className="">
              <div className="flex gap-1">
                <button
                  type="button"
                  className={`h-6 w-6 flex justify-center items-center border hover:bg-gray-100 ${
                    layoutType === 'flex' ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => setLayoutType('flex')}
                >
                  <FontAwesomeIcon icon={faBorderCenterV} />
                </button>
                <button
                  type="button"
                  className={`h-6 w-6 flex justify-center items-center border hover:bg-gray-100 ${
                    layoutType === 'flex-col' ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => setLayoutType('flex-col')}
                >
                  <FontAwesomeIcon icon={faBorderCenterH} />
                </button>
                <button
                  type="button"
                  className={`h-6 w-6 flex justify-center items-center border hover:bg-gray-100 ${
                    layoutType === 'grid' ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => setLayoutType('grid')}
                >
                  <FontAwesomeIcon icon={faBorderAll} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {layoutType && (
        <div className="w-full mt-1">
          <textarea placeholder="Children" className="w-full border p-1 h-10" />
        </div>
      )}
      <div className="flex justify-end">
        <button onClick={handleCreateComponent} className="border px-2 py-1 rounded-sm">
          Create
        </button>
      </div>
    </div>
  )
}
