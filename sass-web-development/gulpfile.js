var gulp = require('gulp'),
    del = require('del'),

    concat = require('gulp-concat'),
    scssLint = require('gulp-scss-lint'),
    sass = require('gulp-sass'),
    cssPrefixer = require('gulp-autoprefixer'),

    src = 'src/',
    dist = 'dist/',
    paths = {
        html: src + '**/*.html',
        scss: src + '**/*.scss',
        scssMain: src + 'scss-base.scss'
    };

gulp.task('clean', function() {
    del(dist);
});

gulp.task('lintScss', function() {
    return gulp.src(paths.scss)
        .pipe(scssLint({ config: 'lint.yml' }));
});

gulp.task('scss', function() {
    return gulp.src(paths.scssMain)
        .pipe(sass({ precision: 10 }).on('error', sass.logError))
        .pipe(cssPrefixer())
        .pipe(concat('scss-base.css'))
        .pipe(gulp.dest(dist + 'css/'));
});

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(dist));
});

gulp.task('watch', function() {
    var watchScss = gulp.watch(paths.scss, ['lintScss', 'scss']),
        watchHtml = gulp.watch(paths.html, ['html']),

        onChanged = function(event) {
            console.log('File ' + event.path + ' was ' + event.type + '. Running tasks...');
        };

    watchScss.on('change', onChanged);
    watchHtml.on('change', onChanged);
});

gulp.task('default', [ 'lintScss', 'scss', 'html' ]);
