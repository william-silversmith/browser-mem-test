// (function growMemory() {
//     let req = new XMLHttpRequest();
//     req.responseType = 'arraybuffer';

//     req.open("GET", "https://storage.googleapis.com/overview_meshes_dev/test/gz9-153546.segmentation.gz");

//     req.onload = () => {
//         console.log('got gz', req.response.byteLength);

//         // window.what = req.response;
//         // req.response = null;

//         // growMemory();
//     };

//     req.send();
// })();

// setInterval(() => {
//     console.log(window.performance.memory.usedJSHeapSize);
// }, 100);


let req = new XMLHttpRequest();
req.responseType = 'arraybuffer';

req.open("GET", "./sege2198.lzma");

let myLZMA = new LZMA('./lzma_worker.js');

req.onload = () => {
    let start = Date.now();
    // var decompressed = LZMA.decompress(new Uint8Array(req.response));

    // console.log('size', decompressed.byteLength);


    console.log('got lzma', req.response.byteLength);

    myLZMA.decompress(req.response, function on_decompress_complete(result) {
        console.log('got result!', result.byteLength / (1024 * 1024));
        var cube = new Uint16Array(result);
        // fulfillZz();
        console.log('time', Date.now() - start);
    }, (bytesProcessed) => {
        // console.log('got something');
        // let percent = bytesProcessed / (1024 * 1024 * 256 * 2);
        // console.log(percent);

        // cube.progress = 0.5 + percent / 2;
        
        // progressfn(this.loadingProgress());
    });

    req.response = null;

    // growMemory();
};

req.send();

// let myLZMA = new LZMA('./lzma_worker.js');





// var print = console.log;


// // js -m -n -e "load('lzma-full.js')" test-full.js

// function assertEq(a, b) {
//   if (a !== b) {
//     throw 'Should have been equal: ' + a + ' : ' + b;
//   }
//   return false;
// }

// function assertNeq(a, b) {
//   try {
//     assertEq(a, b);
//   } catch(e) {
//     return;
//   }
//   throw 'Should have not been equal: ' + a + ' : ' + b;
// }

// function byteCompare(a, b) {
//   assertEq(a.length, b.length);
//   for (var i = 0; i < a.length; i++) {
//     assertEq(a[i]&255, b[i]&255);
//   }
// }

// function testSimple() {
//   print('testing simple..');
//   var data = [100, 200, 200, 200, 200, 200, 200, 100, 100, 200, 200, 200, 200, 0, 1];
//   var compressed = LZMA.compress(data);
//   var decompressed = LZMA.decompress(compressed);

//   console.log('decompressed', decompressed);

//   byteCompare(data, decompressed);
//   assertNeq(data.length, compressed.length);
// }

// testSimple();

