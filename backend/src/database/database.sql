CREATE DATABASE mern_skeleton;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  _id uuid  PRIMARY KEY DEFAULT uuid_generate_v4(), 
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  created TIMESTAMP DEFAULT NOW(),
  updated TIMESTAMP,
  salt VARCHAR(255),
  UNIQUE(email)
);