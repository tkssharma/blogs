import React from 'react';
import { useHistory } from 'react-router';
import { Button } from 'semantic-ui-react';
import logo from '../../logo.svg';
import './Header.scss';

const Header = () => {

  const history = useHistory();

	return (
		<header className="App-header">
        
		<Button  onClick={() => {history.push('/practice')}} inverted >Basic Aggrid</Button>
        <Button  onClick={() => {history.push('/row-grouping')}} inverted >Row Grouping</Button>
		<Button  onClick={() => {history.push('/filter')}} inverted >Filtering</Button>
		<Button  onClick={() => {history.push('/selections')}} inverted >Selections</Button>
      </header>
	)

}

export default Header;