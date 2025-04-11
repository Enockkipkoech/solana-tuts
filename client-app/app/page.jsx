import { LikeButton } from './like-button';
// Create a React component
function Header(props) {
	console.log('Header component called', { props });

	// Destructuring props
	const { title } = props;
	return <h1>{title ? title : 'React Tutorials'}</h1>;
}

// Nesting components
export default function HomePage() {
	const favNames = ['Enock', 'NodeG', 'Boiyo', 'Node5000'];
	console.log('Names', { favNames });

	//Hooks

	function handleClick() {
		setLikes(likes + 1);
		console.log('Button clicked. Increment Likes');
	}
	return (
		<div>
			<Header title="Node:5000 Developer" />
			<h2>Welcome to React</h2>
			<ul>
				{favNames.map((name, index) => (
					<li key={index}>{name}</li>
				))}
			</ul>
			// <button onClick={handleClick}>Like Me({likes})</button>
			<LikeButton />
			<p>Nice Work! 👏 👏 </p>
		</div>
	);
}
