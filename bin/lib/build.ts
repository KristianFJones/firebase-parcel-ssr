import { copy, mkdir, remove } from 'fs-extra'
import ParcelBundler from 'parcel-bundler'

export async function build(watch: boolean = false) {
  await remove('dist')
  await mkdir('dist')
  await mkdir('dist/functions')

  await copy('public', 'dist/public')

  await copy('package.json', 'dist/package.json')
  await copy('package-lock.json', 'dist/package-lock.json')

  const bundler = new ParcelBundler(['ui/client.urls'], {
    outDir: 'dist/public',
    watch,
    target: 'browser',
    bundleNodeModules: true,
    minify: true
  })
  await bundler.bundle()

  const fnbundler = new ParcelBundler(['functions/index.ts', 'functions/test.urls'], {
    outDir: 'dist/functions',
    watch,
    contentHash: false,
    target: 'node'
  })
  await fnbundler.bundle()

  const srvbundler = new ParcelBundler(['ui/server.urls'], {
    outDir: 'dist/ui',
    watch,
    contentHash: false,
    target: 'node',
  })
  await srvbundler.bundle()
}
