const fs = require('fs');

function analyzeGlb(path) {
  const buf = fs.readFileSync(path);
  const jsonLen = buf.readUInt32LE(12);
  const jsonBuf = buf.subarray(20, 20 + jsonLen);
  const jsonObj = JSON.parse(jsonBuf.toString('utf8'));
  
  if (!jsonObj.accessors) return { error: 'No accessors' };
  
  // Find which accessor is used by which node to compute actual world min/max
  // For simplicity, just print out the nodes:
  console.log('Nodes:', jsonObj.nodes);
  
  let meshMins = [];
  let meshMaxs = [];
  
  if (jsonObj.meshes) {
    for (let mesh of jsonObj.meshes) {
      if (mesh.primitives) {
        for (let prim of mesh.primitives) {
          if (prim.attributes.POSITION !== undefined) {
             let acc = jsonObj.accessors[prim.attributes.POSITION];
             meshMins.push(acc.min);
             meshMaxs.push(acc.max);
          }
        }
      }
    }
  }
  
  console.log('Mesh Mins:', meshMins);
  console.log('Mesh Maxs:', meshMaxs);
}

console.log('--- DESK 2 ---');
analyzeGlb('./public/gbl/desks/desk2.glb');
console.log('--- DESK 3 ---');
analyzeGlb('./public/gbl/desks/desk3.glb');
