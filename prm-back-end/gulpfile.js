var gulp = require('gulp');
var browserSync = require('browser-sync');
const { series } = require('gulp');
const { watch } = require('browser-sync');
// var nodemon = require('gulp-nodemon');

function browserSyncServer(cb) {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
};

function browserSyncReload(cb) {
    browserSync.reload();
    cb();
};

function watchTask() {
    watch(['routes/*.js'], browserSyncReload);
};

exports.default = series(
    browserSyncServer,
    watchTask
);