const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const minify = require("gulp-minify");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const fs = require("fs");

// CSS Tasks
gulp.task("css-compile", () => {
  return gulp
    .src("scss/*.scss")
    .pipe(
      sass({
        outputStyle: "nested"
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 8 version"]
      })
    )
    .pipe(gulp.dest("./dist/assets/css/"));
});

gulp.task("css-minify", () => {
  return gulp
    .src(["./dist/assets/css/*.css", "!./dist/assets/css/*.min.css"])
    .pipe(cssmin())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("./dist/assets/css"));
});

// JavaScript Tasks
gulp.task("js-build", () => {
  return gulp.src("./js/*.js").pipe(gulp.dest("./dist/assets/js/"));

  gulp.series("js-lite-build");
  gulp.series("js-minify");
});

gulp.task("js-minify", () => {
  return gulp
    .src(["./dist//assets/js/main.js"])
    .pipe(
      minify({
        ext: {
          min: ".min.js"
        },
        noSource: true
      })
    )
    .pipe(gulp.dest("./dist/assets/js"));
});

// Image Compression
gulp.task("img-compression", function() {
  return gulp
    .src("./img/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true
        }),
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.optipng({
          optimizationLevel: 5
        }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: true
            },
            {
              cleanupIDs: false
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest("./dist/img"));
});

// Live Server
gulp.task("live-server", function(done) {
  console.log("Restarting server...");
  browserSync.reload();
  done();
});

function initBrowser() {
  browserSync.init(
    {
      server: {
        baseDir: "./dist/",
        directory: true
      },
      notify: false
    },
    function() {
      console.log("asdasd");
    }
  );
}
// Watch on everything
gulp.task("go", function(done) {
  initBrowser();
  gulp.watch(
    "**/*",
    {
      cwd: "./dist"
    },
    gulp.parallel("live-server")
  );
  gulp.watch("scss/**/*.scss", gulp.parallel("css-compile"));
  gulp.watch(
    ["dist/assets/css/*.css", "!dist/assets/css/*.min.css"],
    gulp.parallel("css-minify")
  );
  gulp.watch("js/**/*.js", gulp.parallel("js-build"));
  gulp.watch(
    ["dist/assets/js/*.js", "!dist/assets/js/*.min.js"],
    gulp.parallel("js-minify")
  );
  gulp.watch(
    "**/*",
    {
      cwd: "./img/"
    },
    gulp.parallel("img-compression")
  );
});
