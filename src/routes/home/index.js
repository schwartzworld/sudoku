import { h } from 'preact';
import style from './style.css';

const Home = () => (
	<div class={style.home}>
		<h1>Play Sudoku</h1>
		<p>
			<ol>
				<li>Select a difficulty from the nav menu above</li>
				<li>Click the button to generate a game</li>
				<li>Save your game state by copying the URL or bookmarking</li>
				<li>Paste the URL from step 3 into any browser to continue from where you left off</li>
				<li>Use your browser's back button to undo any mistakes</li>
			</ol>
		</p>
	</div>
);

export default Home;
