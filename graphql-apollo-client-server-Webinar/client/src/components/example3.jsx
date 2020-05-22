import React, { useState, useEffect } from 'react';
import './home.scss';
import Technologies from './technologies';
import { withRouter } from 'react-router-dom';
import technologiesListQuery from '../graphql/query/technologyQuery';
import { Query } from 'react-apollo';
import SearchBar from './search';
// eslint-disable-next-line no-unused-vars
const Home = ({ isLoggedIn, technologyList }) => {
  // eslint-disable-next-line no-console
  const [filteredTechnologies, setFilteredTechnologies] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (technologyList && Array.isArray(technologyList.data)) {
      if (input) {
        const filtered = technologyList.data.filter(
          i => i.name && i.name.toLowerCase().includes(input),
        );
        setFilteredTechnologies(filtered);
      } else {
        setFilteredTechnologies(technologyList.data);
      }
    }
  }, [input, technologyList]);
  return (
    <React.Fragment>
      <SearchBar setInput={setInput} />
      <Technologies technologyList={filteredTechnologies} />
    </React.Fragment>
  );
};

function PageWithQuery({ isLoggedIn, match }) {
  const { type } = match.params;
  return (
    <Query
      query={technologiesListQuery}
      variables={{ type }}
      fetchPolicy="network-only"
    >
      {({ data, loading }) => {
        if (!data || !data.technologyList) {
          return null;
        }
        const { technologyList } = data;
        return !loading ? (
          <Home isLoggedIn={isLoggedIn} technologyList={technologyList} />
        ) : (
          <span />
        );
      }}
    </Query>
  );
}

const HomePage = withRouter(PageWithQuery);
export default HomePage;
