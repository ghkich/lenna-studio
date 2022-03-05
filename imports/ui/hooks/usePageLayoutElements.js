import {useTracker} from 'meteor/react-meteor-data'
import {ElementsCollection} from '../../collections/elements'
import {STRUCTURE_TYPES} from '../../infra/constants/structure-types'
import {ComponentsCollection} from '../../collections/components'
import {CUSTOM_ATTR_KEYS} from '../../infra/constants/custom-attr-keys'

export const usePageLayoutElements = ({pageId, layoutComponentId}) => {
  const {actualElements, previewElements, treeElements, layoutHasChildrenContainer} = useTracker(() => {
    if (!pageId || !layoutComponentId) return {}
    Meteor.subscribe('components.byId', {_id: layoutComponentId})
    Meteor.subscribe('elements.byComponentId', {componentId: layoutComponentId})
    Meteor.subscribe('elements.byPageId', {pageId})

    const pageElements = ElementsCollection.find({pageId, 'structure.type': STRUCTURE_TYPES.EXPECTED}).fetch()
    const layoutComponent = ComponentsCollection.findOne({_id: layoutComponentId})
    const layoutElements = ElementsCollection.find({componentId: layoutComponentId}).fetch()
    const actualElements = ElementsCollection.find({pageId, 'structure.type': STRUCTURE_TYPES.ACTUAL}).fetch()

    const layoutChildrenContainer = layoutElements.find((el) => el?._id === layoutComponent?.childrenContainerElementId)

    let previewElements = layoutElements
    let treeElements = layoutElements

    if (layoutChildrenContainer) {
      const mainLayoutContainerElement = layoutElements.find((el) => !el.parentId)
      const pageElementsInLayoutContainer = pageElements.map((el) =>
        !el.parentId ? {...el, parentId: layoutChildrenContainer._id} : el,
      )
      const mainLayoutComponentIsChildrenContainer =
        layoutComponent?.childrenContainerElementId === mainLayoutContainerElement._id
      previewElements = [
        ...layoutElements.filter((el) => el.parentId !== layoutChildrenContainer._id),
        ...pageElementsInLayoutContainer,
      ]
      treeElements = [
        {
          ...mainLayoutContainerElement,
          component: {
            _id: layoutComponent?._id,
          },
          isChildrenContainer: mainLayoutComponentIsChildrenContainer,
          attrs: {[CUSTOM_ATTR_KEYS.COMPONENT]: layoutComponent?.name},
        },
        ...pageElementsInLayoutContainer,
      ]
    }

    const getAllElements = (elements) => {
      let allElements = []
      let component

      elements.forEach((element) => {
        const componentId = element?.component?._id
        if (componentId) {
          component = ComponentsCollection.findOne({_id: componentId})
          const componentElements = ElementsCollection.find({componentId}).fetch()
          const componentContainerElement = componentElements.find((el) => !el.parentId)
          componentElements
            .filter((el) => el.parentId && el.parentId !== component?.childrenContainerElementId)
            .forEach((el) => {
              if (el.parentId === componentContainerElement?._id) {
                allElements.push({...el, parentId: element._id})
              } else {
                allElements.push(el)
              }
            })
        }
        allElements.push(element)
      })

      return allElements
    }

    return {
      actualElements,
      previewElements: getAllElements(previewElements),
      treeElements: getAllElements(treeElements),
      layoutHasChildrenContainer: !!layoutChildrenContainer,
    }
  }, [pageId, layoutComponentId])

  return {
    actualElements,
    previewElements,
    treeElements,
    layoutHasChildrenContainer,
  }
}
