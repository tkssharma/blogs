import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import itemQueries from '../queries/item.queries.js'

class ItemList extends React.Component {
  render () {
    const {
            data
          } = this.props

    if (data.loading) {
      return (<div>Loading</div>)
    }

    if (data.error) {
      console.log(data.error)
      return (<div>An unexpected error occurred</div>)
    }

    return (
      <div>
        <ul>
          {data.items.map((item) => {
            return (
              <li key={item.id}>
                {item.id} - {item.name} - {item.owner.username}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

ItemList.propTypes = {
  // This structure is Apollo-specific
  // the prop starts with a data root key
  // and contains loading, error, and your graphql root fields
  // that you're interested in pulling
  // see: https://www.learnapollo.com/tutorial-react/react-02#Displaying[object Object]information[object Object]of[object Object]your[object Object]trainer
  // under "Using query results in React components"

  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    // This corresponds with the 'items' field in the 'ItemListQuery'
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired
}

// wrap the graphql (Apollo) store around the component
// and call the getItemList query when there is a need to fetch data
const ItemListView = graphql(itemQueries.getItemList)(ItemList)

export default ItemListView
