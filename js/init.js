function select(data) {
    return document.querySelector(data);
}

function init() {    
    var configIcon = document.getElementById('btnConfig');
    var selectPadSet = document.querySelector('.validate');
    var userInterface = document.getElementById('userInterface');
    var sets = document.querySelectorAll('.sets');
    var previous = document.getElementById('left');
    var next = document.getElementById('right');
    var helpBtn = document.getElementById('helpBtn');
    
    var raycaster, intersects;
    var mouse = new THREE.Vector2(), INTERSECTED;
    
    var div3D = select('#destination');
    
    var body = select('body');
    var pads = [];
    var intersects;
    
//    RESETING CAMERA
    var resetCamera = select('#resetCamera');
    
    for (var i = 0; i < sets.length; i += 1) {
        sets[i].style.right = - (i * 100) + "%";
    }
    
    window.setTimeout(function() {
        launchCssTyping();
    }, 700);
    
    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera( 40, div3D.clientWidth / div3D.clientHeight, 1, 1000 );
    
    var renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( div3D.clientWidth, div3D.clientHeight );
    renderer.setClearColor( '#0C1218' );
    renderer.sortObjects = false;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.shadowMapAutoUpdate = true;
    
    div3D.appendChild( renderer.domElement );
    
    // TRACKBALLCONTROL
    controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.target.set(0,0,0);
    controls.minDistance = 50;
    controls.maxDistance = 800;
    
    // Camera for Trackball Controls
    camera.position.set( 45 * (Math.PI / 180) , -400 , 600 );
    
    // JSON LOADER
    var loader = new THREE.JSONLoader;
    var mesh;
    loader.load('js/sp.js', function(geometry) {
        
//        var material = new THREE.MeshBasicMaterial({
//            map: THREE.ImageUtils.loadTexture('assets/texture/wood.jpg')
//        });
        
        var material = new THREE.MeshPhongMaterial({
            color: '#9da3a6',
            emissive: '#9da3a6',
//            specular: 'darkgrey',
            shininess: 100,
            metal: true,
//            shading: new THREE.SmoothShading
        });
        
        var mesh = new THREE.Mesh(
            geometry,
            material
        );
        
        mesh.castShadow = true;
        mesh.receiveShadow = true;
//        mesh.overdraw = true;
        mesh.scale.set(10,10,10);
        mesh.position.set(1,-20,0.1);
        mesh.rotation.x = 1.57;
        
        scene.add(mesh);
    });
    
    scene.add( new THREE.AmbientLight( 0x404040 ) );
    
    var light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 400, -400, 300 );
    light.castShadow = true;
    
    light.shadowCameraNear = 500;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 30;
    
    light.shadowBias = 0.0022;
    light.shadowDarkness = 0.55;
    
    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;
    
    scene.add( light );
    
    for (var i = 0; i < 12; i+= 1) {
        var objectTemp = new THREE.Mesh(new THREE.BoxGeometry(26,26,10), new THREE.MeshLambertMaterial({ color: '#dfdfdf' }));
        
        objectTemp.name = "pad" + (i + 1);
        objectTemp.position.z = 16;
        
        if ( i + 1 === 1 || i + 1 === 5 || i + 1 === 9 ) {
            objectTemp.position.x = -70;
        }
        
        if ( i + 1 === 2 || i + 1 === 6 || i + 1 === 10 ) {
            objectTemp.position.x = -39;
        }
        
        if ( i + 1 === 3 || i + 1 === 7 || i + 1 === 11 ) {
            objectTemp.position.x = -8;
        }
        
        if ( i + 1 === 4 || i + 1 === 8 || i + 1 === 12 ) {
            objectTemp.position.x = 24;
        }
        
        if ( i + 1 === 1 || i + 1 === 2 || i + 1 === 3 || i + 1 === 4 ) {
            objectTemp.position.y = -60;
        }
        
        if ( i + 1 === 5 || i + 1 === 6 || i + 1 === 7 || i + 1 === 8 ) {
            objectTemp.position.y = -95;
        }
        if ( i + 1 === 9 || i + 1 === 10 || i + 1 === 11 || i + 1 === 12 ) {
            objectTemp.position.y = -130;
        }
        
        objectTemp.overdraw = true;
        objectTemp.castShadow = true;
        objectTemp.receiveShadow = true;
        
        pads.push(objectTemp);
        
        scene.add(objectTemp);
        
    }
    
    var loopBtn = new THREE.Mesh(new THREE.BoxGeometry(18,10,10), new THREE.MeshLambertMaterial({color:'#dfdfdf'}));
    loopBtn.position.set(58,2,16);
    loopBtn.castShadow = true;
    loopBtn.receiveShadow = true;
    scene.add(loopBtn);
    
    // FONCTION D'INITIALISATION DE LA POSITION DE LA SOURIS
    function onClick( event ) {
        event.preventDefault();
        
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
        raycaster = new THREE.Raycaster();
        
        raycaster.setFromCamera( mouse, camera );
        
        intersects = raycaster.intersectObjects(pads);
        
        if (intersects.length > 0) {
            
            padPressed((intersects[0].object.name.substring(3)) - 1);
            
            window.setTimeout(function() {
                padUnpressed(intersects[0]);
            }, 100);
        } else {
            intersects = null;
        }
    }
    
    // FONCTION DE DÉTECTION CLAVIER
    function keyPressed(e) {
//        console.log(e.keyCode);
        if (e.keyCode === 65) {
            padPressed(0, e);
        }
        if (e.keyCode === 90) {
            padPressed(1, e);
        }
        if (e.keyCode === 69) {
            padPressed(2, e);
        }
        if (e.keyCode === 82) {
            padPressed(3, e);
        }
        if (e.keyCode === 81) {
            padPressed(4, e);
        }
        if (e.keyCode === 83) {
            padPressed(5, e);
        }
        if (e.keyCode === 68) {
            padPressed(6, e);
        }
        if (e.keyCode === 70) {
            padPressed(7, e);
        }
        if (e.keyCode === 87) {
            padPressed(8, e);
        }
        if (e.keyCode === 88) {
            padPressed(9, e);
        }
        if (e.keyCode === 67) {
            padPressed(10, e);
        }
        if (e.keyCode === 86) {
            padPressed(11, e);
        }
        if (e.keyCode === 76) {
            padIsDown(loopBtn);
            audioApp.loopToggle(audioApp.lastPadPressed);
            if (audioApp.lastPadPressed.isLooped === true) {
                loopBtn.material.color = new THREE.Color("rgb(255,0,0)");
            } else if (audioApp.lastPadPressed.isLooped === false) {
                loopBtn.material.color = new THREE.Color("#dfdfdf");
            }
        }
    }
    
    // FONCTION DE DÉTECTION CLAVIER
    function keyUnpressed(e) {
        if (e.keyCode === 65) {
            padUnpressed(0);
        }
        if (e.keyCode === 90) {
            padUnpressed(1);
        }
        if (e.keyCode === 69) {
            padUnpressed(2);
        }
        if (e.keyCode === 82) {
            padUnpressed(3);
        }
        if (e.keyCode === 81) {
            padUnpressed(4);
        }
        if (e.keyCode === 83) {
            padUnpressed(5);
        }
        if (e.keyCode === 68) {
            padUnpressed(6);
        }
        if (e.keyCode === 70) {
            padUnpressed(7);
        }
        if (e.keyCode === 87) {
            padUnpressed(8);
        }
        if (e.keyCode === 88) {
            padUnpressed(9);
        }
        if (e.keyCode === 67) {
            padUnpressed(10);
        }
        if (e.keyCode === 86) {
            padUnpressed(11);
        }
        if (e.keyCode === 76) {
            padIsUp(loopBtn);
        }
    }
    
    var kick1 = document.getElementById('kick1');
    
    function padIsDown(pad) {
        pad.position.z = 14;
    }
    
    function padIsUp(pad) {
        pad.position.z = 16;
    }
    
    function padPressed(pad, e) {
        e.repeat = true;
//        console.log(e);
        
        if (e.shiftKey === true) { // HERE IS THE SP'S "REMAIN" FUNCTION
            audioApp.lastPadPressed = audioApp.padConf[pad];
            if (audioApp.lastPadPressed.isLooped === true) {
                loopBtn.material.color = new THREE.Color("rgb(255,0,0)");
            } else if (audioApp.lastPadPressed.isLooped === false) {
                loopBtn.material.color = new THREE.Color("#dfdfdf");
            }
            console.log(audioApp.lastPadPressed);
        } else if (e.shiftKey === false) {
            // Checking if evt is a keyboard event or click
            if (pad.hasOwnProperty('object')) {
                audioApp.lastPadPressed = Number(pad.object.name.substring(3)) - 1;
                padIsDown(pad.object);
                audioApp.playSound(pad);
                window.setTimeout(function () {
                    padIsUp(pad.object);
                }, 100);
            } else {
                audioApp.lastPadPressed = audioApp.padConf[pad];
                padIsDown(pads[pad]);
                audioApp.playSound(pad);
            }
        }
    }
    
    function padUnpressed(pad) {
        if (pad.hasOwnProperty('object')) {
            padIsUp(pad.object)
        } else {
            padIsUp(pads[pad]);
        }
    }
    
    // FONCTION DE RENDU
    // Les mouvements de caméra s'instancie ici
    function render() {
        controls.update();
        renderer.render(scene,camera);
    }
    
    function animate() {
        requestAnimationFrame( animate );
        render();
    }
    
    animate();
    
    function reSize () {
        camera.aspect = div3D.clientWidth / div3D.clientHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize( div3D.clientWidth, div3D.clientHeight );
    }
    
    window.addEventListener('resize', reSize, false);
    
    window.addEventListener( 'click', onClick, false );
    
