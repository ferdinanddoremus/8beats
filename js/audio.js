function AudioApp(sampleList, tabs, loopBtn, kits) {
    'use strict';
    this.sampleList = sampleList;
    this.context;
    this.threePads = tabs;
    this.lastPadPressed = 0;
    this.padConf = [
        {
            url: null,
            name: 'pad1',
            isPlaying: false,
            isLooped: false,
            isGated: false,
            buffer: null,
            source: null
        },
        {
            url: null,
            name: 'pad2',
            isPlaying: false,
            isLooped: false,
            isGated: false,
            buffer: null,
            source: null
        },
        this.pad3 = {
            url: null,
            name: 'pad3',
            isPlaying: false,
            isLooped: false,
            isGated: false,
            buffer: null,
            source: null
        },
        {
            url: null,
            name: 'pad4',
            isPlaying: false,
            isLooped: false,
            isGated: false,
            buffer: null,
            source: null
        },
        {
            url: null,
            name: 'pad5',
            isPlaying: false,
            isLooped: false,
            isGated: false,
            buffer: null,
            source: null
        },
        {
            url: null,
            name: 'pad6',
            isPlaying: false,
            isLooped: false,
            isGated: false,
            buffer: null,
            source: null
        },
        {
            url: null,
            name: 'pad7',
            isPlaying: false,
            isLooped: false,
            isGated: false,
            buffer: null,
            source: null
        },
        {
            url: null,
            name: 'pad8',
            isPlaying: false,
            isLooped: false,
            isGated: false,
            buffer: null,
            source: null
        },
        {
            url: null,
            name: 'pad9',
            isPlaying: false,
            isLooped: false,
            isGated: false,
            buffer: null,
            source: null
        },
        {
            url: null,
            name: 'pad10',
            isPlaying: false,
            isLooped: false,
            isGated: false,
            buffer: null,
            source: null
        },
        {
            url: null,
            name: 'pad11',
            isPlaying: false,
            isLooped: false,
            isGated: false,
            buffer: null,
            source: null
        },
        {
            url: null,
            name: 'pad12',
            isPlaying: false,
            isLooped: false,
            isGated: false,
            buffer: null,
            source: null
        }
    ]
    this.loopBtn = loopBtn;
    this.kits = kits;
    this.selectCount = 0;
    this.selectedKit = null;
    this.demo = document.getElementById('demo');
    this.examples = document.getElementsByClassName('examples');
    this.SPcomp;
}

// Audio initialization function ------------------------------ /
AudioApp.prototype.init = function () {
    'use strict';
    console.log('In AudioApp.init()');
    
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new window.AudioContext();
    this.selectedKit = this.kits[this.selectCount];
    
    this.startLoadingSample(this.sampleList);
    console.log(this.kits);
    console.log(this.selectedKit);
    
    console.log(this.examples);
    
    this.demo.addEventListener('click', this.playExample.bind(this), false);
    
    this.SPcomp = this.context.createDynamicsCompressor();
    
    this.SPcomp.threshold.value = -50;
    this.SPcomp.knee.value = 40;
    this.SPcomp.ratio.value = 12;
    this.SPcomp.reduction.value = -20;
    this.SPcomp.attack.value = 0;
    this.SPcomp.release.value = 0.25;
    
    this.SPcomp.connect(this.context.destination);
};

