
THREE.OBJLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.OBJLoader.prototype = {

	constructor: THREE.OBJLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.XHRLoader( scope.manager );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( text ) );

		}, onProgress, onError );

	},



	parse: function ( text ) {

		var container = new THREE.Object3D();

		var geo = new THREE.Geometry();

		//stores colors of vertices
		var vcolors = [];

		// v float float float float float float

		var vertex_pattern1 = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

		// v float float float

		var vertex_pattern2 = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

		// vn float float float

		var normal_pattern = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

		// f vertex//normal vertex//normal vertex//normal ...

		var face_pattern4 = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;

		var lines = text.split( '\n' );
		//alert(lines.length);

		
		for ( var i = 0; i < lines.length; i ++ ) {

			var line = lines[ i ];
			line = line.trim();

			var result;

			if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

				continue;

			} else if ( ( result = vertex_pattern1.exec( line ) ) !== null ) {
				
				geo.vertices.push(new THREE.Vector3(parseFloat( result[ 1 ] ), parseFloat( result[ 2 ] ), 
					parseFloat( result[ 3 ] )));
				var color = new THREE.Color( parseFloat( result[4] ), parseFloat( result[5]), parseFloat( result[ 6 ] ) );
				vcolors.push(color);


			} else if ( ( result = vertex_pattern2.exec( line ) ) !== null ) {
				geo.vertices.push(new THREE.Vector3(parseFloat( result[ 1 ] ), parseFloat( result[ 2 ] ), 
					parseFloat( result[ 3 ] )));

			 } else if ( ( result = normal_pattern.exec( line ) ) !== null ) {

				//do nothing

			} else if ( ( result = face_pattern4.exec( line ) ) !== null ) {
				var fa = new THREE.Face3(parseFloat(result[ 2 ] ) -1, parseFloat( result[ 5 ] ) -1, 
					parseFloat( result[ 8 ] )-1);
				fa.vertexColors[0] = vcolors[parseFloat(result[ 2 ] ) -1];
				fa.vertexColors[1] = vcolors[parseFloat(result[ 5 ] ) -1];
				fa.vertexColors[2] = vcolors[parseFloat(result[ 8 ] ) -1];
				geo.faces.push(fa);


			 }  else {

			 }

		}

		geo.computeFaceNormals();

		// Using this material is important.
		var mat = new THREE.MeshPhongMaterial({vertexColors: THREE.VertexColors});

		var mesh = new THREE.Mesh(geo, mat);
		container.add( mesh );
		

		console.timeEnd( 'OBJLoader' );

		return container;

	}

};
