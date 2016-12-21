browser-mem-test
================

Contains two test frameworks:
- LZMA performance tuning
- Marching Cubes (relies on LZMA)  

Segmentation Files
------------------

d9e-153546.segmentation.lzma -- 1024 x 1024 x 256 segmentation
sege2198.lzma -- 256 x 256 x 256 segmentation


LZMA
----

Run: `python -m SimpleHTTPServer` in the current directory


Marching Cubes
--------------

You'll need emcc, the C to ASM Javascript compiler.