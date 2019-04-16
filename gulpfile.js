"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss"); 
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var run = require("run-sequence");
var del = require("del");
var uglify = require("gulp-uglify");

gulp.task('js', function () {
  return gulp.src([
      'src/js/scripts.js'
    ])
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
		.pipe(gulp.dest('build/js'))
});

gulp.task("style", function() {
  gulp.src("src/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});


gulp.task("serve", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/less/**/*.less", ["style"]);
  gulp.watch(["src/js/scripts.js"], ["js"]).on("change", server.reload);
  gulp.watch("src/*.html", ["html"]).on("change", server.reload);
});

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "js",
    "images",
    "sprite",
    "html",
    done
    );
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**",
    "src/js/**",
    "src/*.html"
  ], {
      base: "./src"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("images", function () {
  return gulp.src("build/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("src/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});
