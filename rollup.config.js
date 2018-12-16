// rollup.config.js
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import cleanup from 'rollup-plugin-cleanup';

const baseTypeWrap = {
    input: './index.js',
    external: [
        'debug',
        'rxjs/Observable',
        'rxjs/Rx',
        'rxjs/add/observable/fromEvent',
        'rxjs/add/operator/take'
    ]
}

const baseTypePlay = {
    input: './base.js',
    external: [
        'debug',
        'rxjs/Observable',
        'rxjs/Rx',
        'rxjs/add/observable/fromEvent',
        'rxjs/add/operator/take'
    ]
}

const esm = Object.assign(
    {},
    baseTypeWrap,
    {
        output: {
            file: `dist/esm/TypePlay.js`,
            format: 'es'
        }
    }
)

const cjs = Object.assign(
    {},
    baseTypeWrap,
    {
        output: {
            file: `dist/cjs/TypePlay.js`,
            format: 'cjs'
        }
    }
)

const iife = Object.assign(
    {},
    baseTypeWrap,
    {
        output: {
            name: "TypePlay",
            file: `dist/iife/TypePlay.js`,
            format: 'iife'
        },
        plugins: [
            babel({
                exclude: 'node_modules/**'
            })
        ]
    }
)

const iifemin = Object.assign(
    {},
    baseTypeWrap,
    {
        output: {
            name: "TypePlay",
            file: `dist/iife/TypePlay.min.js`,
            format: 'iife'
        },
        plugins: [
            babel({
                exclude: 'node_modules/**'
            }),
            minify(),
            cleanup()
        ]
    }
)

const iifebase = Object.assign(
    {},
    baseTypePlay,
    {
        output: {
            name: "TypePlayBase",
            file: `dist/iife/baseTypePlay.js`,
            format: 'iife'
        },
        plugins: [
            babel({
                exclude: 'node_modules/**'
            })
        ]
    }
)

export default [iife, iifemin, iifebase, cjs, esm]