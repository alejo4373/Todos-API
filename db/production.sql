DROP DATABASE IF EXISTS production;
CREATE DATABASE production;

\c production;

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  text VARCHAR NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  value INT NOT NULL
);
