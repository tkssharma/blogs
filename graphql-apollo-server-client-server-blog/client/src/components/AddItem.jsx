import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import itemQueries from '../queries/item.queries.js'

class AddItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      desc: ''
    }
  }

  handleSave = () => { // eslint-disable-line no-undef
    const {
      name,
      desc
    } = this.state

    const ownerId = 1

    // see https://www.learnapollo.com/tutorial-react/react-05/
    // "Using mutations in components"
    this.props.mutate({variables: { name, desc, ownerId }}).then(() => {
      // @todo bug: Item list doesn't refresh on redirect
      this.props.history.replace('/')
    })
  }

  render () {
    return (
      <div>
        <input
          placeholder='name'
          value={this.state.name}
          onChange={(e) => this.setState({name: e.target.value})}
        />
        <br /><br />
        <input
          onChange={(e) => this.setState({desc: e.target.value})}
          placeholder='description'
          value={this.state.desc}
        />
        <br /><br />
        <button onClick={this.handleSave}>Save</button>
      </div>
    )
  }
}

AddItem.propTypes = {
  // Corresponds with the RootMutation type
  mutate: PropTypes.func.isRequired,
  history: PropTypes.object
}

const AddItemWithMutation = graphql(itemQueries.addItem)(AddItem)

export default AddItemWithMutation
