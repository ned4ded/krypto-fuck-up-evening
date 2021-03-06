const path = require('path');
const gulp = require('gulp');
const config = require('./gulpfile.config');

const browserSync = require('browser-sync').create();

const styles = require('./tasks/styles');

const scripts = require('./tasks/scripts')(browserSync);
const html = require('./tasks/html')(browserSync);

gulp.task('webserver', ['styles', 'html', 'scripts'], function() {
  browserSync.init({
    open: false,
    ui: false,
    server: config.server.serveFolder,
    files: path.join(config.server.serveFolder, 'index.html'),
    host: config.server.host,
    port: config.server.port,
    reloadOnRestart: true,
    logConnections: true,
    ghostMode: false,
  });

  gulp.watch(config.paths.stylesAll, ['styles']);
  gulp.watch(config.paths.scripts, ['scripts']);
  gulp.watch(config.paths.pages, ['html']);
});

gulp.task('default', ['webserver']);
