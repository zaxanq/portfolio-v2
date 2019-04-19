var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    });
});

gulp.task('sass', () => {
    return gulp.src('app/assets/styles/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('app/assets/styles/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', ['browserSync', 'sass'], () => {
    gulp.watch('app/assets/styles/**/*.sass');
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/*.hbs', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
});