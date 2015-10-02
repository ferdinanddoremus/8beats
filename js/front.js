//function displayConfigPanel() {
//    'use strict';
//    
//    var configPanel = document.getElementById('configuration'),
//        canvas = document.querySelector('canvas');
//    
//    configPanel.classList.toggle('decalRight');
//    userInterface.classList.toggle('blured');
//    canvas.classList.toggle('blured');
//}

//function swipe(evt) {
//    'use strict';
//    var sets = document.querySelectorAll('.sets'),
//        i,
//        rightStyle,
//        rightNumbered,
//        source = evt.target || evt.srcElement;
//    
//    if (source.id === "right") {
//        audioApp.selectCount += 1;
//        audioApp.selectedKit = audioApp.kit[audioApp.selectCount];
//        console.log(audioApp.selectedKit);
//        if (sets[0].style.right === ((sets.length - 1)*100) + "%") {
//            console.log('no more kit');
//        } else {
//            for (i = 0; i < sets.length; i += 1) {
//                rightStyle = sets[i].style.right;
//                rightNumbered = Number(rightStyle.substring(0, (rightStyle.length-1)));
//
//                sets[i].style.right = rightNumbered + 100 + "%";
//            }
//        }
//    }
//    if (source.id === "left") {
//        if (sets[sets.length - 1].style.right === (-(sets.length - 1)*100) + "%") {
//            console.log('no more kit');
//        } else {
//            for (i = 0; i < sets.length; i += 1) {
//                rightStyle = sets[i].style.right;
//                rightNumbered = Number(rightStyle.substring(0, (rightStyle.length-1)));
//
//                sets[i].style.right = rightNumbered - 100 + "%";
//            }
//        }
//    }
//}

function launchCssTyping() {
    'use strict';
    
    var h2 = document.querySelector('#description h2'),
        h3 = document.querySelector('#description h3'),
        loader = document.querySelector('#description h3.margin'),
        leP = document.querySelector('#descriptLines'),
        i,
        j,
        text,
        timeoutCount,
        str1 = "ROLAND SP-404 STATUS [OK]",
        str2 = "PORTABLE POWER-SAMPLER WITH FX",
        loaderStr = "////////////////////////////////////////100%",
        strP = [
            "12 large pads, three control knobs, jumbo display" + "<br />" + "29 effects, including new Subsonic, BPM Looper...",
            "Built-in microphone for quick sampling",
            "CD-quality sound",
            "Expanded sampling time",
            "12-voice polyphony",
            "Realtime loop recording",
            "Sample-editing tools",
            "Import/export WAV/AIF",
            "Runs on battery or AC power"
        ],
        lesP = document.querySelectorAll('#description p');
    
    
    function setDelay(field, str, index, speed) {
        window.setTimeout(function() {
            field.innerHTML += str[index];
        }, speed * index);
    }
    
    for (i = 0; i < str1.length; i += 1) {
        setDelay(h2, str1, i, 30);
    }
    
    window.setTimeout(function() {
        for (i = 0; i < str2.length; i += 1) {
            setDelay(h3, str2, i, 30);
        }
    }, 30*str1.length);
    
    window.setTimeout(function() {
        for (i = 0; i < loaderStr.length; i += 1) {
            setDelay(loader, loaderStr, i, 40);
        }
    }, 30*str1.length + 30*str2.length);
    
    
    window.setTimeout(function() {
        for (i = 0; i < strP.length; i += 1) {

            setDelay(lesP[i], strP, i, 20);
        }
    }, 30*str1.length + 30*str2.length + 40*loaderStr.length);
}