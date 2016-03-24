// Debugger, 0 is off.
// $.level = 1;

try {
  // Prompt user to select image file. 
  var imageFile = File.openDialog("Select a *square* PNG file that is at least 1024x1024.", "*.png", false);

  if (imageFile !== null) { 

    var doc = open(imageFile, OpenDocumentType.PNG);
    
    if (doc == null) {
      throw "Unable to read image file. Please make sure it's a valid image.";
    }
    
    if (doc.width != doc.height) {
        throw "Image must be square!";
    } else if ((doc.width < 1024) || (doc.height < 1024)) {
        throw "Image is too small!  Image must be at least 1024x1024 pixels.";
    }


    app.preferences.rulerUnits = Units.PIXELS;  
    var prefsStartState = app.preferences.rulerUnits; 
    var historyStartState = doc.activeHistoryState; 
    // Select folder dialog
    var destFolder = Folder.selectDialog( "Choose an output folder");

    if (destFolder == null) {
      throw "";
    }

    var saveForWeb = new ExportOptionsSaveForWeb();
    saveForWeb.format = SaveDocumentType.PNG;
    saveForWeb.PNG8 = false; // PNG24
    saveForWeb.transparency = true;
    doc.info = null;  // strip metadata
    
    var sizes = [
      {"name": "favicon-16",	 					"size":16},
      {"name": "favicon-32", 						"size":32},
      {"name": "favicon-96", 						"size":96},
      {"name": "favicon-192", 					"size":192},

      {"name": "apple-touch-icon", 			    "size":57},
      {"name": "apple-touch-icon-60",				"size":60},
      {"name": "apple-touch-icon-72",				"size":72},
      {"name": "apple-touch-icon-76",				"size":76},
      {"name": "apple-touch-icon-114",			"size":114},
      {"name": "apple-touch-icon-120",			"size":120},
      {"name": "apple-touch-icon-144",			"size":144},
      {"name": "apple-touch-icon-152",			"size":152},
      {"name": "apple-touch-icon-180",			"size":180},

      {"name": "mstile-square-70",	         "size":70},
      {"name": "mstile-square-144",				   "size":144},
      {"name": "mstile-square-150",				   "size":150},
      {"name": "mstile-square-310",				   "size":310},

      {"name": "launcher-36",						"size":36},
      {"name": "launcher-48",						"size":48},
      {"name": "launcher-72",						"size":72},
      {"name": "launcher-96",						"size":96},
      {"name": "launcher-144",					"size":144},
      {"name": "launcher-192",					"size":192}
    ];

    for (i = 0; i < sizes.length; i++) {
      var icon = sizes[i];
      var destFileName = icon.name + ".png";

      doc.resizeImage(icon.size, icon.size, null, ResampleMethod.BICUBICSHARPER);
      doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, saveForWeb);
      doc.activeHistoryState = historyStartState; // step back to source size
    }

    alert("Icons created!");
  }
}

catch (exception) {
	if ((exception != null) && (exception != ""))
    alert(exception);
}

finally {
    if (doc != null) doc.close(SaveOptions.DONOTSAVECHANGES);
    app.preferences.rulerUnits = prefsStartState;
}