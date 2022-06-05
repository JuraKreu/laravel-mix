let mix = require('laravel-mix')
require('mix-html-builder')
require('laravel-mix-webp')
require('laravel-mix-copy-watched')
require('dotenv').config()

let proxy_url = process.env.BROWSERSYNC_PROXY_URL,
    proxy_port = process.env.BROWSERSYNC_PROXY_PORT,
    proxy_path = process.env.BROWSERSYNC_PROXY_PATH;

mix
    .setResourceRoot("../")
    .setPublicPath('./public/src/')
    .webpackConfig({
        output: {
            publicPath: "./public/"
        },
        stats: {
            children: false
        }
    })
    .sass('./resources/frontend/sass/styles.scss', 'css')
    .sass('./resources/frontend/sass/bootstrap.scss', 'css')
    .js('./resources/frontend/js/bootstrap.js', 'js')
    .js('./resources/frontend/js/fontawesome.js', 'js')
    .js('./resources/frontend/js/core.js', 'js')
    .sourceMaps()
    .options({
        processCssUrls: false,
        purifyCss: false,
        clearConsole: false,
        terser: {
            extractComments: false
        },
        autoprefixer: true
    })
    .copyWatched(
        './resources/frontend/images/**/*.{ico,gif,jpg,png,svg}',
        './public/src/images',
        {
            base: './resources/frontend/images'
        }
    )
    .copyWatched(
        './resources/frontend/files/**/*',
        './public/src/files',
        {
            base: './resources/frontend/files'
        }
    )
    .copyWatched(
        './resources/frontend/fonts/**/*.{woff,woff2}',
        './public/src/fonts',
        {
            base: './resources/frontend/fonts'
        }
    )
    .ImageWebp({
        from: './resources/frontend/images',
        to: './public/src/images',
        imageminWebpOptions: {
            quality: 100
        },
    })
    .browserSync({
        host: proxy_url,
        server: proxy_path,
        port: proxy_port,
        reloadOnRestart: true,
        reload: true,
        ghostMode: false,
        files: [
            "./public/*",
            "./resources/frontend/views/**/**/*.html",
            './resources/frontend/fonts/**/*.{woff,woff2}',
            './resources/frontend/images/**/*.{ico,gif,jpg,png,svg}',
            './resources/frontend/js/**/*.js',
            './resources/frontend/sass/**/*.scss',
        ]
    })
    .html ({
        htmlRoot: './resources/frontend/views/*.html',
        output: '../',
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