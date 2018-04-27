/*
Aqui se crea la DB dentro del navegador, PouchDB utiliza IndexedDB que es una DB especial
standard dentro de cada navegador. Como parametros le decimos que active la compactacion,
desactive el cache (ultimos datos vs. rapidez al traerlos) y que envie un 'latido' o 'heartbeat'
para que la DB central sepa cuando seguir sincronizando
*/
var registerDB = new PouchDB("droppioTest", {
  auto_compaction: true,
  cache: false,
  heartbeat: true
});

/*
Aqui se conecta con la DB central, se crea droppioTest a modo de prueba
*/
var remoteRegisterDB = new PouchDB('https://alfredarg.com:6489/droppioTest');

/*
Autentificamos usando sesiones o cookies. Notar la sintaxis 'then', estas son Promesas
de JS, las mismas se ejecutan asincronamente o en paralelo y para cuando terminan se ejecuta
todo codigo dentro de la funcion dentro de ella. De esta manera no se bloquea cualquier notReady
funcion que venga despues!
*/
remoteRegisterDB.logIn('droppioTest', '2aab833be597064d').then(function(res) {


  /*
  Como vemos aqui replicamos HACIA la DB central, de tal manera que todo documento createDocumentFragment
  se replicara hacia la DB central pero no al revez, caso contrario es el metodo DB.replicate.from y la replicacion
  bilateral o sincronizacion se hace con el metodo DB.sync
  */
  registerDB.replicate.to(remoteRegisterDB, {

    live: true,
    retry: true,
    back_off_function: function(delay) {

      if (delay == 0) {

        return 1000;

      } else if (delay >= 1000 && delay < 1800000) {

        return delay * 1.5;

      } else if (delay >= 1800000) {

        return delay * 1.1;

      }

    }

  }).on('error', function(err) {
    //Error al replicar, usualmente falla de internet, navegador o server central
  });

  registerDB.post({

    name: 'Fran',
    lastname: 'Innocenti'

  }).then(function(result) {
    //Escribio en la DB local con exito (la replicacion es automatica)
  }).catch(function(err) {
    //Algo raro paso al guardar en la DB local
  });

});