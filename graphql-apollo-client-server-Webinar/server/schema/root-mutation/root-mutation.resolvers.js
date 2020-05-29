import { addNewItem } from '../../db'

const rootMutationResolvers = {
  // this corresponds to the `RootMutation.addItem` type
  async addItem (rootObj, { name, desc, ownerId }) {
    // you'd have to implement this method yourself, would insert the item into a db
    return await addNewItem({ name, desc, ownerId })
  }
}

export default rootMutationResolvers
