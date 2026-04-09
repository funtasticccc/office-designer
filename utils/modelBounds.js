const fs = require("fs");
const { NodeIO } = require("@gltf-transform/core");
const { bounds } = require("@gltf-transform/functions");

/**
 * Reads a .glb file's binary header and extracts the bounding box
 * from VEC3 accessors without loading the full scene graph.
 *
 * @param {string} filePath - Path to the .glb file
 * @returns {{ min: number[], max: number[], height: number } | { error: string }}
 */
function readGlbBounds(filePath) {
  const buf = fs.readFileSync(filePath);
  const jsonLen = buf.readUInt32LE(12);
  const jsonBuf = buf.subarray(20, 20 + jsonLen);
  const jsonObj = JSON.parse(jsonBuf.toString("utf8"));

  let min = [Infinity, Infinity, Infinity];
  let max = [-Infinity, -Infinity, -Infinity];

  if (!jsonObj.accessors) return { error: "No accessors" };

  for (const acc of jsonObj.accessors) {
    if (acc.min && acc.max && acc.type === "VEC3") {
      min[0] = Math.min(min[0], acc.min[0]);
      min[1] = Math.min(min[1], acc.min[1]);
      min[2] = Math.min(min[2], acc.min[2]);
      max[0] = Math.max(max[0], acc.max[0]);
      max[1] = Math.max(max[1], acc.max[1]);
      max[2] = Math.max(max[2], acc.max[2]);
    }
  }

  return { min, max, height: max[1] - min[1] };
}

/**
 * Uses @gltf-transform to compute accurate scene bounds (minY / maxY)
 * for a .glb file, respecting node transforms.
 *
 * @param {string} filePath - Path to the .glb file
 * @returns {Promise<{ min: number[], max: number[] } | null>}
 */
async function getGltfBounds(filePath) {
  const io = new NodeIO();
  const document = await io.read(filePath);
  const scene = document.getRoot().getDefaultScene();

  if (!scene) return null;

  const box = bounds(scene);
  return { min: box.min, max: box.max };
}

/**
 * Prints readGlbBounds results for a list of .glb file paths.
 *
 * @param {string[]} filePaths
 */
function printGlbBounds(filePaths) {
  for (const p of filePaths) {
    console.log(p, readGlbBounds(p));
  }
}

/**
 * Prints getGltfBounds results (minY / maxY) for a list of .glb file paths.
 *
 * @param {string[]} filePaths
 */
async function printGltfBounds(filePaths) {
  for (const p of filePaths) {
    const box = await getGltfBounds(p);
    if (box) {
      console.log(`${p}:`);
      console.log(`  minY: ${box.min[1]}`);
      console.log(`  maxY: ${box.max[1]}`);
    }
  }
}

/**
 * Reads a .glb file and returns its nodes and per-mesh POSITION accessor bounds.
 *
 * @param {string} filePath - Path to the .glb file
 * @returns {{ nodes: object[], meshMins: number[][], meshMaxs: number[][] } | { error: string }}
 */
function readGlbNodes(filePath) {
  const buf = fs.readFileSync(filePath);
  const jsonLen = buf.readUInt32LE(12);
  const jsonBuf = buf.subarray(20, 20 + jsonLen);
  const jsonObj = JSON.parse(jsonBuf.toString("utf8"));

  if (!jsonObj.accessors) return { error: "No accessors" };

  const meshMins = [];
  const meshMaxs = [];

  if (jsonObj.meshes) {
    for (const mesh of jsonObj.meshes) {
      if (mesh.primitives) {
        for (const prim of mesh.primitives) {
          if (prim.attributes.POSITION !== undefined) {
            const acc = jsonObj.accessors[prim.attributes.POSITION];
            meshMins.push(acc.min);
            meshMaxs.push(acc.max);
          }
        }
      }
    }
  }

  return { nodes: jsonObj.nodes || [], meshMins, meshMaxs };
}

module.exports = { readGlbBounds, getGltfBounds, printGlbBounds, printGltfBounds, readGlbNodes };
