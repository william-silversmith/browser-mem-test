(function growMemory() {
    let req = new XMLHttpRequest();
    req.responseType = 'arraybuffer';

    req.open("GET", "https://storage.googleapis.com/overview_meshes/test/154078.segmentation.gz");

    req.onload = () => {
        console.log('got gz', req.response.byteLength);
        req.response = null;

        growMemory();
    };

    req.send();
})();
