import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1><a href="/">Schwudoku</a></h1>
	</header>
);

export default Header;
