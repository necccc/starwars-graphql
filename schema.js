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
		starships(first: Int = 6 offset: Int = 0): [Starship]
		_starshipsMeta: _PaginatedPropertyMeta
		homeworld: Planet
		species(first: Int = 6 offset: Int = 0): [Species]
		_speciesMeta: _PaginatedPropertyMeta
		vehicles(first: Int = 6 offset: Int = 0): [Vehicle]
		_vehiclesMeta: _PaginatedPropertyMeta
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
		_pilotsMeta: _PaginatedPropertyMeta
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
		_pilotsMeta: _PaginatedPropertyMeta
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
		_residentsMeta: _PaginatedPropertyMeta
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
		_peopleMeta: _PaginatedPropertyMeta
  }


  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
		Person(id: ID): Person
		allPersons(page:Int): [Person]
		_allPersonsMeta: _QueryMeta
		Starship(id: ID): Starship
		allStarships(page:Int): [Starship]
		_allStarshipsMeta: _QueryMeta
		Vehicle(id: ID): Vehicle
		allVehicles(page:Int): [Vehicle]
		_allVehiclesMeta: _QueryMeta
		Planet(id: ID): Planet
		allPlanets(page:Int): [Planet]
		_allPlanetsMeta: _QueryMeta
		Species(id: ID): Species
		allSpecies(page:Int): [Species]
		_allSpeciesMeta: _QueryMeta
	}
`;