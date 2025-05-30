#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const SQL = `
	CREATE TABLE IF NOT EXISTS members (
		id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		fullname VARCHAR ( 255 ),
		username VARCHAR ( 255 ),
		password VARCHAR ( 255 ),
		membership BOOLEAN,
		admin BOOLEAN
	);

	CREATE TABLE IF NOT EXISTS messages (
		id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		author INTEGER references members(id),
		date TIMESTAMP DEFAULT NOW(),
		title varchar ( 255 ),
		content varchar ( 255 )
	);
`;

async function main() {
	console.log("Seeding...");

	const client = new Client({
		connectionString: process.env.CONNECTION_URI,
		ssl: {
			rejectUnauthorized: false,
		},
	});

	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log("Done");
};

main();