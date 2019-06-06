import util from 'util'
import { remove, ensureDir } from 'fs-extra'
import ParcelBundler, { ParcelOptions } from 'parcel-bundler'
import { generateSW } from 'workbox-build'
const exec = util.promisify(require('child_process').exec)

async function BuildUI() {
  const JSOptions: ParcelOptions = {
    outDir: 'dist',
    minify: true,
    watch: true,
    contentHash: false
  }

  await remove('dist/')
  await ensureDir('dist/public')

  await exec('cp -r public/* dist/public/ && cp package* dist && tsc -b functions/tsconfig.json')
  await generateSW({
    swDest: 'dist/public/service-worker.js',
    importScripts: ['worker.js'],
    globDirectory: '.',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  })
  const Bundler = new ParcelBundler(['public/assets.urls'], JSOptions)
  await Bundler.bundle()
}

BuildUI()
