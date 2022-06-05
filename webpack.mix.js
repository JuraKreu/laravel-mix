let mix = require('laravel-mix');
require('mix-html-builder');
require('laravel-mix-webp');
require('laravel-mix-copy-watched');

mix.sass('resources/frontend/sass/styles.scss', 'public/css').sourceMaps()
    .sass('resources/frontend/sass/bootstrap.scss', 'public/css').sourceMaps()
    .js('resources/frontend/js/bootstrap.js', 'public/js')
    .js('resources/frontend/js/fontawesome.js', 'public/js')
    .js('resources/frontend/js/core.js', 'public/js')
    .options({
        processCssUrls: false
    });

mix.copyWatched(
    'resources/frontend/images/**/*.{ico,gif,jpg,png,svg}',
    'public/images',
    { base: 'resources/frontend/images' }
);

mix.copyWatched(
    'resources/frontend/files/**/*',
    'public/files',
    { base: 'resources/frontend/files' }
);

mix.copyWatched(
    'resources/frontend/fonts/**/*.{woff,woff2}',
    'public/fonts',
    { base: 'resources/frontend/fonts' }
);

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
        "public/**/**/**/**/*",
        "resources/frontend/views/**/**/*",
        'resources/frontend/fonts/**/*.{woff,woff2}',
        'resources/frontend/images/**/*.{ico,gif,jpg,png,svg}',
        'resources/frontend/js/**/*.js',
        'resources/frontend/sass/**/*.scss',
    ]
});

mix.html ({
    htmlRoot: './resources/frontend/views/*.html',
    output: 'public',
    partialRoot: './resources/frontend/views',
    layoutRoot: './resources/frontend/views',
    minify: {
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
    }
});
