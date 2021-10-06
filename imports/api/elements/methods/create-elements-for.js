import {ElementsCollection} from '../../../collections/elements'
import {ComponentsCollection} from '../../../collections/components'
import {CUSTOM_DATA_KEY} from '../../../infra/constants/lenna-attr-keys'

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

export const getComponentPropsFromCustomData = (customData) => {
  if (!customData) return {}

  let name
  let style
  let state

  const nameStartIndex = 0
  const styleStartIndex = customData.indexOf('-')
  const stateStartIndex = customData.indexOf(':')

  let nameEndIndex = customData.length
  let styleEndIndex = stateStartIndex - 1
  let stateEndIndex = customData.length

  if (styleEndIndex < 0) {
    styleEndIndex = nameEndIndex
  }
  if (styleStartIndex >= 0) {
    style = customData.substring(styleStartIndex + 1, styleEndIndex)
    nameEndIndex = styleStartIndex
  } else {
    if (stateStartIndex >= 0) {
      nameEndIndex = stateStartIndex
    }
  }

  if (stateStartIndex >= 0) {
    state = customData.substring(stateStartIndex, stateEndIndex)
  }

  name = customData.substring(nameStartIndex, nameEndIndex)

  return {
    name,
    style,
    state,
  }
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
      const componentProps = getComponentPropsFromCustomData(node.attrs?.[CUSTOM_DATA_KEY])
      if (!parentId && (!componentProps.style || !componentProps.state)) {
        const component = ComponentsCollection.findOne(componentId)
        if (component?.name) {
          let customData = component?.name
          if (component?.styles?.length > 0 && !componentProps.style) {
            customData += `-${component.styles?.[0]}`
          }
          if (component?.states?.length > 0 && !componentProps.state) {
            customData += `:${component.states?.[0]}`
          }
          attrs = {
            ...attrs,
            [CUSTOM_DATA_KEY]: customData,
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
