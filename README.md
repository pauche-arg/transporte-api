# TransporteAPI

Wrapper de Node.Js para el API de Transporte de la Ciudad de Buenos Aires.

### Instalación
```
npm install transporte-api
```
### Utilización

Registrate aca para conseguir las credenciales https://www.buenosaires.gob.ar/form/formulario-de-registro-api-transporte

```
const TransporteAPI = require('./lib/TransporteAPI');

let transporteTest = new TransporteAPI(client_id, client_secret);
transporteTest.getTripUpdates().then(result => {
		console.dir(result, {depth: null});
});
```
El wrapper devuelve por defecto una respuesta en JSON. Se requiere de una libreria externa para poder decodificar las respuestas codificadas en protobuf.

Consulte el [api-doc](https://api-transporte.buenosaires.gob.ar/console) para revisar los metodos disponibles.
