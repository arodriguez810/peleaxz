MAP = function () {
    this.TILE_SIZE = 256;
    this.basic = function (content, location, options) {
        var content = $(content)[0];
        var dir = new google.maps.LatLng(location.lat, location.lng);
        var mapOptions = {center: dir};
        mapOptions = DSON.merge(mapOptions, options);
        return {obj: new google.maps.Map(content, mapOptions), options: mapOptions};
    };
    this.pixel = function (map, description) {
        var coordInfoWindow = new google.maps.InfoWindow();
        var maper = new MAP();
        coordInfoWindow.setContent(maper.createInfoWindowContent(map.options.center, map.obj.getZoom(), description));
        coordInfoWindow.setPosition(map.options.center);
        coordInfoWindow.open(map.obj);
        map.obj.addListener('zoom_changed', function () {
            coordInfoWindow.setContent(maper.createInfoWindowContent(map.options.center, map.obj.getZoom(), description));
            coordInfoWindow.open(map.obj);
        });
    };
    this.createInfoWindowContent = function (latLng, zoom, description) {
        var scale = 1 << zoom;
        var maper = new MAP();
        var worldCoordinate = maper.project(latLng);
        var pixelCoordinate = new google.maps.Point(
            Math.floor(worldCoordinate.x * scale),
            Math.floor(worldCoordinate.y * scale));
        var tileCoordinate = new google.maps.Point(
            Math.floor(worldCoordinate.x * scale / this.TILE_SIZE),
            Math.floor(worldCoordinate.y * scale / this.TILE_SIZE));
        return [
            description,
            'LatLng: ' + latLng
        ].join('<br>');
    };
    this.project = function (latLng) {
        var siny = Math.sin(latLng.lat() * Math.PI / 180);
        siny = Math.min(Math.max(siny, -0.9999), 0.9999);
        return new google.maps.Point(this.TILE_SIZE * (0.5 + latLng.lng() / 360), this.TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
    }
};