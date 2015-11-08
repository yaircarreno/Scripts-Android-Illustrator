/**
* Yair Carreno @yaircarreno (yaircarreno@gmail.com)
* Thanks to: @herkulano (http://www.herkulano.com)
* and Niels Bosma (niels.bosma@motorola.com).
*/
var dimensionRef;
var titleRef;
var kind = prompt("What kind of Asset?\nLauncher icons --> Enter 1 (default)\nNotification icons --> Enter 2\nAction bar, Dialog, Tab icons --> Enter 3", "1") || "";
switch(kind) {
	case "1":
	dimensionRef = 48.0;
	titleRef = "ic_launcher"
	break;
	case "2":
	dimensionRef = 24.0;
	titleRef = "ic_stat_name"
	break;
	case "3":
	dimensionRef = 32.0;
	titleRef = "ic_action_name"
	break;
	default:
	dimensionRef = 48.0;
	titleRef = "ic_launcher"
	break;
}
if (kind){
//Crear un documento con la dimension referencia y respectivas propiedades.
	var docPreset = new DocumentPreset;
	docPreset.title = titleRef;
	docPreset.width = dimensionRef;
	docPreset.height = dimensionRef;
	docPreset.numArtboards = 1;
	docPreset.units = RulerUnits.Pixels;
	var docRef = documents.addDocument(DocumentColorSpace.CMYK, docPreset);
	//Crea la base del icono
	var artLayer = docRef.layers[0];
	app.defaultStroked = false;
	app.defaultFilled = true;
	// Create the pathItem by  default
	var ellipse = artLayer.pathItems.ellipse(dimensionRef, 0.0, dimensionRef, dimensionRef, false, true );
	if ( app.documents.length > 0 && app.activeDocument.pathItems.length > 0) {
		frontPath = app.activeDocument.pathItems[0];
		// Set color values for the CMYK object
		newCMYKColor = new CMYKColor();
		newCMYKColor.black = 0;
		newCMYKColor.cyan = 30.4;
		newCMYKColor.magenta = 32;
		newCMYKColor.yellow = 0;
		// Use the color object in the path item
		frontPath.filled = true;
		frontPath.stroked = false;
		frontPath.fillColor = newCMYKColor;
	}
}