import {build} from 'esbuild'

build({
    entryPoints: ['./index.mjs'],
    outfile: './www/assets/js/podlist.min.js',
    minify: true,
    bundle: true,
    sourcemap: true
})
build({
    entryPoints: ['./index.mjs'],
    outfile: './www/assets/js/podlist.js',
    minify: false,
    bundle: true,
    sourcemap: true
})
build({
    entryPoints: ['./redirect.mjs'],
    outfile: './www/assets/js/redirect.js',
    minify: false,
    bundle: true
})
