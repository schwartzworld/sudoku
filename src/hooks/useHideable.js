import { useState, useEffect } from 'preact/hooks';

const useHideable = () => {
	const { pathname, search } = window.location;
	const [show, setShow] = useState(false);
	const onOpen = () => {
		setShow(true);
	}
	const onClose = () => {
		setShow(false);
	}

	useEffect(() => {
		onClose();
	}, [pathname, search])
	return {
		show,
		onOpen,
		onClose,
	}
}

export default useHideable;