import {ElementsCollection} from '../../../collections/elements'
import {ComponentsCollection} from '../../../collections/components'
import {LENNA_ATTR_KEYS} from '../../../infra/constants/lenna-attr-keys'

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
    ElementsCollection.remove({appId, pageId, structureType})
  }
  if (componentId) {
    ElementsCollection.remove({appId, componentId})
  }
  const createChildrenElements = (childNodes, parentId) => {
    if (!childNodes || childNodes?.length === 0) return
    const childNodeIds = []
    childNodes.forEach((node) => {
      topDownIndex++
      let attrs = node.attrs
      if (!parentId && (!node.attrs?.[LENNA_ATTR_KEYS.STYLE] || !node.attrs?.[LENNA_ATTR_KEYS.STATE])) {
        const component = ComponentsCollection.findOne(componentId)
        if (component?.styles?.length > 0 && !node.attrs?.[LENNA_ATTR_KEYS.STYLE]) {
          attrs = {
            ...attrs,
            'data-style': component.styles?.[0],
          }
        }
        if (component?.states?.length > 0 && !node.attrs?.[LENNA_ATTR_KEYS.STATE]) {
          attrs = {
            ...attrs,
            'data-state': component.states?.[0],
          }
        }
      }
      const elementId = ElementsCollection.insert({
        appId,
        pageId,
        componentId,
        parentId,
        tagName: node.tagName?.toLowerCase(),
        text: node.text,
        attrs,
        structure: {
          type: structureType,
          index: topDownIndex,
        },
      })
      childNodeIds.push(elementId)
      createChildrenElements(node?.childNodes, elementId)
    })
    if (parentId && childNodeIds?.length > 0) {
      ElementsCollection.update(
        {_id: parentId},
        {
          $set: {
            childrenIds: childNodeIds,
          },
        },
      )
    }
  }
  createChildrenElements(nodes)
}
