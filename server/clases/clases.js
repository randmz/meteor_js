/* clases de js */

Prod = function(){
  
	this.add = function($nombre, $descripcion, $foto_chica, $codigo, $precio_ref){
		var prodid = Productos.insert({
			"codigo": $codigo,
			"nombre": $nombre,
			"descripcion": $descripcion,
			"precio_ref": $precio_ref,
			"foto": $foto_chica
		});
		
	}
}

Juego = function(){
	
	this.add = function($link, $num_puntos, codigos, $ancho, $alto, $gsize, MAX, MIN, MAXB, MINB){
		//para ver el precio del producto gordo
		var $precio = 0;
		var $ganancia = 0;
	
		var $cercano = 0;
		var $valorx = 0;
		
		var $contador = 0;

		var $contador_total = ($ancho/$gsize) * ($alto/$gsize);


		//radio para cada prod
		var i = codigos.length;
		var le = i;

    /* VARIABLES Y FUNCIONES SENSIBLES - CÓDIGO PROTEGIDO */
		
		var $arr0 = newFilledArray($contador_total, 0);
		$arr0[cont12xy-1] = 2; 
		
		var fecha = new Date();
		//CAMBIAR DESPUÉS
		var fecha_end = new Date().addSeconds(40);
		//var fecha_end = new Date().addHours(4);
		
		//cambiar el id dp por el por defecto que entrega mongo
		var gridid = Grid.insert({
			"_id": "1",
			"link": $link,
			"ancho": $ancho,
			"alto": $alto,
			"gsize": $gsize,
			"cols": $cols,
			"rows": $rows,
		/* otros campos - CÓDIGO PROTEGIDO */
			"fecha": Date.parse(fecha),
			"fecha_full": fecha,
			"fecha_end": fecha_end,
			"fecha_det": fecha_det,
			"fecha_obs": '',
			"tiempo_prod": '',
			"fecha_end_cont": 0,
			"skin": 1,
			"arr": $arr0
		});
		
		//var start = new Date().getTime();
				
		//test crypt

    /* ENCRIPTACION - CÓDIGO PROTEGIDO */

		/*var end = new Date().getTime();
		var time = end - start;
		console.log('Execution time: ' + time);
		*/	
		
		var puntoss = Puntos.insert({
						"gridid": gridid,
						"cx": radioi1x,
						"cy": radioi2y,
						"num": cont12xy,
						"clase": "cercano",
						"user": "Punto inicial",
						"fecha": Date.parse(fecha),
						"fecha_full": fecha
					});
	}
}
/* código total sin proteger: 260 líneas */
