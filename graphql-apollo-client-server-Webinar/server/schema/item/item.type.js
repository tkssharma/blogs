const ItemType = `
  type Item {
    # Item identifier
    id: ID!
    # Item name
    name: String!
    # Item description
    desc: String
    # Owner of the item
    owner: User
  }
`

export default ItemType
