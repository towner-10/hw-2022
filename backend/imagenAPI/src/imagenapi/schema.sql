DROP TABLE IF EXISTS gens;
DROP TABLE IF EXISTS jobs;

PRAGMA foreign_keys = ON;

CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
);


CREATE TABLE gen (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prompt TEXT NOT NULL,
  status TEXT NOT NULL,
  job_id INT,
  FOREIGN KEY(job_id) REFERENCES jobs(id)
);