var canvas,ctx,video,videoStream,mediaRecorder,chunks;

function setup_recorder() {
     canvas = document.querySelector("canvas");
     ctx = canvas.getContext("2d");

     video = document.querySelector("video");

     videoStream = canvas.captureStream(30);
     mediaRecorder = new MediaRecorder(videoStream);

    chunks = [];
    mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
    };

    mediaRecorder.onstop = function (e) {
        var blob = new Blob(chunks, {
            'type': 'video/mp4'
        });
        chunks = [];
        var videoURL = URL.createObjectURL(blob);
        video.src = videoURL;
    };
    
    mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
    };

}

function start_recording() {
    mediaRecorder.start();
}

function stop_recording() {
    mediaRecorder.stop();
}