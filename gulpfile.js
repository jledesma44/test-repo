const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const kit = require('gulp-kit-2');

// Sass Task

gulp.task('sass', function (done) {
  return gulp
    .src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
});

// Html kit templating
gulp.task('kit', function(done){
  return(
    gulp.src('./html/**/*.kit')
      .pipe(kit())
      .pipe(gulp.dest('./'))
  )
})

// Watch task with BrowserSync

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './',
    },
    // uncomment below line to use with code-server
    open: false

    // uncomment below line to use for vscode on local machine  
    // browser: "firefox developer edition",
  });
  gulp
    .watch(
      [
        './src/sass/**/*.scss', 
        './html/**/*.kit'
      ],
      gulp.series(['sass', 'kit'])
    )
    .on('change', browserSync.reload);
});