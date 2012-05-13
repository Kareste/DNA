var stage;
var personaje;
var mainLayer;
var diagonal = {};
var imageObj;
var statusY = 0;
var statusX = 0;
$(document).ready(function() {
	stage = new Kinetic.Stage({
          container: "container",
          width: 900,
          height: 600
        });

 	mainLayer = new Kinetic.Layer();

 	imageObj = new Image();
 	imageObj.onload = function(){
	    personaje = new Kinetic.Image({
	      x: stage.getWidth() / 2,
	      y: stage.getHeight() / 2,
	      image: imageObj,
	      crop:{
	      	x: 0, y: 0, width: 30, height:30
	      },
	      width: 30,
	      height: 30
	      
	    });
	    // add the shape to the layer
	    mainLayer.add(personaje);

	    // add the layer to the stage
	    stage.add(mainLayer);
	    var tiempo = 0;
	    stage.onFrame(function (frame){
	    	//console.log(tiempo);
	    	if(tiempo == 20){
	    		tiempo = 0;
		    	personaje.setX(newV(personaje.getX(),37,39,900));
	    		personaje.setY(newV(personaje.getY(),38,40,600));
	    		rotar(37,38,39,40);
	       		}
	       		tiempo++;
	       		personaje.setX(newV(personaje.getX(),37,39,900));
	    		personaje.setY(newV(personaje.getY(),38,40,600));
	    		mainLayer.draw();
       		});

	    stage.start();
	}

	imageObj.src = "img/green/thelegendofzeldafourswords_link-green_sheet.png";
    
    $("#container").attr('tabindex','0');
	$("#container").focus();
    
    $("#container").keydown(function(event) {
	  diagonal[event.which] = true;
	});
	 $("#container").keyup(function(event) {
	  diagonal[event.which] = false;
	});

});

function newV(v,a,b,w) {
	var velocidad = 10;
    var n = parseInt(v, 10) - (diagonal[a] ? velocidad : 0) + (diagonal[b] ? velocidad : 0);
    
    return n < 0 ? 0 : n > w ? w : n;
}

function rotar(izquierda,arriba,derecha,abajo)
{

	if(diagonal[izquierda]){
		cambiarSprite(personaje,0,51);
		personaje.setScale(1,1);		
	}
	else if (diagonal[arriba]){
		cambiarSprite(personaje,0,26);
	}
	else if (diagonal[derecha]){
		cambiarSprite(personaje,0,51);	
		personaje.setScale(-1,1);	
	}	
	else if (diagonal[abajo]){
		cambiarSprite(personaje,0,0);
	}
	else{
		statusX =  statusX < 2? statusX + 1 : 0;
		cambiarSprite(personaje,statusY == 26 ? 0: statusX,statusY);
	}
}

/*setInterval(function() {
    personaje.setX(newV(personaje.getX(),37,39,900));
    personaje.setY(newV(personaje.getY(),38,40,600));
    rotar(37,38,39,40);
    
    mainLayer.draw();
    /*box.css({
        left: function(i,v) { return newv(v, 37, 39); },
        top: function(i,v) { return newv(v, 38, 40); }
    });
}, 20);*/

function cambiarSprite(sprite,x,y){
	var widthS = sprite.getWidth();
	var heightS = sprite.getHeight();
	//sprite.transitionTo({crop:{x: widthS*x, y: heightS*y, width: widthS, height:heightS},
	//	duration:1});	
	sprite.setCrop({x: widthS*x, y: heightS*y});
	if(statusY != y)
	  statusY = y;
	if(statusX != x)
		statusX = x;
}



