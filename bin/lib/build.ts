import { copy, mkdir, remove } from 'fs-extra'
import ParcelBundler from 'parcel-bundler'
import run from './run'

export async function build(watch: boolean = false) {
  await remove('dist')
  await mkdir('dist')

  await copy('public', 'dist/public')
  await copy('package.json', 'dist/package.json')
  await copy('package-lock.json', 'dist/package-lock.json')

  await run('tsc --build functions/tsconfig.json')

  const bundler = new ParcelBundler(['ui/client.urls'], {
    outDir: 'dist/public',
    watch,
    target: 'browser',
    contentHash: false,
    sourceMaps: false,
  })

  const serverbundler = new ParcelBundler(['ui/server.urls'], {
    outDir: 'dist/server',
    watch,
    target: 'node',
    contentHash: false,
    sourceMaps: false,
    bundleNodeModules: true,
  })
  await bundler.bundle()
  await serverbundler.bundle()
}
