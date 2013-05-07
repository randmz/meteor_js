// testgrid -- server

function newFilledArray(length, val) {
    var array = [];
    var j = 0;
    while (j < length) {
        array[j++] = val;
    }
    return array;
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

//sumar horas a una fecha
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}
//sumar segundos a una fecha
Date.prototype.addSeconds= function(s){
    this.setSeconds(this.getSeconds()+s);
    return this;
}

function print_r(arr,level) {
  var dumped_text = "";
	if(!level) level = 0;

	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";

	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];

			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += print_r(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
	}

Meteor.startup(function () {
    // code to run on server at startup
	if (Grid.find().count() === 0) {
	
		//para crear un objeto, esto se hará mediante un menú, por lo que no aparecerá aquí
		//ahora está aquí para las pruebas no más
		//var $src = $('#grid-source');
		
		var $link = "images/600x350.jpg";

		//para ver cuántos puntos ocupa cada click (de $25 cada uno)
		var $num_puntos = 2;

		var codigos = [11111, 11112, 11112, 11112, 11112];
		
		//fin datos del formulario
		
		//agregar en la bd de productos cada uno de ellos, con el código y el gridid
		
		var $ancho = 600;
		var $alto = 350;
		var $gsize = 2;
		
		//radio1
		var MAX = 38;
		var MIN = 6;
		var MAXB = 1235813;
		var MINB = 112233;
		
		var $juego = new Juego();
		$juego.add($link, $num_puntos, codigos, $ancho, $alto, $gsize, MAX, MIN, MAXB, MINB);

    }
	
	if (Productos.find().count() === 0) {
		//para crear un producto, esto ser hará mediante un menú, por lo que no aparecerá aquí
		//ahora está aquí para las pruebas no más
		
		var $nombre2 = 'Pendrive Kingston 8gb';
		var $descripcion2 = 'delgado';
		var $foto_chica2 = "images/pendrive-8gb-50x50.jpg";
		var $codigo2 = 11112;
		var $precio_ref2 = '4000';
		
		var prod2 = new Prod();
		prod2.add($nombre2, $descripcion2, $foto_chica2, $codigo2, $precio_ref2);
	
    }
	
	Puntos._ensureIndex({ num : 1 });
});

Meteor.publish('grid', function (gridID) {
  return Grid.find({_id: gridID}, {puntos: 0});
});

Meteor.publish('producto', function (cod) {
  return Productos.find({codigo: cod}, {limit: 1});
});

Meteor.publish('puntos', function (gridID) {
  //return Puntos.find({gridid: gridID, clase: {$ne: "unselected"}},{sort: {fecha: -1}, limit: 10});
  return Puntos.find({gridid: gridID},{sort: {fecha: -1}, limit: 10});
});


Meteor.methods({
	updateGrid: function (gridid, num, user) {
		this.unblock();
		var clases = "";
		var arr2 = 1;
		
		/* método muy sensible (~180 líneas), para llamarlo desde el cliente / código protegido */

	}
});

function getDaysInMonth(month,year) {     
    if( typeof year == "undefined") year = 1999; // any non-leap-year works as default     
    var currmon = new Date(year,month),     
        nextmon = new Date(year,month+1);
    return Math.floor((nextmon.getTime()-currmon.getTime())/(24*3600*1000));
} 
function getDateTimeSince(now, target) { // target should be a Date object
	//setInterval(getDateTimeSince, 1000);
    //var now = new Date();
	var diff, out = [];
    diff = Math.floor((now.getTime()-target.getTime())/(1000));

	var minutosm = 60;
	var horasm = 3600;
	var diasm = (horasm*24);
	var diasd = (diff%diasm);
	var horasd = (diasd%horasm);
	
	var dias = Math.floor(diff/diasm);
	var horas = Math.floor(diasd/horasm);
	var minutos = Math.floor(horasd/minutosm);
	var segundos = (horasd%minutosm);
	
	if( segundos <= 9) {segundos = '0'+segundos;}
	if( minutos <= 9) {minutos = '0'+minutos;}
	if( horas <= 9) {horas = '0'+horas;}
	if( dias <= 9) {dias = '0'+dias;}
	
	if(dias > 0) out.push(dias + 'd\xeda' + (dias <= 1 ? "" : "s"));
	if( (dias > 0) || (horas > 0)) out.push(horas+"h");
    if( (horas > 0) || (minutos > 0)) out.push(minutos+"m");
    out.push(segundos+"s");
	
	var diffecha = out.join(" ");
	//$('.tiempo').html('Tiempo: '+diffecha);
	return diffecha;
} 
function getDateTimeFor(now, target) { // target should be a Date object
	//setInterval(getDateTimeSince, 1000);
    //var now = new Date();
	var diff, out = [];
    diff = Math.floor((target.getTime() - now.getTime())/(1000));

	var minutosm = 60;
	var horasm = 3600;
	var diasm = (horasm*24);
	var diasd = (diff%diasm);
	var horasd = (diasd%horasm);
	
	//var dias = Math.floor(diff/diasm);
	var horas = Math.floor(diasd/horasm);
	var minutos = Math.floor(horasd/minutosm);
	var segundos = (horasd%minutosm);
	
	if( segundos <= 9) {segundos = '0'+segundos;}
	if( minutos <= 9) {minutos = '0'+minutos;}
	if( horas <= 9) {horas = '0'+horas;}
	//if( dias <= 9) {dias = '0'+dias;}
	
	//if(dias > 0) out.push(dias + 'd\xeda' + (dias <= 1 ? "" : "s"));
	if(horas >= 0) out.push(horas+":");
    if(minutos >= 0) out.push(minutos+":");
    out.push(segundos+"");
	
	var diffecha = out.join("");
	//$('.tiempo').html('Tiempo: '+diffecha);
	return diffecha;
}

//tiempo
Meteor.setInterval(function () {

	/* código sensible (~100 líneas) que se ejecuta cada 1 segundo / código protegido */

}, 1000);

/* código total sin proteger: 443 líneas */
