/* GENRE */
INSERT INTO genre (
name
) VALUES (
'Action'
)

INSERT INTO genre (
name
) VALUES (
'Puzzle'
)

INSERT INTO genre (
name
) VALUES (
'Adventure'
)

/* GAME */
INSERT INTO game (
title,
description,
genre_id,
release_date,
image_url,
url_slug
) VALUES (
'Tetris',
'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque maiores, nulla vero amet aliquam iusto Atque obcaecati dolores, quisquam repellendus pariatur aliquam, labore itaque beatae dicta officia.',
'2',
'1980-02-02',
'https://via.placeholder.com/60x60png?text="placeholder',
'tetris'
)

INSERT INTO game (
title,
description,
genre_id,
release_date,
image_url,
url_slug
) VALUES (
'Pac-man',
'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque maiores, nulla vero amet aliquam iusto Atque obcaecati dolores, quisquam repellendus pariatur aliquam, labore itaque beatae dicta officia.',
'1',
'1999-02-02',
'https://via.placeholder.com/60x60png?text="placeholder',
'pac-man'
)

INSERT INTO game (
title,
description,
genre_id,
release_date,
image_url,
url_slug
) VALUES (
'Cabal',
'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque maiores, nulla vero amet aliquam iusto Atque obcaecati dolores, quisquam repellendus pariatur aliquam, labore itaque beatae dicta officia.',
'3',
'2005-07-03',
'https://via.placeholder.com/60x60png?text="placeholder',
'cabal'
)

/* SCORE */
INSERT INTO score (
game,
game_id,
player,
score,
score_date
) VALUES (
'Tetris',
'1',
'Martin Doe',
'7000',
'2022/09/22'
)

INSERT INTO score (
game,
game_id,
player,
score,
score_date
) VALUES (
'Pac-man',
'2',
'Anders Doe',
'350',
'2022/07/23'
)

INSERT INTO score (
game,
game_id,
player,
score,
score_date
) VALUES (
'Cabal',
'3',
'Johan Doe',
'500',
'2022/05/02'
)

INSERT INTO score (
game,
game_id,
player,
score,
score_date
) VALUES (
'Cabal',
'3',
'Johan Doe',
'500',
'2022/05/02'
)

INSERT INTO score (
game,
game_id,
player,
score,
score_date
) VALUES (
'Cabal',
'3',
'Johan Doe',
'6000',
'2022/05/30'
)

