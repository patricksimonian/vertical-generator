const gulp = require('gulp');
const gulpEslint = require('gulp-eslint');


gulp.task('eslint', () => {
  return gulp.src('**/*.js')
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError());
});

gulp.task('default', ['eslint'],  () => {
  gulp.watch('**/*.js', ['eslint']);
});
