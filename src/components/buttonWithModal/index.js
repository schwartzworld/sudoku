import { h } from 'preact';
import style from './style.css';

import useHideable from '../../hooks/useHideable.js';

const ButtonWithModal = ({ children, buttonText, ...buttonProps }) => {
	const { show, onOpen, onClose } = useHideable();
	// todo: focus modal when opened
	return <>
		{show && <div class={style.modalWrapper}>
			<div class={style.modalInner}>
				<div>
					{children}
				</div>
				<button class={style.close} onClick={onClose}>close</button>
			</div>
		</div>}
		<button onClick={onOpen} {...buttonProps}>
			{buttonText}
		</button>
	</>
}

export default ButtonWithModal;
