import { getUser } from '../../db'

// must match the field names in the Item type for field data
// that cannot be obtained at the parent level (eg RootQuery#item())
// meaning not every field needs a resolver implementation
const itemResolvers = {
  // this is the resolver for Item.owner
  // the first param represents the parent object, which in this case, would be the database results
  // that were mapped to the Item fields
  async owner (item) {
    return await getUser(item.ownerId)
  }
}

export default itemResolvers
