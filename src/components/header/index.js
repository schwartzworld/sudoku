import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1>Preact App</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			<Link activeClassName={style.active} href="/c/easy">Easy</Link>
			<Link activeClassName={style.active} href="/c/medium">Medium</Link>
			<Link activeClassName={style.active} href="/c/hard">Hard</Link>
			<Link activeClassName={style.active} href="/c/very-hard">Very Hard</Link>
			<Link activeClassName={style.active} href="/c/insane">Insane</Link>
			<Link activeClassName={style.active} href="/c/inhuman">Inhuman</Link>
		</nav>
	</header>
);

export default Header;
