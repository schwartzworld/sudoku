import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Game from '../routes/game';
import GameCreator from '../routes/gameCreator';

const App = () => (
	<div id="app">
		<Header />
		<Router>
			<Home path="/" />
			<GameCreator path="/c/:difficulty/" />
			<Game path="/g/:game/" />
		</Router>
	</div>
)

export default App;
