import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Ad from './ad';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Game from '../routes/game';
import GameCreator from '../routes/gameCreator';

const App = () => (
	<div id="app" style={{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly'
	}}>
		<Header />
		<Router>
			<Home path="/" />
			{/* TODO: Refactor game creation and routing to use query params */}
			<GameCreator path="/c/:difficulty/" />
			<Game path="/g/:game/" />
		</Router>
		<Ad />
	</div>
)

export default App;
