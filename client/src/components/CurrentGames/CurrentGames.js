import React from 'react';

const currentGames = (props) => {
	return props.games.map((game, index) => {
		return (
			<div className="container mb-3">
				<div className="game-card row mx-5 rounded pt-3">
					<div className="col-5 text-center">
						<button
							onClick={props.clicked('index')}
							name={game.key}
							className="mb-3 btn btn-danger btn-block"
							style={{ 'text-transform': 'capitalize' }}
						>
							{game.teams[0]}
						</button>
					</div>
					<div className="col-2 text-center">
						<p>VS</p>
					</div>
					<div className="col-5 text-center">
						<button
							onClick={props.clicked('index')}
							name={game.key}
							className="my-auto btn btn-danger btn-block"
							style={{ 'text-transform': 'capitalize' }}
						>
							{game.teams[1]}
						</button>
					</div>
				</div>
			</div>
		);
	});
};

export default currentGames;
