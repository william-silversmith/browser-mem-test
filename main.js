console.log('hi');

// fetch()

function growMemory()
{

    let test = new XMLHttpRequest();
    test.responseType = 'arraybuffer';

    test.open("GET", "https://storage.googleapis.com/overview_meshes/test/154078.segmentation.gz");

    test.onload = () => {
        console.log('got gz');

        console.log(test.response.byteLength);
        test.response = null;

        // let myLZMA = new LZMA('./lzma_worker.js');

        // LZMA.decompress(test.response, (res) => {
        //     console.log('finished decompressing!');
        //     window.test = res;
        // });
    };

    test.send();
}
