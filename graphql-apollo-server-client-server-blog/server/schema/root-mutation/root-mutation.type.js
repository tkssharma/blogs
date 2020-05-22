const RootMutation = `
  type RootMutation {
    addItem (
      name: String!,
      desc: String,
      ownerId: ID!
    ): Item
  }
`
export default RootMutation
