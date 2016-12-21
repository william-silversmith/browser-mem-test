//! © 2015 Nathan Rugg <nmrugg@gmail.com> | MIT
/// See LICENSE for more details.

// jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, nonew:true, onevar:true, plusplus:true, quotmark:double, undef:true, unused:strict, browser: true, node: true

/// Let's use Web Workers.
///NOTE: The "this" keyword is the global context ("window" variable) if loaded via a <script> tag
///      or the function context if loaded as a module (e.g., in Node.js).
var LZMA = function (lzma_path) {
    var action_compress   = 1,
        action_decompress = 2,
        action_progress   = 3,
        
        callback_obj = {},
        
        ///NOTE: Node.js needs something like "./" or "../" at the beginning.
        lzma_worker = new Worker(lzma_path || "./lzma_worker-min.js");
    
    lzma_worker.onmessage = function onmessage(e) {
        if (e.data.action === action_progress) {
            if (callback_obj[e.data.cbn] && typeof callback_obj[e.data.cbn].on_progress === "function") {
                callback_obj[e.data.cbn].on_progress(e.data.result);
            }
        } else {
            if (callback_obj[e.data.cbn] && typeof callback_obj[e.data.cbn].on_finish === "function") {
                callback_obj[e.data.cbn].on_finish(e.data.result, e.data.orig, e.data.error);
                
                /// Since the (de)compression is complete, the callbacks are no longer needed.
                delete callback_obj[e.data.cbn];
            }
        }
    };
    
    /// Very simple error handling.
    lzma_worker.onerror = function(event) {
        var err = new Error(event.message + " (" + event.filename + ":" + event.lineno + ")");
        
        for (var cbn in callback_obj) {
            callback_obj[cbn].on_finish(null, err);
        }
        
        console.error('Uncaught error in lzma_worker', err);
    };
    
    return (function () {
        
        function send_to_worker(action, data, cube, mode, on_finish, on_progress) {

            var write_arr = cube.buffer;

            var cbn;
            
            do {
                cbn = Math.floor(Math.random() * (10000000));
            } while(typeof callback_obj[cbn] !== "undefined");
            
            callback_obj[cbn] = {
                on_finish:   on_finish,
                on_progress: on_progress
            };
            
            lzma_worker.postMessage({
                action: action, /// action_compress = 1, action_decompress = 2, action_progress = 3
                cbn:    cbn,    /// callback number
                data:   data,
                write_arr: write_arr,
                mode:   mode
            }, [data, write_arr]);
        }
        
        return {
            // compress: function compress(mixed, mode, on_finish, on_progress) {
            //     send_to_worker(action_compress, mixed, mode, on_finish, on_progress);
            // },
            decompress: function decompress(byte_arr, cube, on_finish, on_progress) {
                send_to_worker(action_decompress, byte_arr, cube, false, on_finish, on_progress);
            },
            worker: function worker() {
                return lzma_worker;
            }
        };
    }());
}