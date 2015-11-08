/**
* Yair Carreno @yaircarreno (yaircarreno@gmail.com)
* Thanks to: @herkulano (http://www.herkulano.com)
*/
alert( "Por favor a continuacion seleccione la carpeta destino" );
var folder = Folder.selectDialog();
var document = app.activeDocument;

if (document && folder) {
	var documentName = document.name;
	var documentNameWithoutExtension = nameWithoutExtension(documentName);
	var nameProject = prompt("Enter the name of your project", "") || "";
	var rootFile = 	folder.absoluteURI + "/" + nameProject + "/";
	var foldersAssets = document.width < 48 ? "drawable-" : "mipmap-";
	saveToRes(100, foldersAssets + "mdpi", true);
	saveToRes(150, foldersAssets + "hdpi", true);
	saveToRes(200, foldersAssets + "xhdpi", true);
	saveToRes(300, foldersAssets + "xxhdpi", true);
	saveToRes(400, foldersAssets + "xxxhdpi", true);
	//Guarda el proyecto como SVG
	exportFileToSVG(rootFile + documentName);
	//Guarda el proyecto en formato AI
	exportFileToAI(rootFile + documentName);
	alert( "Exportados los iconos notifications a : "  + rootFile);
} else {
	alert( "El directorio seleccionado es invalido");
}

/**
* Guarda los png.
*/
function saveToRes(scaleTo, folderName, lowerCase) {
	var i, ab, file, options;

	var myFolder = new Folder(rootFile + folderName);
	if(!myFolder.exists) myFolder.create();
	
	for (i = document.artboards.length - 1; i >= 0; i--) {
		document.artboards.setActiveArtboardIndex(i);
		ab = document.artboards[i];
		
		var fileName = ab.name;
		
		if(lowerCase){
			var fileNameLowerCase = "";
			
			for (var j = 0; j < fileName.length; j++) {
				if(isUpperCase(fileName.charAt(j))){
					if(j > 0){
						fileNameLowerCase += "_";
					}
					fileNameLowerCase += fileName.charAt(j).toLowerCase();
				}
				else{
					fileNameLowerCase += fileName.charAt(j);
				}
			}
			fileName = fileNameLowerCase;
		}

		file = new File(myFolder.fsName + "/" + documentNameWithoutExtension + ".png");
		
		options = new ExportOptionsPNG24();
		options.antiAliasing = true;
		options.transparency = true;
		options.artBoardClipping = false;
		options.verticalScale = scaleTo;
		options.horizontalScale = scaleTo;
		
		document.exportFile(file, ExportType.PNG24, options);
	}
}
// Transforma todo a minuscula.
function isUpperCase(myString) { 
	return (myString == myString.toUpperCase()); 
}
//Elimina la extension del nombre del documento.
function nameWithoutExtension(myName) {
	var finalDotPosition = myName.lastIndexOf( "." );
	if ( finalDotPosition > -1 ) {
	  return myName.substr( 0 , finalDotPosition );
	 }
	return myName;
}
// Guarda el proyecto en formato SVG para integrar con Android Studio Vector Assets.
function exportFileToSVG (dest) {
	if ( app.documents.length > 0 ) {
		var exportOptions = new ExportOptionsSVG();
		var type = ExportType.SVG;
		var fileSpec = new File(dest);
		exportOptions.embedRasterImages = true;
		exportOptions.embedAllFonts = false;
		exportOptions.fontSubsetting = SVGFontSubsetting.GLYPHSUSED;
		app.activeDocument.exportFile( fileSpec, type, exportOptions );
	}
}
//Guarda el proyecto Illustrator en formato AI.
function exportFileToAI (dest) {
	if ( app.documents.length > 0 ) {
		var saveOptions = new IllustratorSaveOptions();
		var ai8Doc = new File(dest);
		saveOptions.compatibility = Compatibility.ILLUSTRATOR8;
		saveOptions.flattenOutput = OutputFlattening.PRESERVEAPPEARANCE;
		app.activeDocument.saveAs( ai8Doc, saveOptions );
	}
}