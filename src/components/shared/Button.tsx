import styled from 'styled-components';

const Button = styled.button<{ $variant: 'primary' | 'secondary' }>`
	cursor: pointer;
	border-radius: 9999px;
	border-style: solid;
	border-width: 1px;
	background-color: ${(props) =>
		props.$variant === 'primary' ? '#104f69' : 'white'};
	border-color: 'blue';
	color: ${(props) => (props.$variant === 'primary' ? 'white' : '#104f69')};
	display: inline-flex;
	align-items: center;
	font: inherit;
	font-weight: bold;
	min-height: 36px;
	justify-content: center;
	min-width: 72px;
	outline-style: none;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
	padding: 0 30px;
	pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
	text-decoration: none;
	transition: background-color 0.2s;
	&:hover {
		background-color: ${(props) =>
			props.$variant === 'primary' ? 'rgb(26, 145, 218)' : 'rgb(69,179,224)'};
		color: white;
	}
`;

export default Button;
