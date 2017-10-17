$(document).ready(() => {
    const apikey = 'api key';
    let imageArray = [];
    for (let i = 1; i <= 6; i++) {
        html2canvas($('#pag' + i), {
            onrendered: function (canvas) {
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
        createGif(imageArray);
    });
    function createGif(imageArray) {
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
                let image = obj.image;
                $('#ImageShow1').html(`<img src=${obj.image}>`);
                client.upload(obj.image)
                    .then(res => alert(res.url))
                    .catch(err => console.log('Error is: ', err));
            }
            else {
                console.log('error: ', obj);
            }
        })
    }
})
