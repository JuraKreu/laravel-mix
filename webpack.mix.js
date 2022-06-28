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
    .sass('./resources/sass/styles.scss', 'css')
    .sass('./resources/sass/bootstrap.scss', 'css')
    .js('./resources/js/bootstrap.js', 'js')
    .js('./resources/js/fontawesome.js', 'js')
    .js('./resources/js/core.js', 'js')
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
        './resources/images/**/*.{ico,gif,jpg,png,svg}',
        './public/src/images',
        {
            base: './resources/images'
        }
    )
    .copyWatched(
        './resources/files/**/*',
        './public/src/files',
        {
            base: './resources/files'
        }
    )
    .copyWatched(
        './resources/fonts/**/*.{woff,woff2}',
        './public/src/fonts',
        {
            base: './resources/fonts'
        }
    )
    .ImageWebp({
        from: './resources/images',
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
            './public/*',
            './resources/views/**/**/*.html',
            './resources/fonts/**/*.{woff,woff2}',
            './resources/images/**/*.{ico,gif,jpg,png,svg}',
            './resources/js/**/*.js',
            './resources/sass/**/*.scss',
            './resources/files/**/**/*'
        ]
    })
    .html ({
        htmlRoot: './resources/views/frontend/*.html',
        output: '../',
        partialRoot: './resources/views/frontend',
        layoutRoot: './resources/views/frontend',
        minify: {
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        }
    })
