// profile.jsx
import React  from 'react';
import Hobby from './Hobby';



 class Profile extends React.Component {
	 constructor(props) {
		 super(props);
		 this.state ={
			 liked: 0,
			 hobbies: [ 'skateborading', 'rock music' ]
		 };

		 this.likedCallback = this.likedCallback.bind(this);
		 this.addHobbyCallback = this.addHobbyCallback.bind(this);
	 }

	 likedCallback() {
		 let liked = this.state.liked;
		 liked++;
		 this.setState({
			 liked
		 });
	 }

	 addHobbyCallback() {
		 let hobbyInput = this.refs.hobby;
		 let val = hobbyInput.value;
		 if( val ){
			 let hobbies = this.state.hobbies;
			 hobbies = [...hobbies, val ];
			 this.setState({
				 hobbies
			 }, () => {
				 hobbyInput.value = '';
			 });
		 }
	 }

	 componentDidMount() {
		 setTimeout(() => {
			 this.likedCallback();
		 },1000);
	 }
	// render 是这个组件渲染的 Vitrual Dom 结构
	render(){
		return (
			<div className="profile-component">
			{/* this.props 就是传入的属性 */}
				<h1> 我的名字叫{this.props.name}</h1>
				<h2>我今年{this.props.age} 岁</h2>
				<button onClick={this.likedCallback}>给我点赞</button>
				<h2>总点赞数:{this.state.liked}</h2>
				<h2>我的爱好:</h2>
				<ul>
    				{this.state.hobbies.map((hobby, i) => <Hobby key={i} hobby={hobby} />)}
    			</ul>
				<input type="text" ref="hobby"></input>
				<button onClick={this.addHobbyCallback}>添加爱好</button>
			</div>
		)
	}
}


export default Profile;
