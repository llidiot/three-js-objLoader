			
	function sphere() {
			
	
			var space;
			var camera, scene, renderer;
			var raycaster;
			var mouse;
			var PI2 = Math.PI * 2;
			var INTERSECTED;

			//finding intersections


			//end


			space = document.createElement( 'div' );
			space.style.position = 'absolute';
			var container = document.getElementById('three');
			container.appendChild( space );
			

			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera( 75, three.clientWidth/three.clientHeight, 0.1, 1000 );

			renderer = new THREE.WebGLRenderer({antialias: true});
			renderer.setSize( three.clientWidth, three.clientHeight);
			//document.body.appendChild( renderer.domElement );

			space.appendChild( renderer.domElement );


			for(var i = 0; i < 20; i++) {
				var geometry = new THREE.SphereGeometry( 20, 20, 20 );
				var material = new THREE.MeshLambertMaterial( {color: Math.random() * 0x808080 + 0x808080,} );
				var sphere = new THREE.Mesh( geometry, material );
				sphere.position.y = Math.random()*250 - 125;
				sphere.position.x = Math.random()*400 - 200;
				sphere.position.z = Math.random()*200 - 100;
				scene.add( sphere );

			}
			//adding stuff
			raycaster = new THREE.Raycaster();
			mouse = new THREE.Vector2();
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );

			//end



			var pointLight =
			  new THREE.PointLight(0xFFFFFF);

			// set its position
			pointLight.position.x = 20;
			pointLight.position.y = 50;
			pointLight.position.z = 130;

			// add to the scene
			scene.add(pointLight);


			var pointLight2 =
			  new THREE.PointLight(0xFFFFFF);

			// set its position
			pointLight2.position.x = -20;
			pointLight2.position.y = -50;
			pointLight2.position.z = -130;

			// add to the scene
			scene.add(pointLight2);

			camera.position.z = 200;
			window.addEventListener( 'resize', onWindowResize, false );
			function onWindowResize() {
				camera.aspect = three.clientWidth/three.clientHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( three.clientWidth, three.clientHeight );
			}

			//more stuff
				function onDocumentMouseMove( event ) {
				event.preventDefault();
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			}

			//


			var radius = 300;
			var theta = 0;


			var render = function () {

				theta += 0.1;
				camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
				camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
				camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
				camera.lookAt( scene.position );
				camera.updateMatrixWorld();




				requestAnimationFrame( render );

				sphere.rotation.x += 0.01;
				sphere.rotation.y += 0.01;


				//casting rays

				raycaster.setFromCamera( mouse, camera );
				var intersects = raycaster.intersectObjects( scene.children );
				if ( intersects.length > 0 ) {
					if ( INTERSECTED != intersects[ 0 ].object ) {
						
						if ( INTERSECTED ) INTERSECTED.material.color.setHex(Math.random() * 0x808080 + 0x808080);
						INTERSECTED = intersects[ 0 ].object;
						INTERSECTED.material.color.setHex(0xff0000);
					}
				} else {
					if ( INTERSECTED ) INTERSECTED.material.color.setHex(Math.random() * 0x808080 + 0x808080);
					INTERSECTED = null;
				}


				//end of casting rays



				renderer.render(scene, camera);


			};

			render();
	}

	sphere();



