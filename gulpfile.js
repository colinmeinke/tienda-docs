const autoprefixer = require('autoprefixer')
const browsersync = require('browser-sync').create()
const cssnano = require('cssnano')
const del = require('del')
const gulp = require('gulp')
const inline = require('gulp-inline')
const postcss = require('gulp-postcss')
const uglify = require('gulp-uglify')

const postCssPlugins = [
  autoprefixer({ browsers: [ 'last 2 versions' ] }),
  cssnano()
]

gulp.task('clean', () => del([ './dist', './tmp' ]))

gulp.task('config', () => gulp.src('./now.json')
  .pipe(gulp.dest('./dist'))
)

gulp.task('img', () => gulp.src('./src/*.png')
  .pipe(gulp.dest('./dist'))
  .pipe(browsersync.stream())
)

gulp.task('html', [ 'css', 'js' ], () => gulp.src('./src/index.html')
  .pipe(inline())
  .pipe(gulp.dest('./dist'))
  .pipe(browsersync.stream())
)

gulp.task('css', () => gulp.src('./src/styles.css')
  .pipe(postcss(postCssPlugins))
  .pipe(gulp.dest('./tmp'))
)

gulp.task('js', () => gulp.src('./src/scripts.js')
  .pipe(uglify())
  .pipe(gulp.dest('./tmp'))
)

gulp.task('build', [ 'clean', 'config', 'img', 'html' ])

gulp.task('watch', [ 'build' ], () => {
  browsersync.init({ server: { baseDir: './dist' } })
  gulp.watch('./src/*.js', [ 'html' ])
  gulp.watch('./src/*.css', [ 'html' ])
  gulp.watch('./src/*.html', [ 'html' ])
  gulp.watch('./src/*.png', [ 'img' ])
})

gulp.task('default', [ 'build' ])
