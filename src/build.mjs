import {build} from 'esbuild'

build({
    entryPoints: ['./podlist/index.mjs'],
    outfile: './podlist/www/assets/js/podlist.min.js',
    minify: true,
    bundle: true,
    sourcemap: true
})
build({
    entryPoints: ['./podlist/index.mjs'],
    outfile: './podlist/www/assets/js/podlist.js',
    minify: false,
    bundle: true,
    sourcemap: true
})
build({
    entryPoints: ['./podlist/redirect.mjs'],
    outfile: './podlist/www/assets/js/redirect.js',
    minify: false,
    bundle: true
})
