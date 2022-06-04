let mix = require('laravel-mix');

mix.sass('resources/sass/styles.scss', 'public/css')
    .js('resources/js/app.js', 'public/js')
    .browserSync('127.0.0.1:8080');
