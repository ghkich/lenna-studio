import {SelectorsCollection} from '../../../collections/selectors'

Meteor.methods({
  ['selectors.updateOrCreateBaseClasses']({appId, componentId, selectorId, selectorValue, classes}) {
    if (selectorId) {
      return SelectorsCollection.update(selectorId, {$set: {classes}})
    }
    return SelectorsCollection.insert({
      appId,
      componentId,
      value: selectorValue,
      classes,
    })
  },
  ['selectors.updateOrCreateStyleClasses']({appId, componentId, selectorId, selectorValue, style, classes}) {
    if (selectorId) {
      SelectorsCollection.update(
        {_id: selectorId, 'classesByStyles.style': style},
        {
          $pull: {classesByStyles: {style}},
        },
      )
      return SelectorsCollection.update(
        {_id: selectorId},
        {
          $addToSet: {classesByStyles: {style, classes}},
        },
      )
    }
    return SelectorsCollection.insert({
      appId,
      componentId,
      value: selectorValue,
      classesByStyles: [{style, classes}],
    })
  },
  ['selectors.updateOrCreateStateClasses']({appId, componentId, selectorId, selectorValue, state, classes}) {
    if (selectorId) {
      SelectorsCollection.update(
        {_id: selectorId, 'classesByStates.state': state},
        {
          $pull: {classesByStates: {state}},
        },
      )
      return SelectorsCollection.update(
        {_id: selectorId},
        {
          $addToSet: {classesByStates: {state, classes}},
        },
      )
    }
    return SelectorsCollection.insert({
      appId,
      componentId,
      value: selectorValue,
      classesByStates: [{state, classes}],
    })
  },
})
