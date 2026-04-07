const fs = require('fs');

function readGlb(path) {
  const buf = fs.readFileSync(path);
  const jsonLen = buf.readUInt32LE(12);
  const jsonBuf = buf.subarray(20, 20 + jsonLen);
  const jsonObj = JSON.parse(jsonBuf.toString('utf8'));
  let min = [Infinity, Infinity, Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  
  if (!jsonObj.accessors) return { error: 'No accessors' };
  
  for (let acc of jsonObj.accessors) {
    if (acc.min && acc.max && acc.type === 'VEC3') {
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

console.log('ergonomic-chair', readGlb('./public/gbl/ergonomic-chair.glb'));
console.log('premium-chair', readGlb('./public/gbl/premium-chair.glb'));
