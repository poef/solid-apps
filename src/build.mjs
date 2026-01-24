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

build({
    entryPoints: ['./contacts/index.mjs'],
    outfile: './contacts/www/assets/js/contacts.min.js',
    minify: true,
    bundle: true,
    sourcemap: true
})
build({
    entryPoints: ['./contacts/index.mjs'],
    outfile: './contacts/www/assets/js/contacts.js',
    minify: false,
    bundle: true,
    sourcemap: true
})
build({
    entryPoints: ['./contacts/redirect.mjs'],
    outfile: './contacts/www/assets/js/redirect.js',
    minify: false,
    bundle: true
})
