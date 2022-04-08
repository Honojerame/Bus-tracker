mapboxgl.accessToken =
			'pk.eyJ1IjoidGVzdHVzZXIxMDAwIiwiYSI6ImNraDkzZ2pkMzAzMHoycnBmMXpvZ3UwZnMifQ.jAE4YsPeAJv50VK92NSpOQ';

		// TODO: create the map object using mapboxgl.map() function
		let map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-71.104081, 42.365554],
			zoom: 14,
		});

		let marker = new mapboxgl.Marker().setLngLat([-71.092761, 42.357575]).addTo(map);

		async function run() {
			// get bus data    
			const locations = await getBusLocations();
			//console.log(new Date());
			//console.log(locations.data);
			let markerArray = [];

				// pushes long and lat to a markerArray
				markerArray.push(locations.data[0].attributes.longitude);

				markerArray.push(locations.data[0].attributes.latitude);

				marker.setLngLat(markerArray);
		
				 console.log(markerArray);
				 console.log(marker);

			// timer
			setTimeout(run, 10000);
		}

		// Request bus data from MBTA
		async function getBusLocations() {
			const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
			const response = await fetch(url);
			const file = await response.text();
			var obj = JSON.parse(file);
			return obj;

		}

		run();
		
		if (typeof module !== 'undefined') {
			module.exports = { move, counter, marker, busStops };
		}