//    window.addEventListener( 'mousemove', cameraPosition, false);
    
    document.addEventListener('keydown', keyPressed, false);
    document.addEventListener('keyup', keyUnpressed, false);
    
    configIcon.addEventListener('click', displayConfigPanel, false);
    selectPadSet.addEventListener('click', displayConfigPanel, false);
    helpBtn.addEventListener('click', displayHelp, false);
    left.addEventListener('click', swipe, false);
    right.addEventListener('click', swipe, false);
    
    // Swipe function for the kit selector
    function swipe(evt) {
        'use strict';
        var sets = document.querySelectorAll('.sets'),
            i,
            rightStyle,
            rightNumbered,
            source = evt.target || evt.srcElement;

        if (source.id === "right") {
            if (sets[0].style.right === ((sets.length - 1)*100) + "%") {
                console.log('no more kit');
            } else {
                // Setting the selected kit in audio app
                audioApp.selectCount += 1;
                audioApp.selectedKit = audioApp.kits[audioApp.selectCount];
                console.log(audioApp.selectedKit);
                
                for (i = 0; i < sets.length; i += 1) {
                    rightStyle = sets[i].style.right;
                    rightNumbered = Number(rightStyle.substring(0, (rightStyle.length-1)));

                    sets[i].style.right = rightNumbered + 100 + "%";
                }
            }
        }
        if (source.id === "left") {
            if (sets[sets.length - 1].style.right === (-(sets.length - 1)*100) + "%") {
                console.log('no more kit');
            } else {
                // Setting the selected kit in audio app
                audioApp.selectCount -= 1;
                audioApp.selectedKit = audioApp.kits[audioApp.selectCount];
                console.log(audioApp.selectedKit);
                
                for (i = 0; i < sets.length; i += 1) {
                    rightStyle = sets[i].style.right;
                    rightNumbered = Number(rightStyle.substring(0, (rightStyle.length-1)));

                    sets[i].style.right = rightNumbered - 100 + "%";
                }
            }
        }
    }
    
    function displayConfigPanel() {
        'use strict';

        var configPanel = document.getElementById('configuration'),
            canvas = document.querySelector('canvas');
        
        if (userInterface.classList.contains('blured')) {
            console.log('youpi');
            console.log(audioApp.selectedKit);
            audioApp.startLoadingSample(audioApp.selectedKit); // Load selected kit !
        }

        configPanel.classList.toggle('decalRight');
        userInterface.classList.toggle('blured');
        canvas.classList.toggle('blured');
    }
    
    function displayHelp() {
        var helpPanel = document.getElementById('help');
        
        helpPanel.classList.toggle('decalRight');
    }
    
    var testKit = [
        'assets/audio/test-kit/kick1.wav',
        'assets/audio/test-kit/snare1.wav',
        'assets/audio/test-kit/snare2.mp3',
        'assets/audio/test-kit/kick2.mp3',
        'assets/audio/test-kit/hi.mp3',
        'assets/audio/test-kit/loop1.wav',
    ];
    
    var grooveKit = [
        'assets/audio/GrooveKit/slice1-1.wav',
        'assets/audio/GrooveKit/slice1-2.wav',
        'assets/audio/GrooveKit/slice1-3.wav',
        'assets/audio/GrooveKit/slice1-4.wav',
        'assets/audio/GrooveKit/slice1-5.wav',
        'assets/audio/GrooveKit/slice1-6.wav',
        'assets/audio/GrooveKit/slice1-7.wav',
        'assets/audio/GrooveKit/slice1-8.wav',
        'assets/audio/GrooveKit/slice2-1.wav',
        'assets/audio/GrooveKit/slice2-2.wav',
        'assets/audio/GrooveKit/slice2-3.wav',
        'assets/audio/GrooveKit/slice2-4.wav',
    ];
    
    var grooveKit2 = [
        'assets/audio/GrooveKit2/slice1-1.wav',
        'assets/audio/GrooveKit2/slice1-2.wav',
        'assets/audio/GrooveKit2/slice1-3.wav',
        'assets/audio/GrooveKit2/slice1-4.wav',
        'assets/audio/GrooveKit2/slice2-1.wav',
        'assets/audio/GrooveKit2/slice2-2.wav',
        'assets/audio/GrooveKit2/slice2-3.wav',
        'assets/audio/GrooveKit2/slice2-4.wav',
        'assets/audio/GrooveKit2/slice3-1.wav',
        'assets/audio/GrooveKit2/slice3-2.wav',
        'assets/audio/GrooveKit2/slice3-3.wav',
        'assets/audio/GrooveKit2/slice3-4.wav',
    ];
    
    var IDontGiveAFuckKit = [
        'assets/audio/IDontGiveAFuckKit/kick.wav',
        'assets/audio/IDontGiveAFuckKit/snare.wav',
        'assets/audio/IDontGiveAFuckKit/reverse-hihat.wav',
        'assets/audio/IDontGiveAFuckKit/hihat.wav',
        'assets/audio/IDontGiveAFuckKit/cong.wav',
        'assets/audio/IDontGiveAFuckKit/loop1.wav',
        'assets/audio/IDontGiveAFuckKit/loop2.wav',
        'assets/audio/IDontGiveAFuckKit/loop3.wav',
        'assets/audio/IDontGiveAFuckKit/vocal1.wav',
        'assets/audio/IDontGiveAFuckKit/vocal2.wav',
        'assets/audio/IDontGiveAFuckKit/vocal3.wav',
        'assets/audio/IDontGiveAFuckKit/vocal4.wav',
    ];
    
    var XyloKit = [
        'assets/audio/XyloKit/kick.wav',
        'assets/audio/XyloKit/snare.wav',
        'assets/audio/XyloKit/hihat.wav',
        'assets/audio/XyloKit/loop1.wav',
        'assets/audio/XyloKit/loop2.wav',
        'assets/audio/XyloKit/loop3.wav',
        'assets/audio/XyloKit/loop4.wav',
        'assets/audio/XyloKit/loop5.wav',
        'assets/audio/XyloKit/GunReload.wav',
        'assets/audio/XyloKit/GunShot.wav',
        'assets/audio/XyloKit/what.wav',
        'assets/audio/XyloKit/aye.wav',
    ];
    
    var TrapKit = [
        'assets/audio/TrapKit/kick1.wav',
        'assets/audio/TrapKit/kick2.wav',
        'assets/audio/TrapKit/clap1.wav',
        'assets/audio/TrapKit/clap2.wav',
        'assets/audio/TrapKit/kick3.wav',
        'assets/audio/TrapKit/kick4.wav',
        'assets/audio/TrapKit/snare1.wav',
        'assets/audio/TrapKit/snare2.wav',
        'assets/audio/TrapKit/FX1.wav',
        'assets/audio/TrapKit/crash.wav',
        'assets/audio/TrapKit/hi1.wav',
        'assets/audio/TrapKit/hi2.wav',
    ];
    
    var kits = [
        IDontGiveAFuckKit,
        grooveKit,
        grooveKit2,
        XyloKit,
        TrapKit
    ];
    
    var audioApp = new AudioApp(testKit, pads, loopBtn, kits);
    
    audioApp.init();
    console.log(audioApp);
    
    var recorder = new Recorder(audioApp.SPcomp); // Recorder construct
    
    var recordButton = document.querySelector('#recordButton');
    var stopButton = document.querySelector('#stopButton');
    
    recordButton.onclick = function() {
        console.log('rec button');
        
        recorder.record();
    };
    
    function doneEncoding(blob) {
        Recorder.forceDownload(blob, "myloop.wav");  
    }
    
    stopButton.onclick = function() {
        console.log('stop button');
        
        recorder.stop();
        recorder.getBuffer();
        recorder.exportWAV(doneEncoding());
//        Recorder.forceDownload(blob);
    };
}