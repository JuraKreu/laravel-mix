let mix = require('laravel-mix')
require('mix-html-builder');
require('laravel-mix-webp')

mix.sass('resources/frontend/sass/styles.scss', 'public/css').sourceMaps().options({
    processCssUrls: false
});

mix.sass('resources/frontend/sass/bootstrap.scss', 'public/css').sourceMaps().options({
    processCssUrls: false
});

mix.js('resources/frontend/js/**/*.js', 'public/js');

mix.copy( 'resources/frontend/images', 'public/images');

mix.copy( 'resources/frontend/fonts', 'public/fonts');

mix.ImageWebp({
    from: 'resources/frontend/images',
    to: 'public/images',
    imageminWebpOptions: {
        quality: 100
    },
})

mix.browserSync({
    host: 'localhost',
    server: 'public',
    port: 3000,
    reload: true,
    files: [
        "./public/**/**/*",
    ]
});

mix.html ({
    htmlRoot: './resources/frontend/views/*.html',
    output: 'public',
    partialRoot: './resources/frontend/views',
    layoutRoot: './resources/frontend/views',
    options: {
        minimize: true
    }
});