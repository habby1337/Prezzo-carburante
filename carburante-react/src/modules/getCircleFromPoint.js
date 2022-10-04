function getCircleFromPoint(lat, lng, rad, detail = 24) { //detail = 360 / number of point

    var points = []

    var r = 6371;

    var pi = Math.PI;

    var _lat = (lat * pi) / 180;
    var _lng = (lng * pi) / 180;
    var d = (rad / 1000) / r;

    var i = 0;

    for (i = 0; i <= 360; i += detail) {
        var brng = i * pi / 180;

        var pLat = Math.asin(Math.sin(_lat) * Math.cos(d) + Math.cos(_lat) * Math.sin(d) * Math.cos(brng));
        var pLng = ((_lng + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(_lat), Math.cos(d) - Math.sin(_lat) * Math.sin(pLat))) * 180) / pi;
        pLat = (pLat * 180) / pi;

        points[i] = [pLat, pLng];
    }

    return points;
}

export default getCircleFromPoint;