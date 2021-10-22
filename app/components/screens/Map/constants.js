const mapStyle = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e9e9e9',
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dedede',
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#ffffff',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        saturation: 36,
      },
      {
        color: '#333333',
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f2f2f2',
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#fefefe',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#fefefe',
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
];

const initialCamera = {
  center: {
    latitude: 39.2904,
    longitude: -76.6122,
  },
  pitch: 1,
  heading: 1,

  // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
  altitude: 5000,

  // Only when using Google Maps.
  zoom: 15,
};

const getBoundByRegion = (region, scale = 1) => {
  /*
  * Latitude : max/min +90 to -90
  * Longitude : max/min +180 to -180
  */
  // Of course we can do it mo compact but it wait is more obvious
  const calcMinLatByOffset = (lng, offset) => {
    const factValue = lng - offset;
    if (factValue < -90) {
      return (90 + offset) * -1;
    }
    return factValue;
  };

  const calcMaxLatByOffset = (lng, offset) => {
    const factValue = lng + offset;
    if (90 < factValue) {
      return (90 - offset) * -1;
    }
    return factValue;
  };

  const calcMinLngByOffset = (lng, offset) => {
    const factValue = lng - offset;
    if (factValue < -180) {
      return (180 + offset) * -1;
    }
    return factValue;
  };

  const calcMaxLngByOffset = (lng, offset) => {
    const factValue = lng + offset;
    if (180 < factValue) {
      return (180 - offset) * -1;
    }
    return factValue;
  };

  const latOffset = region.latitudeDelta / 2 * scale;
  const lngD = (region.longitudeDelta < -180) ? 360 + region.longitudeDelta : region.longitudeDelta;
  const lngOffset = lngD / 2 * scale;

  return {
    minLng: calcMinLngByOffset(region.longitude, lngOffset), // westLng - min lng
    minLat: calcMinLatByOffset(region.latitude, latOffset), // southLat - min lat
    maxLng: calcMaxLngByOffset(region.longitude, lngOffset), // eastLng - max lng
    maxLat: calcMaxLatByOffset(region.latitude, latOffset),// northLat - max lat
  }
}

const getDistanceInMeters = (region) => {
  const { minLat: lat1, minLng: lon1, maxLat: lat2, maxLng: lon2 } = getBoundByRegion(region);
  var R = 6371; // radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // distance in km
  return d * 1000;
}

const deg2rad = (deg) => {
  return deg * (Math.PI / 180)
}

export { mapStyle, initialCamera, getDistanceInMeters };
