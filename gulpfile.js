const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const tslint = require('gulp-tslint');

const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', ['lint'], () => {
  return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('lint', () => {
  return gulp.src(['src/**/*.ts'])
      .pipe(tslint({
        formatter: 'stylish'
      }))
      .pipe(tslint.report({summarizeFailureOutput: true}));
});

gulp.task('scripts', ['clean'], () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', ['clean'], function() {
  return gulp.src(JSON_FILES)
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts', 'assets']);
