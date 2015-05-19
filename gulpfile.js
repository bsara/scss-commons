var gulp     = require('gulp');
var clean    = require('gulp-clean');
var sass     = require('gulp-ruby-sass');
var scsslint = require('gulp-scss-lint');
var sassdoc  = require('sassdoc');



gulp.task('default', [ 'lint', 'test', 'docs' ]);



gulp.task('clean-test', function() {
  return gulp.src('./test.css', { read: false })
             .pipe(clean({ force: true }));
});


gulp.task('test', [ 'clean-test' ], function() {
  return sass('./test.scss', {
           force: true,
           noCache: true,
           style: 'expanded',
           trace: true,
           unixNewlines: true,
           verbose: true
         }).on('error', function(err) {
           console.error('Error!', err.message);
         })
         .pipe(gulp.dest('./'));
});


gulp.task('lint', function() {
  return gulp.src('./*.scss')
             .pipe(scsslint({
               config: '.scss-lint.yml',
               verbose: true
             }))
             .pipe(scsslint.failReporter('E'));
});


gulp.task('clean-docs', function() {
  return gulp.src('./docs', { read: false })
             .pipe(clean({ force: true }));
});


gulp.task('docs', [ 'clean-docs' ], function() {
  return gulp.src('./*.scss')
             .pipe(sassdoc({
               dest: './docs',
               verbose: true,
               display: {
                 access: [ 'public' ],
                 alias: true,
                 watermark: true
               },
               groups: {
                 'undefined': "miscellaneous"
               },
               basePath: 'https://github.com/bsara/scss-commons/tree/master'
             }));
});
