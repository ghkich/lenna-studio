Meteor.methods({
  ['accounts.createUser'](user) {
    const existingUser = Meteor.users.find({email: user?.email}).fetch()
    if (existingUser?.length > 0) {
      throw new Meteor.Error('user e-mail already exists')
    }
    return Accounts.createUser(user)
  },
  ['accounts.updateUser'](_id, user) {
    const existingUser = Meteor.users.find({_id: {$ne: _id}, email: user?.email}).fetch()
    if (existingUser?.length > 0) {
      throw new Meteor.Error('user e-mail already exists')
    }
    return Meteor.users.update(_id, {$set: user})
  },
})
