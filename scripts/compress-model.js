<<<<<<< HEAD
const compress = require('@gltf-transform/cli').compress

async function compressModel() {
  await compress('public/models/original.glb', 'public/models/compressed.glb', {
    textureCompress: 'webp',
    textureResize: [1024, 1024],
    meshopt: true,
    meshQuantize: true,
    meshSimplify: 0.8 // Reduces geometry by 20%
  })
}

=======
const compress = require('@gltf-transform/cli').compress

async function compressModel() {
  await compress('public/models/original.glb', 'public/models/compressed.glb', {
    textureCompress: 'webp',
    textureResize: [1024, 1024],
    meshopt: true,
    meshQuantize: true,
    meshSimplify: 0.8 // Reduces geometry by 20%
  })
}

>>>>>>> frontend-harsh
compressModel() 