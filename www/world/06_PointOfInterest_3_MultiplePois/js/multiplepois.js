// implementation of AR-Experience (aka "World")
var World = {
	// true once data was fetched
	initiallyLoadedData: false,

	// different POI-Marker assets
	markerDrawable_idle: null,
	markerDrawable_selected: null,

	// list of AR.GeoObjects that are currently shown in the scene / World
	markerList: [],

	// The last selected marker
	currentMarker: null,

	// called to inject new POI data
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {
		// empty list of visible markers
		World.markerList = [];

		// start loading marker assets
		World.markerDrawable_idle = new AR.ImageResource("assets/marker_idle.png");
		World.markerDrawable_selected = new AR.ImageResource("assets/marker_selected.png");

		// loop through POI-information and create an AR.GeoObject (=Marker) per POI
		for (var currentPlaceNr = 0; currentPlaceNr < poiData.length; currentPlaceNr++) {
			var singlePoi = {
				"id": poiData[currentPlaceNr].id,
				"latitude": parseFloat(poiData[currentPlaceNr].latitude),
				"longitude": parseFloat(poiData[currentPlaceNr].longitude),
				"altitude": parseFloat(poiData[currentPlaceNr].altitude),
				"title": poiData[currentPlaceNr].name,
				"description": poiData[currentPlaceNr].description
			};

			/*
				To be able to deselect a marker while the user taps on the empty screen, 
				the World object holds an array that contains each marker.
			*/
			World.markerList.push(new Marker(singlePoi));
		}

		World.updateStatusMessage(currentPlaceNr + ' places loaded');
	},

	// updates status message shon in small "i"-button aligned bottom center
	updateStatusMessage: function updateStatusMessageFn(message, isWarning) {

		var themeToUse = isWarning ? "e" : "c";
		var iconToUse = isWarning ? "alert" : "info";

		$("#status-message").html(message);
		$("#popupInfoButton").buttonMarkup({
			theme: themeToUse
		});
		$("#popupInfoButton").buttonMarkup({
			icon: iconToUse
		});
	},

	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {

		/*
			The custom function World.onLocationChanged checks with the flag World.initiallyLoadedData if the function was already called. With the first call of World.onLocationChanged an object that contains geo information will be created which will be later used to create a marker using the World.loadPoisFromJsonData function.
		*/
		if (!World.initiallyLoadedData) {
			/* 
				requestDataFromLocal with the geo information as parameters (latitude, longitude) creates different poi data to a random location in the user's vicinity.
			*/
			World.requestDataFromLocal(lat, lon);
			World.initiallyLoadedData = true;
		}
	},

	// fired when user pressed maker in cam
	onMarkerSelected: function onMarkerSelectedFn(marker) {

		// deselect previous marker
		if (World.currentMarker) {
			if (World.currentMarker.poiData.id == marker.poiData.id) {
				return;
			}
			World.currentMarker.setDeselected(World.currentMarker);
		}

		// highlight current one
		marker.setSelected(marker);
		World.currentMarker = marker;
	},

	// screen was clicked but no geo-object was hit
	onScreenClick: function onScreenClickFn() {
		if (World.currentMarker) {
			World.currentMarker.setDeselected(World.currentMarker);
		}
	},

	// request POI data
	requestDataFromLocal: function requestDataFromLocalFn(centerPointLatitude, centerPointLongitude) {
	    var poisToCreate = 20;
        var poiData = [];
        var poiBuilding =  [{
                             "is_building_entrance": "false",
                             "floor_number": "0",
                             "pois_type": "Meeting room",
                             "buid": "building_3b0c12aa-83b1-4425-a448-621ce5486a01_1495033336287",
                             "image": "url_to_pois_image",
                             "coordinates_lon": "4.677289724349976",
                             "url": "-",
                             "coordinates_lat": "50.85748739082163",
                             "floor_name": "0",
                             "description": "-",
                             "name": "Zaal 3",
                             "is_door": "false",
                             "is_published": "true",
                             "puid": "poi_20cf59a2-4693-48bd-92f3-d14e5a8d2434"
                           },
                           {
                             "is_building_entrance": "true",
                             "floor_number": "0",
                             "pois_type": "Entrance",
                             "buid": "building_3b0c12aa-83b1-4425-a448-621ce5486a01_1495033336287",
                             "image": "url_to_pois_image",
                             "coordinates_lon": "4.67755526304245",
                             "url": "-",
                             "coordinates_lat": "50.85716230520996",
                             "floor_name": "0",
                             "description": "-",
                             "name": "ICTS A entrance",
                             "is_door": "false",
                             "is_published": "true",
                             "puid": "poi_38b54768-6bf5-44a7-ba26-11ca60228769"
                           },
                           {
                             "is_building_entrance": "false",
                             "floor_number": "0",
                             "pois_type": "Kitchen",
                             "buid": "building_3b0c12aa-83b1-4425-a448-621ce5486a01_1495033336287",
                             "image": "url_to_pois_image",
                             "coordinates_lon": "4.6773554384708405",
                             "url": "-",
                             "coordinates_lat": "50.85734093326144",
                             "floor_name": "0",
                             "description": "-",
                             "name": "refter",
                             "is_door": "false",
                             "is_published": "true",
                             "puid": "poi_63e699ab-3b2b-4b7e-bae2-ba1318773688"
                           },
                           {
                             "is_building_entrance": "false",
                             "floor_number": "0",
                             "pois_type": "Meeting room",
                             "buid": "building_3b0c12aa-83b1-4425-a448-621ce5486a01_1495033336287",
                             "image": "url_to_pois_image",
                             "coordinates_lon": "4.677236080169678",
                             "url": "-",
                             "coordinates_lat": "50.85746961276084",
                             "floor_name": "0",
                             "description": "-",
                             "name": "Zaal 2",
                             "is_door": "false",
                             "is_published": "true",
                             "puid": "poi_c934b205-3b1c-4eeb-b06a-981e4368d306"
                           },
                           {
                             "is_building_entrance": "false",
                             "floor_number": "0",
                             "pois_type": "Meeting room",
                             "buid": "building_3b0c12aa-83b1-4425-a448-621ce5486a01_1495033336287",
                             "image": "url_to_pois_image",
                             "coordinates_lon": "4.67718243598938",
                             "url": "-",
                             "coordinates_lat": "50.857445062094286",
                             "floor_name": "0",
                             "description": "-",
                             "name": "Zaal 1",
                             "is_door": "false",
                             "is_published": "true",
                             "puid": "poi_dc7f5b36-4d68-465e-b279-1e46c899b6e3"
                           }];

        for (var i = 0; i < poiBuilding.length; i++) {
            poiData.push({
                "id": poiBuilding[i].puid,
                "longitude": poiBuilding[i].coordinates_lon,
                "latitude": poiBuilding[i].coordinates_lat,
                "description": poiBuilding[i].description,
                "altitude": AR.CONST.UNKNOWN_ALTITUDE,
                "name": poiBuilding[i].name
            });
        }
        World.loadPoisFromJsonData(poiData);
	}

};

/* 
	Set a custom function where location changes are forwarded to. There is also a possibility to set AR.context.onLocationChanged to null. In this case the function will not be called anymore and no further location updates will be received. 
*/
AR.context.onLocationChanged = World.locationChanged;

/*
	To detect clicks where no drawable was hit set a custom function on AR.context.onScreenClick where the currently selected marker is deselected.
*/
AR.context.onScreenClick = World.onScreenClick;