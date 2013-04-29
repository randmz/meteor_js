Grid = new Meteor.Collection("grid");
Puntos = new Meteor.Collection("puntos");
Productos = new Meteor.Collection("productos");

Grid.allow({
  insert: function(gridId, grids){
		return false;
	},
	update: function(options){
		return false;
	},
	remove: function(options){
		return false;
	}
});
