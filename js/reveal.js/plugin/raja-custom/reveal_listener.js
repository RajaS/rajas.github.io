Reveal.addEventListener( 'slidechanged', function( event ) {

    // is there an img with caliper class
    var image = event.currentSlide.querySelector(".caliper-image");
    console.log(image);

    if (image){
	// insert canvas
	var canvas = document.createElement('canvas');

	canvas.setAttribute('width', image.getAttribute("width"));
	canvas.setAttribute('height', image.getAttribute("height"));
	canvas.setAttribute('img-src', image.getAttribute("src"));
	canvas.setAttribute('img-length', image.getAttribute("img-length"));
	
	// remove img
	image.parentNode.replaceChild(canvas, image);

	// initialise caliper
	var calipercanvas=CaliperCanvas(canvas);

    }

} );

