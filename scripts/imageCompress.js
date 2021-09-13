/* eslint require-await: "error" */

import fs from 'fs/promises'
import path from 'path'
import { ImagePool } from '@squoosh/lib'
import fg from 'fast-glob'
// libSquoosh uses a worker-pool under the hood
// to parallelize all image processing.

// Accepts both file paths and Buffers/TypedArrays.
const econdeCodecs = {
  mozjpeg: { quality: 80 },
  webp: { quality: 75 },
}

const inputFolder = './static/images/**/*.{jpg,png}'
const outputFolder = './static/compressed/'

async function processImage(pool, imgPath) {
  const image = pool.ingestImage(imgPath)

  // Optional.
  // await image.preprocess({
  //   resize: {
  //     enabled: true,
  //     width: 128,
  //   },
  // });
  await image.encode(econdeCodecs)

  for (const codecName of Object.keys(econdeCodecs)) {
    const { extension, binary } = await image.encodedWith[codecName]

    const filePath = path.parse(imgPath)
    const fileName = filePath.name
    const dirName = filePath.dir

    const dir = dirName.replace('./static/', outputFolder) // compressed folder

    try {
      await fs.access(dir)
    } catch {
      await fs.mkdir(dir)
    }

    await fs.writeFile(`${dir}/${fileName}.${extension}`, binary)
  }
}

async function init() {
  const images = await fg([inputFolder], { dot: true })
  const imagePool = new ImagePool(5)
  for (const imgPath of images) {
    await processImage(imagePool, imgPath)
  }
  await imagePool.close()
}

init()
