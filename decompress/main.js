

var uncompressed = null;

{
    let req = new XMLHttpRequest();
    req.responseType = 'arraybuffer';
    req.open("GET", "./d9e-153546.segmentation.lzma");
    req.onload = () => {
        console.log('got lzma', req.response.byteLength);
        uncompressed = req.response;
    };
    req.send();
}

let myLZMA = new LZMA('./lzma_worker.js');

let res = [1024, 1024, 256];

var cube = new Uint16Array(res[0] * res[1] * res[2]);

window.lookup = (x, y, z) => {
    return cube[x + res[0] * (y + res[1] * z)];
}



var stopped = false;

var count = 0;

window.go = (once) => {
    stopped = false;

    let start = Date.now();

    myLZMA.decompress(uncompressed, cube, function on_decompress_complete(result, orig) {
        uncompressed = orig;
        cube = new Uint16Array(result);
        console.log('time', Date.now() - start, count++);

        if (!once && !stopped) {
            go();
        }
    }, (bytesProcessed) => {
    });
}

stop = () => {
    stopped = true;
}



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

// function test5() {
//     var start1 = Date.now();
//     var compressed = LZIP.compress(new Uint8Array(cube.buffer));
//     console.log('time', Date.now() - start1);
//     console.log(compressed);

//     var start2 = Date.now();
//     window.decompressed = LZIP.decompress(compressed);

//     console.log('time', Date.now() - start2);

// }

// function testSimple() {
// //   var data = [100, 200, 200, 200, 200, 200, 200, 100, 100, 200, 200, 200, 200, 0, 1];
// //   var compressed = LZMA.compress(data);
//   var decompressed = LZMA.decompress(compressed);

//   console.log('decompressed', decompressed);

//   byteCompare(data, decompressed);
//   assertNeq(data.length, compressed.length);
// }

// testSimple();

