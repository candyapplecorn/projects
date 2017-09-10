import React from 'react';
import ReactDOM from 'react-dom';
import APIUtil from './APIUtils.js';

const Header = ({ title, onClick, selected, order }) => {
	const fill = selected ? (<strong>{title}</strong>) : title;
													
	return (<li onClick={ onClick } key={ `header-li-${order}` } data-order={ order }>{ fill }</li>)
};
	
class Tabs extends React.Component{
	constructor(props){
		super(props);

		this.state = { selected: 0 };
	}

	handleClick(event){
		let { target: { dataset: { order: ord } } } = event

		this.setState({
			selected: ord
		})
	}

	render(){
		return (
			<main className="tabs">
				<ul>
					{ 
						this.props.tabData.map(({title: t}, i) => 
								(<Header title={t}
								 				 order={i}
												 key={`header-${i}`}
								 				 onClick={this.handleClick.bind(this)}
												 selected={this.state.selected == i} />)) 
					}			
				</ul>
	
				<article>
					{ this.props.tabData[this.state.selected].content }
				</article>
			</main>
		);
	}
}

export default Tabs;
