import React, { Component } from 'react';
import Axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import CurrentGames from '../../components/CurrentGames/CurrentGames';

class Home extends Component {
	state = {
		games  : [
			{ teams: [ 'warriors', 'lakers' ], date: '02-16-2019', key: 'afs' },
			{ teams: [ 'clippers', 'heat' ], date: '02-16-2019', key: 'fba' },
			{ teams: [ 'kings', 'raptors' ], date: '02-16-2019', key: 'asdf' },
			{ teams: [ 'bucks', 'nets' ], date: '02-16-2019', key: 'fasdf' },
			{ teams: [ 'pacers', 'thunder' ], date: '02-16-2019', key: 'fafsdfd' },
			{ teams: [ 'celtics', 'suns' ], date: '02-16-2019', key: 'aasd' }
		],
		isOpen : false
	};

	componentDidMount() {
		// Axios.get('http://data.nba.net/prod/v2/2018/teams.json').then((response) => {
		// 	console.log(response);
		// });
	}

	deleteGame = (index) => {
		const games = [ ...this.state.games ];
		games.splice(index, 1);
		this.setState({ games: games });
	};

	putGame = (index) => (event) => {
		const matchKey = event.target.name;
		const chosenTeam = event.target.innerText;
		console.log(matchKey);
		console.log(chosenTeam);
		this.deleteGame([ index ]);
	};

	toggle() {
		this.setState({
			isOpen : !this.state.isOpen
		});
	}

	render() {
		return (
			<div>
				<Navbar toggle={this.toggle.bind(this)} openStatus={this.state.isOpen} />
				<div className="container">
					<h1 className="text-center">Select who you think will win</h1>
					<hr className="mb-4" />
					<CurrentGames clicked={this.putGame.bind(this)} games={this.state.games} />
					<div id="headToStats" className="px-5">
						<a href="/stats" className="btn btn-danger btn-block mx-auto">
							Head to stats
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
