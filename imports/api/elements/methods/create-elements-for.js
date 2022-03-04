import {ElementsCollection} from '../../../collections/elements'
import {ComponentsCollection} from '../../../collections/components'
import {CUSTOM_ATTR_KEYS} from '../../../infra/constants/custom-attr-keys'

export const NODE_TYPES = {
  ELEMENT_NODE: 1, // An Element node like <p> or <div>
  ATTRIBUTE_NODE: 2, // An Attribute of an Element
  TEXT_NODE: 3, // The actual Text inside an Element or Attr
  CDATA_SECTION_NODE: 4, //	A CDATASection, such as <!CDATA[[ … ]]>
  PROCESSING_INSTRUCTION_NODE: 7, // A ProcessingInstruction of an XML document, such as <?xml-stylesheet … ?>
  COMMENT_NODE: 8, // 	A Comment node, such as <!-- … -->
  DOCUMENT_NODE: 9, // A Document node
  DOCUMENT_TYPE_NODE: 10, // A DocumentType node, such as <!DOCTYPE html>
  DOCUMENT_FRAGMENT_NODE: 11, // A DocumentFragment node
}

export const createElementsFor = ({appId, pageId, componentId, nodes, structureType}) => {
  let topDownIndex = 0
  if (pageId) {
    ElementsCollection.remove({appId, pageId, 'structure.type': structureType})
  }
  if (componentId) {
    ElementsCollection.remove({appId, componentId})
  }
  const createChildrenElements = (childNodes, parentId) => {
    if (!childNodes || childNodes?.length === 0) return
    childNodes.forEach((node) => {
      if (node.rawAttrs?.includes('aria-hidden="true"')) return
      if (node._rawText?.trim() === '') return
      topDownIndex++
      let component
      const componentName = node.attrs?.[CUSTOM_ATTR_KEYS.COMPONENT]
      if (componentName) {
        const appComponent = ComponentsCollection.findOne({appId, name: componentName})
        if (appComponent) {
          component = {
            _id: appComponent._id,
            style: appComponent.styles?.[0],
            state: appComponent.states?.[0],
          }
        }
      }
      const elementId = ElementsCollection.insert({
        appId,
        pageId,
        componentId,
        parentId,
        component,
        tagName: node.tagName?.toLowerCase(),
        text: !node.tagName && node.text ? node.text : undefined,
        attrs: node.attrs,
        structure: {
          type: structureType,
          index: topDownIndex,
        },
      })
      createChildrenElements(node?.childNodes, elementId)
      if (node.structure?.isChildrenContainer) {
        ComponentsCollection.update(componentId, {$set: {childrenContainerElementId: elementId}})
      }
    })
  }
  createChildrenElements(nodes)
}
