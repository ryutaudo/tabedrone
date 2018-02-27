function getDistance(geocodeA, geocodeB) {
  // point 1
  const between2parallels = 111.3; // unit: km
  const between2meridians = 71.5; // unit: km

  const rad = 0.01745; // 1° = π/180 rad ≈ 0.01745
  const lat = (geocodeA.latitude - geocodeB.latitude) / 2 * rad;

  // point 2
  const dx = between2meridians * Math.cos(lat) * (geocodeA.longitude - geocodeB.longitude);
  const dy = between2parallels * (geocodeA.latitude - geocodeB.latitude);

  // point 3
  return Math.sqrt((dx * dx) + (dy * dy));
}

module.exports = getDistance;


//// point 1
// const geocodeFromRoppongiHills = { latitude: 35.6817124, longitude: 139.7166117 };
// const geocodeFromAkihabara = { latitude: 35.7022077, longitude: 139.7722703 };

// // point 2
// const distanceInCentimeter = getDistance (
//      geocodeFromRoppongiHills,
//      geocodeFromAkihabara
// );

// // point 3
// console.log ("cm distance is:::: ", distanceInCentimeter);

/*

exact match
y = 6;
arr = [1,2,6,11];
for (i=0;i<arr.length;i++){
	if(y===arr[i]){
		return arr[i];
    }
}

closest match
function closest (num, arr) {
  var curr = arr[0];
  var diff = Math.abs (num - curr);
  for (var val = 0; val < arr.length; val++) {
      var newdiff = Math.abs (num - arr[val]);
      if (newdiff < diff) {
          diff = newdiff;
          curr = arr[val];
      }
  }
  return curr;
}
  */