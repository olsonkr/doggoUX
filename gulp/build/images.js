var gulp = require('gulp'),
    config = require('../../gulp.config'),
    imagemin = require('gulp-imagemin'),
    del = require('del');

gulp.task('clean:images-b', function() {
    return del(config.build + config.appImages);
});

gulp.task('images-b', ['clean:images-b'], function() {
    return gulp
        .src(config.src + config.appImages + '**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(config.build + config.appImages));
});