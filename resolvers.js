
// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const imageMap = {
	"person": "/assets/img/characters/ID.jpg",
	"planet": "/assets/img/planets/ID.jpg",
	"vehicle": "/assets/img/vehicles/ID.jpg",
	"starship": "/assets/img/starships/ID.jpg",
	"species": "/assets/img/species/ID.jpg",
}
const imageHost = 'https://starwars-visualguide.com'
const itemsPerPage = 10

const createId = (method, id) => {
	const kind = getKind(method)
	const uid = kind.split('').map((s) => s.charCodeAt(0)).reduce((n, c) => (n * c),1).toString(16)

	return `${uid}::${id}`
}

const getKind = (method) => method.replace('List', '').replace('get', '').toLowerCase()

const getImageUrl = function (method, id) {
	const kind = getKind(method)

	return imageHost + imageMap[kind].replace('ID', id)
}

const getItemListWithID = async (dataSources, getMethod, page) => {
	const data = await dataSources.starWars[getMethod](page)
	const count = data.count
	const items = data.results.map(item => {
		const id = item.url.match(/\d+\d*/)[0]

		item.id = createId(getMethod, id)
		item.picture = getImageUrl(getMethod, id)

		return item
	})

	return {
		count,
		page,
		items
	}
}

const getListMeta = async (dataSources, getMethod) => {
	const data = await dataSources.starWars[getMethod](1)
	const count = data.count

	return {
		count,
		itemsPerPage
	}
}

const getItemWithID = async (dataSources, getMethod, id) => {
	const [ hash, parsedId ] = id.split('::')
	const data = await dataSources.starWars[getMethod](parsedId)

	data.id = id
	data.picture = getImageUrl(getMethod, parsedId)

	return data
}

const getList = async (restUrls, getMethod, dataSources, args) => {
	const ids = restUrls.map(url => url.match(/\d+\d*/)[0]).map(s => createId(getMethod, s))

	const count = ids.length
	const { first, offset } = args

	const data = ids.slice(offset, offset + first).map(async (id) => {
		return await getItemWithID(dataSources, getMethod, id)
	})
	return data
}

const getSubListCount = async (restUrls, metaField) => {
	const count = restUrls.length

	return count
}

const getItem = async (restUrl, getMethod, dataSources) => {

	if (!restUrl) { return {} }

	const id = restUrl.match(/\d+\d*/)[0]
	return await getItemWithID(dataSources, getMethod, createId(getMethod, id))
}

module.exports = {
	Query: {
	  	Person: (_, { id }, { dataSources }) => {
			return getItemWithID(dataSources, 'getPerson', id)
	  	},
	  	personPages: (_, { page }, { dataSources }) => {
			return getItemListWithID(dataSources, 'getPersonList', page)
		},
	  	Starship: (_, { id }, { dataSources }) => {
			return getItemWithID(dataSources, 'getStarship', id)
	  	},
	  	starshipPages: (_, { page }, { dataSources }) => {
			return getItemListWithID(dataSources, 'getStarshipList', page)
		},
	  	Vehicle: (_, { id }, { dataSources }) => {
			return getItemWithID(dataSources, 'getVehicle', id)
	  	},
	  	vehiclePages: (_, { page }, { dataSources }) => {
			return getItemListWithID(dataSources, 'getVehicleList', page)
		},
	  	Planet: (_, { id }, { dataSources }) => {
			return getItemWithID(dataSources, 'getPlanet', id)
	  	},
	  	planetPages: (_, { page }, { dataSources }) => {
			return getItemListWithID(dataSources, 'getPlanetList', page)
		},
	  	Species: (_, { id }, { dataSources }) => {
			return getItemWithID(dataSources, 'getSpecies', id)
	  	},
	  	speciesPages: (_, { page }, { dataSources }) => {
			return getItemListWithID(dataSources, 'getSpeciesList', page)
		},
	},
	Person: {
	  starships: ({ starships }, { first, offset }, { dataSources }) => getList(starships, 'getStarship', dataSources, { first, offset }),
	  starshipsCount: ({ starships }) => getSubListCount(starships, '_starshipsMeta'),
	  homeworld: ({ homeworld }, _, { dataSources }) => getItem(homeworld, 'getPlanet', dataSources),
	  species: ({ species }, { first, offset }, { dataSources }) => getList(species, 'getSpecies', dataSources, { first, offset }),
	  speciesCount: ({ species }) => getSubListCount(species, '_speciesMeta'),
	  vehicles: ({ vehicles }, { first, offset }, { dataSources }) => getList(vehicles, 'getVehicle', dataSources, { first, offset }),
	  vehiclesCount: ({ vehicles }) => getSubListCount(vehicles, '_vehiclesMeta'),
	},
	Starship: {
		pilots: ({ pilots }, { first, offset }, { dataSources }) => getList(pilots, 'getPerson', dataSources, { first, offset }),
		pilotsCount: ({ pilots }) => getSubListCount(pilots, '_pilotsMeta'),
	},
	Vehicle: {
		pilots: ({ pilots }, { first, offset }, { dataSources }) => getList(pilots, 'getPerson', dataSources, { first, offset }),
		pilotsCount: ({ pilots }) => getSubListCount(pilots, '_pilotsMeta'),
	},
	Planet: {
		residents: ({ residents }, { first, offset }, { dataSources }) => getList(residents, 'getPerson', dataSources, { first, offset }),
		residentsCount: ({ residents }) => getSubListCount(residents, '_residentsMeta'),
	},
	Species: {
		homeworld: ({ homeworld }, _, { dataSources }) => getItem(homeworld, 'getPlanet', dataSources),
		people: ({ people }, { first, offset }, { dataSources }) => getList(people, 'getPerson', dataSources, { first, offset }),
		peopleCount: ({ people }) => getSubListCount(people, '_peopleMeta'),
	},
	Node: {
		__resolveType(obj, context, info) {
			return null;
		}
	}
};