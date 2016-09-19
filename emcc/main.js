// uses marching_cubes.cpp, already compiled to marching_cubes.js (ASM.js)

var marchingCubesWireframe = Module.cwrap(
  'marching_cubes_wireframe', 'number', []
);

var structPtr = marchingCubesWireframe();
