import { h } from 'preact';
import { Link } from 'preact-router/match';

const variants = {
	normal: "", 
	primary: "is-primary", 
	warning: "is-warning", 
	error: "is-error", 
	success: "is-success", 
};
const Button = ({ variant, children, ...props }) => {
	return (<button class={`nes-btn ${variants[variant]}`} {...props}>
		{children}
	</button>)
};

export default Button;
