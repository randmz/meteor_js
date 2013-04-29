// testgrid -- client
//LLENAR ESTE ID CON EL POST AL HACER CLICK, COLOCÁNDOLO EN LA URL TB
var gid = "1";

click_td = function(conta, coordy, coordx, $valorx, $cols, $block){  	
	var conta2 = 'cont'+conta;

  /* función al hacer click / código protegido */
	
}
	
function refreshGrid(){
	document.getElementById('refresh-grid-div').disabled = true;
	$('#textoRefresh').fadeOut('slow');
	$('#grid').fadeOut('slow', function() {
	// Animation complete.
		$('#loading').fadeIn('slow');
		Session.set('auxRun_'+gid, 1);
	});
}
	
function setTextoRefresh(){
	if((Session.get('IntRefresh_'+gid) > 0)&&(Session.get('ref_checked_'+gid) == 'checked')){	
		var intref = Session.get('IntRefresh_'+gid);
		intref--;
		Session.set('IntRefresh_'+gid, intref);
		if(intref > 0){
			$('#textoRefresh').html('Refrescando en '+intref+' segundos');
		}else{
			refreshGrid();
		}
	}
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

Session.set('auxRun_'+gid, 0);
Session.set('IntRefresh_'+gid, 30);
Session.set('intRefaux_'+gid, 1);

//para la opción de autorefresco... se lee desde la bd del usario
Session.set('ref_checked_'+gid, 'checked');
		
//Meteor.subscribe("directory");

Session.set("gridID_"+gid, gid);
Session.set("grid-div_"+gid, "1");

//session blocks
Session.set("block1_"+gid, 0);
Session.set("block2_"+gid, 0);
Session.set("block3_"+gid, 0);
Session.set("block4_"+gid, 0);

var gridHandle = Meteor.subscribe('grid', Session.get("gridID_"+gid), function () {
  Session.set('auxRun_'+gid, 1);
});
/*Meteor.subscribe("grid", Session.get("gridID"), function(){
	Session.set('auxRun', 1);
});*/


Meteor.startup(function () {
	Meteor.autorun(function () {
		var ses = Session.get('auxRun_'+gid);
		if(ses == 1){
			var res = Grid.find({});
			//var res = Grid.find({}, {fields: {gsize: 2}});
			if(res.count() > 0)
			{
			
				var resFetch = res.fetch()[0];

				var img = document.getElementById("imagen");
				img.src = resFetch.link;

				/* otras variables y código sensible / código protegido */
				
				$src.css('width', $cols*$gsize+'px').css('height', $rows*$gsize+'px');
				
				if(Session.get('intRefaux_'+gid)){
					var intervalRefresh = setInterval(function() {setTextoRefresh();}, 1000);
					Session.set('intRefaux_'+gid, 0);
				}
				//var end = new Date().getTime();
				//var time = end - start;
				//alert('Execution time: ' + time);
				$('#loading').fadeOut('slow');
				
				if(Session.get("grid-div_"+gid) == "1"){
					$('#loaded').fadeIn('slow');
					Session.set("grid-div_"+gid, "0");
				}else{
					$('#grid').fadeIn('slow', function () {
						Session.set('IntRefresh_'+gid, 30);
						$('#textoRefresh').fadeIn('slow');
					});
					document.getElementById('refresh-grid-div').disabled = false;
				}
			}
		}
		Session.set('auxRun_'+gid, 0);
		//document.getElementById('refresh-grid-div').disabled = false;
	});

});

Template.settings.events({
    'click input.refresh-grid': function () {
		//refrescar
		refreshGrid();
    },
	'click input.ref_check': function () {
		//alert('click');
		
		//esto debe actualizar la config del usuario
		(Session.get('ref_checked_'+gid) == 'checked') ? Session.set('ref_checked_'+gid, 'no-checked'): Session.set('ref_checked_'+gid, 'checked');
	}
});

Template.tablaPuntos.clicks = function () {
	Meteor.subscribe("puntos", Session.get("gridID_"+gid));
    return Puntos.find({}, {sort:{fecha:1}, reactive:true});
  };
  
Template.datos_var.tiempo_prod = function () {
	var grid = Grid.findOne(Session.get("gridID_"+gid));
	return grid && grid.tiempo_prod;
};
  
/* otras funciones de templates / código protegido */

Template.descripcion.productos = function () {
	Meteor.subscribe("producto", Session.get("cod0_"+gid));
	return Productos.find({});
};

Template.click.premio = function () {
	return (this.clase == 'clickeado') ? "clickeado-text": '';
};

Template.datos_var.rendered = function () {
	/* código sensible al renderizar el template / código protegido */
};

Template.settings.ref_checked = function () {
	return (Session.get('ref_checked_'+gid) == 'checked') ? 'checked="checked"': '';
};
