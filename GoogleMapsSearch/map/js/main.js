function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -9.1191427, lng: -77.0349046 },
    zoom: 6,
    mapTypeId: 'roadmap',
    streetViewControl: false
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  var geocoder = new google.maps.Geocoder();
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
    geocodeAddress(geocoder, map);
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function () {   
    var places = searchBox.getPlaces();
    console.log("aaddlistener " + input.value);
    if (places.length == 0) {
      return;
    }
    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        title: place.name,
        position: place.geometry.location
      });
      
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('pac-input').value;
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK') {
        var addresssss = results[0].geometry.location;
        var direccion = results[0].address_components.length;
        for(var i=0; i<direccion; i++){
          var dir = results[0].address_components[i].types[0]; 
          
          switch (dir) {
            case "street_number":
              var streetNumber = results[0].address_components[i];
              console.log("numero calle: ", streetNumber.long_name);
              break;
            case "route":
              var street = results[0].address_components[i];
              console.log("calle: ", street.long_name);
              break;
            case "locality":
              var district = results[0].address_components[i];
              console.log("distrito: ", district.long_name);
              break;
            case "neighborhood":
              var neighborhood = results[0].address_components[i];
              console.log("neighborhood: ", neighborhood.long_name);
              break;
            case "administrative_area_level_3":
              var administrative_area_level_3 = results[0].address_components[i];
              console.log("Departamento: ", administrative_area_level_3.long_name);
              break;
            case "administrative_area_level_2":
              var provincia = results[0].address_components[i];
              console.log("provincia: ", provincia.long_name);
              break;
            case "administrative_area_level_1":
              var departamento = results[0].address_components[i];
              console.log("Departamento: ", departamento.long_name);
              break;
            case "country":
              var country = results[0].address_components[i];
              console.log("país: ", country.long_name);
              break;
            case "postal_code":
              var postal_code = results[0].address_components[i];
              console.log("Código postal: ", postal_code.long_name);
              break;
            default:
              console.log("No existe");
          }
          if(results[0].address_components[i].types[0] == "political"){
            var dire = results[0].address_components[i].types[i]; 
            switch (dire) {
              case "sublocality":
                var sublocality = results[0].address_components[i];
                console.log("Sub-localidad: ", sublocality.long_name);
                break;
              case "sublocality_level_1":
                var sublocality1 = results[0].address_components[i];
                console.log("Sub-localidad1: ", sublocality1.long_name);
                break;
              case "sublocality_level_2":
                var sublocality2 = results[0].address_components[i];
                console.log("Sub-localidad2: ", sublocality2.long_name);
                break;
              default:
                console.log("No existe");
              }
          }
        }
      console.log(results[0]);
    } else {
      // console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}