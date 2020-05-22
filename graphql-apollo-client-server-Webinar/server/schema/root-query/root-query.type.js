const queryEntryPoints = `
  type RootQuery {
    # get an item
    item(id: String!): Item,
    # returns an array of items
    items: [Item]
  }
`

export default queryEntryPoints
