$(document).ready(() => {
    console.log('Click', this);
    let blob = new Blob(['gif.worker.js'], {
        type: 'application/javascript'
    });
    const apikey = 'AHXrgLqSVSeiRxoQo9crnz';
    // var gif = new GIF({
    //     debug: true,
    //     quality: 10,
    //     workers: 2,
    //     width: 500,
    //     height: 500,
    //     workerScript: URL.createObjectURL(blob)
    // });
    // window['gif'] = gif;
    // console.log(gif);
    let imageArray = [];
    for (let i = 1; i <= 6; i++) {
        html2canvas($('#pag' + i), {
            onrendered: function (canvas) {
                // canvas is the final rendered <canvas> element
                //img = canvas.toDataURL('image/png');
                var extra_canvas = document.createElement("canvas");
                extra_canvas.setAttribute('width', 350);
                extra_canvas.setAttribute('height', 250);
                var ctx = extra_canvas.getContext('2d');
                ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 350, 250);
                let img = extra_canvas.toDataURL();
                imageArray[i - 1] = img;
                $('#ImageShow').append('<img class="img2" src="' + img + '"/>');
            },
        });
    }
    $('#capture').click(() => {
        if (navigator.getUserMedia)
            console.log('User media');
        //imageArray = $('#ImageShow')[0].children;
        //for (let img of imageArray)
        console.log(imageArray);
        createGif(imageArray);
        // console.log('Image Array: ', imageArray);
        // console.log('asdasdasd', imageArray.length);

        // startTime = null;
        // gif.on('start', function () {
        //     console.log('started');
        //     for (let image of imageArray) {
        //         // image = imageArray[j];
        //         console.log('Image: 123', image);
        //         gif.addFrame(image, {
        //             delay: 500,
        //             copy: true
        //         });
        //     }
        // });
        // gif.on('progress', function (p) {
        //     console.log('progressing', gif, p);
        // });
        // gif.on('finished', function () {
        //     console.log('finished');
        // });
        // gif.render();
        // gifshot.createGIF({
        //     'webcamVideoElement': null,            
        //     'cameraStream': null,
        //     'keepCameraOn': false,
        //     'images': imageArray,
        // }, function (obj) {
        //     if(!obj.error){
        //         let gifImage = obj.image;
        //         $('#ImageShow').append('<img alt="gif image" id="gif" src="' + gifImage + '"');
        //     }
        //     else{
        //         console.log('Error is: ', obj);
        //     }
        // })
        //     // $('body').html2canvas();
        //     let html2obj = html2canvas($('#pag1'));
        //     var queue = html2obj.parse();
        //     var canvas = html2obj.render(queue);
        //     var img = canvas.toDataURL();
        //     //window.open(img);
        //     let str = '<img id="img1" src="' + img + '"/>';
        //     console.log('Change');
        //     $('#ImageShow').append(str);
        //     let html3obj = html2canvas($('#pag2'));
        //     var queue1 = html3obj.parse();
        //     var canvas1 = html3obj.render(queue1);
        //     var img1 = canvas1.toDataURL();
        //     //window.open(img);
        //     let str2 = '<img id="img2" src="' + img1 + '"/>';
        //     console.log('Change');
        //     $('#ImageShow').append(str2);
    });
    function createGif(imageArray) {
        //console.log('Function....', imageArray);
        const client = filestack.init(apikey);
        gifshot.createGIF({
            gifWidth: 200,
            gifHeight: 200,
            images: imageArray,
            interval: 1,
            numFrames: 5,
            frameDuration: 1,
            fontWeight: 'normal',
            fontSize: '16px',
            fontFamily: 'sans-serif',
            fontColor: '#ffffff',
            textAlign: 'center',
            textBaseline: 'bottom',
            sampleInterval: 10,
            numWorkers: 2
        }, function (obj) {
            if (!obj.error) {
                console.log(obj);
                let image = obj.image;
                //console.log(image);
                $('#ImageShow1').html(`<img src=${obj.image}>`);
                client.upload(obj.image)
                    .then(res => console.log('Response is: ', res))
                    .catch(err => console.log('Error is: ', err))
                //     animatedImage = document.getElementById('animatedGIF');
                // animatedImage.src = image;
            }
            else {
                console.log('error: ', obj);
            }
        })
    }
})