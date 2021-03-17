import { h } from 'preact';
import style from './style.css';

export const BoardThird = ({ children }) => {
	return <div class={style.boardThird}>
		{ children }
	</div>
};

export const Settings = ({ children }) => {
	return <div class={style.settings}>
		{children}
	</div>
}

export default {
	BoardThird,
	Settings
}