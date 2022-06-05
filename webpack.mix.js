let mix = require('laravel-mix')
require('mix-html-builder')
require('laravel-mix-webp')
require('laravel-mix-copy-watched')
require('dotenv').config()

let proxy_url = process.env.BROWSERSYNC_PROXY_URL,
    proxy_port = process.env.BROWSERSYNC_PROXY_PORT,
    proxy_path = process.env.BROWSERSYNC_PROXY_PATH;

mix.setPublicPath('public/')
    .webpackConfig({
        output: {
            publicPath: "public/",
        },
        stats: {
            children: true,
        },
    })
    .sass('resources/frontend/sass/styles.scss', 'css').sourceMaps()
    .sass('resources/frontend/sass/bootstrap.scss', 'css').sourceMaps()
    .js('resources/frontend/js/bootstrap.js', 'js')
    .js('resources/frontend/js/fontawesome.js', 'js')
    .js('resources/frontend/js/core.js', 'js')
    .sourceMaps()
    .options({
        processCssUrls: false,
        purifyCss: false,
        clearConsole: false,
        terser: { extractComments: false },
        postCss: [require('autoprefixer')]
    })
    .copyWatched(
        'resources/frontend/images/**/*.{ico,gif,jpg,png,svg}',
        'public/images',
        {
            base: 'resources/frontend/images'
        }
    )
    .copyWatched(
        'resources/frontend/files/**/*',
        'public/files',
        {
            base: 'resources/frontend/files'
        }
    )
    .copyWatched(
        'resources/frontend/fonts/**/*.{woff,woff2}',
        'public/fonts',
        {
            base: 'resources/frontend/fonts'
        }
    )
    .ImageWebp({
        from: 'resources/frontend/images',
        to: 'public/images',
        imageminWebpOptions: {
            quality: 100
        },
    })
    .browserSync({
        host: proxy_url,
        server: proxy_path,
        port: proxy_port
    })
    .html ({
        htmlRoot: './resources/frontend/views/*.html',
        output: '',
        partialRoot: './resources/frontend/views',
        layoutRoot: './resources/frontend/views',
        minify: {
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        }
    })

if (mix.inProduction()) {
    mix.version()
}
