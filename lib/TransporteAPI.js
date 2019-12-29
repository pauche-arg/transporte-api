const fetch = require('node-fetch');

class TransporteAPI {
	constructor(client_id, client_secret, json = 1) {
		this.client_id = client_id;
		this.client_secret = client_secret;
		this.base = "https://apitransporte.buenosaires.gob.ar";
		this.json = json;
		if (!(client_id, client_secret)) console.warn('Falta el client_id o client_secret!');
	}



	get(path, base = this.base, client_id = this.client_id, client_secret = this.client_secret) {
				console.log(`${base}${path}${path.includes('?') ? '&' : '?'}client_id=${client_id}&client_secret=${client_secret}`)
		return fetch(`${base}${path}${path.includes('?') ? '&' : '?'}client_id=${client_id}&client_secret=${client_secret}`).then(this.json > 0 ? result => result.json() : result => result.text());
	}

	pathSolver(fn, args) {
		let fnArgs = fn.toString().match(/(?<=\()(.*?)(?=\))/s, '');
		let pathArray = fnArgs[0].replace(/\s+/g, '').split(",");
		let parameters = "";
		for(let i = 0; i < Object.keys(args).length; i++) {
			if (args[i]) {
				if ( i != Object.keys(args).length - 1) {
				parameters += pathArray[i] + "=" + args[i] + "&";
			} 
			else parameters += pathArray[i] + "=" + args[i]	
		}
}
		return parameters
	}


	//subtes

	getSubtesFeed() {
		return this.get('/subtes/feed-gtfs')
	}

	getForecastGTFS() {
		 return this.get('/subtes/forecastGTFS')
	}

	getSubtesServiceAlerts(json = this.json) {
		return this.get('/subtes/serviceAlerts?json=' + json)
	}

	// trenes

	getTrenesFeed() {
		 return this.get('/trenes/feed-gtfs')
	}

	getTrenesVehiclePositions(json = this.json) {
		return this.get('/trenes/vehiclePositions?json=' + json)
	}

	getTripUpdates(json = this.json) {
		return this.get('/trenes/tripUpdates?json=' + json)
	}

	getTrenesServiceAlerts(json = this.json) {
		return this.get('/trenes/serviceAlerts?json=' + json)
	}

	//colectivos

	getColectivosFeed() {
		return this.get('/colectivos/feed-gtfs')
	}

	getColectivosFeedFreq() {
		return this.get('/colectivos/feed-gtfs-frequency')
	}

	getColectivosVehiclePositions(json = this.json, agency_id, route_id, trip) {
		let getArgs = this.pathSolver(this.getColectivosVehiclePositions, arguments);
	return this.get('/colectivos/vehiclePositions?' + getArgs);
	}

	getSimpleColectivoVehiclePositions(json = this.json, agency_id, route_id, trip) {
		let getArgs = this.pathSolver(this.getSimpleColectivoVehiclePositions, arguments);
		return this.get('/colectivos/vehiclePositionsSimple?' + getArgs);
	}

	getColectivosServiceAlerts(json = this.json, agency_id, route_id, trip) {
		let getArgs = this.pathSolver(this.getColectivosServiceAlerts, arguments);
		return this.get('/colectivos/serviceAlerts?' + getArgs);
	}

	//ecobicis

	getSystemInformation() {
		return this.get('/ecobici/gbfs/systemInformation')
	}

	getStationStatus() {
		return this.get('/ecobici/gbfs/stationStatus')
	}

	getStationInformation() {
		return this.get('/ecobici/gbfs/stationInformation')
	}

	//estacionamientos

	getGarajesComerciales(x, y, srid, radio, orden, limite, formato, fullInfo) {
		if (!(x, y)) throw new TypeError("Faltan las coordenadas x o y.");
		let getArgs = this.pathSolver(this.getGarajesComerciales, arguments);
		return this.get('/estacionamiento/garajesComerciales?' + getArgs)
	}

	getCargayDescarga(x, y, srid, radio, orden, limite, formato, fullInfo) {
		if (!(x, y)) throw new TypeError("Faltan las coordenadas x o y.");
		let getArgs = this.pathSolver(this.getCargayDescarga, arguments);
		return this.get('/estacionamiento/cajonesCargaDescarga?' + getArgs)
	}

	getParadasColectivo(x, y, srid, radio, orden, limite, formato, fullInfo) {
		if (!(x, y)) throw new TypeError("Faltan las coordenadas x o y.");
		let getArgs = this.pathSolver(this.getParadasColectivo, arguments);
		return this.get('/estacionamiento/cajonesParadasColectivo?' + getArgs)
	}

	getEstacionamientosMoto(x, y, srid, radio, orden, limite, formato, fullInfo) {
		if (!(x, y)) throw new TypeError("Faltan las coordenadas x o y.");
		let getArgs = this.pathSolver(this.getEstacionamientosMoto, arguments);
		return this.get('/estacionamiento/cajonesEstacionamientosMoto?' + getArgs)
	}

	//transito

	getEstacionamientos(x, y, srid, radio, limite, formato, fullInfo) {
		if (!(x, y)) throw new TypeError("Faltan las coordenadas x o y.");
		let getArgs = this.pathSolver(this.getEstacionamientos, arguments);
		return this.get('/transito/v1/estacionamientos?' + getArgs)
	}

	getCortes() {
		return this.get('/transito/v1/cortes')
	}

	getSemaforos(lat, lon, radius) {
		let getArgs = this.pathSolver(this.getSemaforos, arguments);
		return this.get('/transito/v1/semaforos?' + getArgs)
	}

	getEventos(month, provider) {
		let getArgs = this.pathSolver(this.getEventos, arguments);
		return this.get('/transito/v1/eventos?' + getArgs)
	}


}


module.exports = TransporteAPI;