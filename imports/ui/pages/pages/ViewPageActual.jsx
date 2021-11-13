import React from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {ElementsCollection} from '../../../collections/elements'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {ElementsTree} from '../../containers/elements/ElementsTree'
import {ElementsPreview} from '../../components/ElementsPreview'
import {useParams} from 'react-router-dom'
import {PageHeader} from '../../components/PageHeader'
import {PagesCollection} from '../../../collections/pages'
import {STRUCTURE_TYPES} from '../../../infra/constants/structure-types'

export const ViewPageActual = () => {
  const {appId, pageId} = useParams() || {}

  const {page} = useTracker(() => {
    if (!pageId) return {}
    const sub = Meteor.subscribe('pages.byId', {pageId})
    const page = PagesCollection.findOne({_id: pageId})

    return {
      page,
      loading: !sub.ready(),
    }
  }, [pageId])

  const {previewElements, treeElements} = useTracker(() => {
    if (!pageId) return {}
    const subs = [Meteor.subscribe('elements.byPageId', {pageId})]
    const pageElements = ElementsCollection.find({pageId, 'structure.type': STRUCTURE_TYPES.ACTUAL}).fetch()

    return {
      previewElements: pageElements,
      treeElements: pageElements,
      loading: subs.some((sub) => !sub?.ready()),
    }
  }, [pageId])

  return (
    <SidebarLayout menuMinimized contentComponent={<ElementsPreview appId={appId} elements={previewElements} />}>
      <PageHeader title={page?.name} />
      {page?.name && (
        <>
          {page?._id && treeElements?.length > 0 && (
            <>
              <ElementsTree appId={appId} targetPage={page} elements={treeElements} addElementDisabled />
              <div className="mb-2" />
            </>
          )}
        </>
      )}
    </SidebarLayout>
  )
}
