// C Implementation of marching cubes, used to generate meshes on the client using segmentation data
// based on http://paulbourke.net/geometry/polygonise/
// optimized for binary volumes

// compiled to asm.js using emscripten. marching_cubes_worker.js is the interface to the ASM.js code
// emcc -O1 marching_cubes.cpp -o ../marching_cubes_worker.js/marching_cubes.js -s EXPORTED_FUNCTIONS="['_marching_cubes_wireframe']" -s TOTAL_MEMORY=67108864

#include <math.h>
#include <stdint.h>
#include <stdio.h>

extern "C" {

	int identity(int a) {
		return a;
	}


static const int X_DIM = 256;
static const int Y_DIM = 256;
static const int Z_DIM = 256;

static const int X_OFF = 1;
static const int Y_OFF = X_DIM;
static const int Z_OFF = X_DIM * Y_DIM;

static const int TOTAL_VOXELS = X_DIM * Y_DIM * Z_DIM;


static uint8_t wf_counts[TOTAL_VOXELS];

void marching_cubes_wireframe() {	
	int x, y, z;
	
	int startX = 10;
	int endX = identity(200);
	int startY = 10;
	int endY = 200;
	int startZ = 10;
	int endZ = 200;

	// endX = 200;

	// endX = identity(200);//imin(200, 200);

	printf("test %d %d %d / %d %d %d\n", startX, startY, startZ, endX, endY, endZ);

	int X_WIN_SIZE = endX - startX + 1;
	int Y_WIN_SIZE = endY - startY + 1;

	int i = endX + endY * X_DIM + endZ * X_DIM * Y_DIM;

	// printf("loop1 start %d %d %d end %d %d %d\n", startX, startY, startZ, endX, endY, endZ);

	for (z = endZ; z >= startZ; --z) {
		for (y = endY; y >= startY; --y) {
			for (x = endX; x >= startX; --x) {
				wf_counts[i] |= 1;
			}
		}
	}

	// clear out the border
	int si = startZ - 1;
	for (z = si; z <= si; ++z) {
		for (y = startY - 1; y <= endY; ++y) {
			for (x = startX - 1; x <= endX; ++x) {
				++i;
			}
		}
	}

	// z = 0;
	// y = 0;
	// x = 0;
	// i = 0;

	si = endZ;
	i = (startX - 1) + (startY - 1) * X_DIM + si * X_DIM * Y_DIM;
	for (z = si; z <= si; ++z) {
		for (y = startY - 1; y <= endY; ++y) {
			for (x = startX - 1; x <= endX; ++x) {
				wf_counts[i] = 0;
				++i;
			}
			i = i - (X_WIN_SIZE + 1) + Y_OFF;
		}
		i = i - (Y_WIN_SIZE + 1) * Y_OFF + Z_OFF;
	}

	return;
}

}