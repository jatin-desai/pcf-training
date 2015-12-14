module.exports = function (grunt, options) {
  return {
    main: {
      files: {
        'build/css/theme/default.css': 'build/css/theme/source/default.scss',
        'build/css/theme/beige.css': 'build/css/theme/source/beige.scss',
        'build/css/theme/night.css': 'build/css/theme/source/night.scss',
        'build/css/theme/serif.css': 'build/css/theme/source/serif.scss',
        'build/css/theme/simple.css': 'build/css/theme/source/simple.scss',
        'build/css/theme/sky.css': 'build/css/theme/source/sky.scss',
        'build/css/theme/moon.css': 'build/css/theme/source/moon.scss',
        'build/css/theme/solarized.css': 'build/css/theme/source/solarized.scss',
        'build/css/theme/blood.css': 'build/css/theme/source/blood.scss'
      }
    }
  };
};
