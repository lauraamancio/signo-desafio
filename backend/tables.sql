-- Active: 1657806752877@@35.226.146.116@3306@shaw-21814956-amancio
CREATE TABLE users_signo(
id VARCHAR(255) PRIMARY KEY,
nickname VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role ENUM ("NORMAL", "ADMIN") NOT NULL DEFAULT "NORMAL"
);

SELECT * FROM users_signo;
DROP TABLE users_signo;

CREATE TABLE polls_signo(
id VARCHAR(255) PRIMARY KEY,
creator_id VARCHAR(255) NOT NULL,
FOREIGN KEY (creator_id) REFERENCES users_signo(id),
title VARCHAR(255) NOT NULL UNIQUE,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
answer ENUM ("CONCORDO", "CONCORDO PARCIALMENTE", "DISCORDO", "NÃO SEI OPINAR") NOT NULL
);

SELECT * FROM polls_signo;
DROP TABLE polls_signo;
DELETE FROM polls_signo
WHERE id like "853d3cd8-27e0-496a-9a5d-0b841894834e";
CREATE TABLE answers_polls_signo(
    poll_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (poll_id) REFERENCES polls_signo(id),
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users_signo(id),
    answer ENUM ("CONCORDO", "CONCORDO PARCIALMENTE", "DISCORDO", "NÃO SEI OPINAR") NOT NULL
);

SELECT * FROM answers_polls_signo
WHERE poll_id like "292df261-4da7-4ca3-861c-3484a24982e0"
AND user_id like "ab13b21b-1bdf-4b52-822e-09df367771ac";

SELECT * FROM answers_polls_signo;
DROP TABLE answers_polls_signo;

DELETE from answers_polls_signo
WHERE poll_id like "853d3cd8-27e0-496a-9a5d-0b841894834e";


SELECT answer, COUNT(*) as votes FROM answers_polls_signo
WHERE poll_id LIKE "eb3d83ed-f8b5-4e3f-a911-1e64eca59197"
GROUP BY answer