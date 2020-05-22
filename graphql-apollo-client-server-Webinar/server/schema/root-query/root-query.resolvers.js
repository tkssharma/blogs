import {
  getItem,
  getItems
} from '../../db'

// must match the field items in RootQuery
const rootQueryResolvers = {
  // this is the resolver for RootQuery.item
  // the first param represents the parent object, which in this case, would be the RootQuery
  // the second param is incoming parameters
  async item (rootObj, { id }) {
    // returns an object that matches the ItemType fields
    return await getItem(id)
  },
  // this is the resolver for RootQuery.items
  async items () {
    // would return an array of Item
    return await getItems()
  }
}

export default rootQueryResolvers
