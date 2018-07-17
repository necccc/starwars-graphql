const { gql } = require('apollo-server-express');
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
module.exports = gql`
  	# Comments in GraphQL are defined with the hash (#) symbol.

	type _QueryMeta@cacheControl(maxAge: 3600) {
		count: Int!
		itemsPerPage: Int
	}

	type _PaginatedPropertyMeta@cacheControl(maxAge: 3600) {
		count: Int!
	}

	interface Node {
		id: ID
	}

  	type Person implements Node@cacheControl(maxAge: 240) {
		id: ID
		name: String
		picture: String
		gender: String
		eye_color: String
		hair_color: String
		mass: String
		skin_color: String
		birth_year: String
		homeworld: Planet
		starships(first: Int = 6 offset: Int = 0): [Starship]
		starshipsCount: Int
		species(first: Int = 6 offset: Int = 0): [Species]
		speciesCount: Int
		vehicles(first: Int = 6 offset: Int = 0): [Vehicle]
		vehiclesCount: Int
  	}

  	type personPages@cacheControl(maxAge: 3600)  {
		page: Int!,
		count: Int!
		items: [Person]
  	}

  	type Starship implements Node@cacheControl(maxAge: 3600) {
		id: ID
		name: String
		model: String
		starship_class: String
		manufacturer: String
		hyperdrive_rating: String
		cargo_capacity: String
		length: String
		passengers: String
		crew: String
		consumables: String
		MGLT: String
		picture: String
		pilots(first: Int = 6 offset: Int = 0): [Person]
		pilotsCount: Int
  	}

  	type starshipPages@cacheControl(maxAge: 3600)  {
		page: Int!,
		count: Int!
		items: [Starship]
 	}

  	type Vehicle@cacheControl(maxAge: 3600) {
		id: ID
		name: String
		model: String
		manufacturer: String
		vehicle_class: String
		cargo_capacity: String
		passengers: String
		crew: String
		consumables: String
		picture: String
		pilots(first: Int = 6 offset: Int = 0): [Person]
		pilotsCount: Int
  	}

  	type vehiclePages@cacheControl(maxAge: 3600)  {
		page: Int!,
		count: Int!
		items: [Vehicle]
  	}


  	type Planet implements Node@cacheControl(maxAge: 3600) {
		id: ID
		name: String
		terrain: String
		climate: String
		diameter: String
		gravity: String
		orbital_period: String
		population: String
		rotation_period: String
		surface_water: String
		picture: String
		residents(first: Int = 6 offset: Int = 0): [Person]
		residentsCount: Int
  	}

  	type planetPages@cacheControl(maxAge: 3600)  {
		page: Int!,
		count: Int!
		items: [Planet]
  	}

  	type Species implements Node@cacheControl(maxAge: 3600) {
		id: ID
		name: String
		classification: String
		homeworld: Planet
		designation: String
		language: String
		average_height: String
		average_lifespan: String
		picture: String
		people(first: Int = 6 offset: Int = 0): [Person]
		peopleCount: Int
	}

	type speciesPages@cacheControl(maxAge: 3600)  {
		page: Int!,
		count: Int!
		items: [Species]
	}

  	# The "Query" type is the root of all GraphQL queries.
  	# (A "Mutation" type will be covered later on.)
  	type Query {
		Person(id: ID): Person
		personPages(page: Int): personPages
		Starship(id: ID): Starship
		starshipPages(page: Int): starshipPages
		Vehicle(id: ID): Vehicle
		vehiclePages(page: Int): vehiclePages
		Planet(id: ID): Planet
		planetPages(page: Int): planetPages
		Species(id: ID): Species
		speciesPages(page: Int): speciesPages
	}
`;