// Load selected samples in SP ------------------------------ /
AudioApp.prototype.startLoadingSample = function(sampleList) {
    'use strict';
    
    var app = this,
        sampleList = app.selectedKit,
        bufferList = app.bufferList,
        padConf = app.padConf,
        sample1Request,
        sample2Request,
        sample3Request,
        sample4Request,
        sample5Request,
        sample6Request,
        sample7Request,
        sample8Request,
        sample9Request,
        sample10Request,
        sample11Request,
        sample12Request,
        i;
    
    sample1Request = new XMLHttpRequest();
	sample1Request.open("GET", sampleList[0], true);
	sample1Request.responseType = "arraybuffer";
	sample1Request.onload = function() {
        app.context.decodeAudioData( sample1Request.response, function(buffer) { 
            padConf[0].buffer = buffer;
		} );
	}
	sample1Request.send();
    
    sample2Request = new XMLHttpRequest();
	sample2Request.open("GET", sampleList[1], true);
	sample2Request.responseType = "arraybuffer";
	sample2Request.onload = function() {
        app.context.decodeAudioData( sample2Request.response, function(buffer) { 
            padConf[1].buffer = buffer;
		} );
	}
	sample2Request.send();
    
    sample3Request = new XMLHttpRequest();
	sample3Request.open("GET", sampleList[2], true);
	sample3Request.responseType = "arraybuffer";
	sample3Request.onload = function() {
        app.context.decodeAudioData( sample3Request.response, function(buffer) { 
            padConf[2].buffer = buffer;
		} );
	}
	sample3Request.send();
    
    sample4Request = new XMLHttpRequest();
	sample4Request.open("GET", sampleList[3], true);
	sample4Request.responseType = "arraybuffer";
	sample4Request.onload = function() {
        app.context.decodeAudioData( sample4Request.response, function(buffer) { 
            padConf[3].buffer = buffer;
		} );
	}
	sample4Request.send();
    
    sample5Request = new XMLHttpRequest();
	sample5Request.open("GET", sampleList[4], true);
	sample5Request.responseType = "arraybuffer";
	sample5Request.onload = function() {
        app.context.decodeAudioData( sample5Request.response, function(buffer) { 
            padConf[4].buffer = buffer;
		} );
	}
	sample5Request.send();
    
    sample6Request = new XMLHttpRequest();
	sample6Request.open("GET", sampleList[5], true);
	sample6Request.responseType = "arraybuffer";
	sample6Request.onload = function() {
        app.context.decodeAudioData( sample6Request.response, function(buffer) { 
            padConf[5].buffer = buffer;
		} );
	}
	sample6Request.send();
    
    sample7Request = new XMLHttpRequest();
	sample7Request.open("GET", sampleList[6], true);
	sample7Request.responseType = "arraybuffer";
	sample7Request.onload = function() {
        app.context.decodeAudioData( sample7Request.response, function(buffer) { 
            padConf[6].buffer = buffer;
		} );
	}
	sample7Request.send();
    
    sample8Request = new XMLHttpRequest();
	sample8Request.open("GET", sampleList[7], true);
	sample8Request.responseType = "arraybuffer";
	sample8Request.onload = function() {
        app.context.decodeAudioData( sample8Request.response, function(buffer) { 
            padConf[7].buffer = buffer;
		} );
	}
	sample8Request.send();
    
    sample9Request = new XMLHttpRequest();
	sample9Request.open("GET", sampleList[8], true);
	sample9Request.responseType = "arraybuffer";
	sample9Request.onload = function() {
        app.context.decodeAudioData( sample9Request.response, function(buffer) { 
            padConf[8].buffer = buffer;
		} );
	}
	sample9Request.send();
    
    sample10Request = new XMLHttpRequest();
	sample10Request.open("GET", sampleList[9], true);
	sample10Request.responseType = "arraybuffer";
	sample10Request.onload = function() {
        app.context.decodeAudioData( sample10Request.response, function(buffer) { 
            padConf[9].buffer = buffer;
		} );
	}
	sample10Request.send();
    
    sample11Request = new XMLHttpRequest();
	sample11Request.open("GET", sampleList[10], true);
	sample11Request.responseType = "arraybuffer";
	sample11Request.onload = function() {
        app.context.decodeAudioData( sample11Request.response, function(buffer) { 
            padConf[10].buffer = buffer;
		} );
	}
	sample11Request.send();
    
    sample12Request = new XMLHttpRequest();
	sample12Request.open("GET", sampleList[11], true);
	sample12Request.responseType = "arraybuffer";
	sample12Request.onload = function() {
        app.context.decodeAudioData( sample12Request.response, function(buffer) { 
            padConf[11].buffer = buffer;
		} );
	}
	sample12Request.send();
    
    console.log('finished loading sample');
    console.log(this.padConf);
}

// Play function ------------------------------------------- /
AudioApp.prototype.playSound = function(pad) {
//    console.log('Last pad = ');
    console.log(this.lastPadPressed);
    
    var app = this,
        padPlayed = app.padConf[pad];
    
    // Checking if loop or not to set color on loopBtn
    if (padPlayed.isLooped === true) {
        this.loopBtn.material.color = new THREE.Color("rgb(255,0,0)");
    } else if (padPlayed.isLooped === false) {
        this.loopBtn.material.color = new THREE.Color("#dfdfdf");
    }
    
    if (padPlayed.isPlaying === false) {
        if (padPlayed.source) {
            padPlayed.source.stop(0);
            
            padPlayed.isPlaying = padPlayed.isLooped;
            padPlayed.source = this.context.createBufferSource();
            padPlayed.source.buffer = padPlayed.buffer;
            padPlayed.source.loop = padPlayed.isLooped;
            padPlayed.source.connect(this.SPcomp);
            padPlayed.source.start(0);
        } else {
            padPlayed.isPlaying = padPlayed.isLooped;
            padPlayed.source = this.context.createBufferSource();
            padPlayed.source.buffer = padPlayed.buffer;
            padPlayed.source.loop = padPlayed.isLooped;
            padPlayed.source.connect(this.SPcomp);
            padPlayed.source.start(0);
        }
    } else if (padPlayed.isPlaying === true) {
        padPlayed.source.stop(0);
        padPlayed.isPlaying = false;
    }
}

// Activate loop on selected pad ---------------------------- /
AudioApp.prototype.loopToggle = function() {
    console.log('loopToggle()');
    
    if (this.lastPadPressed.isLooped === false) {
        this.lastPadPressed.isLooped = true;
        if (this.lastPadPressed.source) {
            this.lastPadPressed.source.loop = true;
        }
    } else {
        this.lastPadPressed.isLooped = false;
        this.lastPadPressed.isPlaying = false;
        this.lastPadPressed.source.loop = false;
    }
    
    console.log(this.padConf);
}


// Play or stop the example kit ------------------------------ /
AudioApp.prototype.playExample = function() {
    'use strict';
    console.log(this.kits[this.selectCount]);
    
    if (this.examples[this.selectCount].currentTime === 0) {
        this.examples[this.selectCount].play();
    } else {
        this.examples[this.selectCount].pause();
        this.examples[this.selectCount].currentTime = 0;
    }
}

