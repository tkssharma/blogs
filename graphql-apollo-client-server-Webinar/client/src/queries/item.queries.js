import gql from 'graphql-tag'

export default {
  // this is a feature called template tags
  // https://developers.google.com/web/updates/2015/01/ES6-Template-Strings#tagged_templates
  getItemList: gql`query ItemListQuery {
    items {
      id
      name,
      owner {
        username
      }
    }
  }`,
  addItem: gql`mutation addNewItem ($name: String!, $desc: String, $ownerId: ID!) {
    addItem(name: $name, desc: $desc, ownerId: $ownerId) {
      id
    }
  }`
}
