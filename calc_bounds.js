const { NodeIO } = require('@gltf-transform/core');
const { bounds } = require('@gltf-transform/functions');
const fs = require('fs');
const path = require('path');

async function getBounds(file) {
  const io = new NodeIO();
  const document = await io.read(file);
  const scene = document.getRoot().getDefaultScene();
  
  if (scene) {
    const box = bounds(scene);
    console.log(`${file}:`);
    console.log(`  minY: ${box.min[1]}`);
    console.log(`  maxY: ${box.max[1]}`);
  }
}

async function main() {
  await getBounds('public/gbl/desks/desk1.glb');
  await getBounds('public/gbl/desks/desk2.glb');
  await getBounds('public/gbl/desks/desk3.glb');
}

main().catch(console.error);
