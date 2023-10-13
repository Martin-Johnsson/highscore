CREATE DATABASE highscore

CREATE TABLE genre (
	id INTEGER GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(50) NOT NULL,
		UNIQUE (name),
		PRIMARY KEY (id)
);

CREATE TABLE game (
	id INTEGER GENERATED ALWAYS AS IDENTITY,
	title VARCHAR(50) NOT NULL,
	description VARCHAR(250),
	genre_id INTEGER NOT NULL,
	release_date DATE NOT NULL,
	image_url VARCHAR(250) NOT NULL,
	url_slug VARCHAR(50) NOT NULL,
		UNIQUE (title),
		UNIQUE(url_slug),
		PRIMARY KEY (id),
		FOREIGN KEY (genre_id)
			REFERENCES genre (id)
)

	CREATE TABLE score (
	id INTEGER GENERATED ALWAYS AS IDENTITY,
	game VARCHAR(50) NOT NULL,
	game_id INTEGER,
	player VARCHAR(50) NOT NULL,
	score INTEGER NOT NULL,
	score_date DATE NOT NULL,
		PRIMARY KEY (id),
		FOREIGN KEY (game_id)
			REFERENCES game (id)
			ON DELETE CASCADE
)
















CREATE TABLE game_highscores (
id INTEGER GENERATED ALWAYS AS IDENTITY,
game_id INTEGER NOT NULL,
highscore_id INTEGER NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (game_id)
	REFERENCES game (id),
FOREIGN KEY (highscore_id)
	REFERENCES highscores (id)
)










SELECT id,
game_id FROM score
WHERE id = 1