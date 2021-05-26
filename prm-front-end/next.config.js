const withStyles = require('@webdeb/next-styles')

module.exports = {
  images: {
    domains: ['rickandmortyapi.com'],
  },
};

module.exports = withStyles({
  sass: true, // use .scss files
  modules: true, // style.(m|module).css & style.(m|module).scss for module files
});