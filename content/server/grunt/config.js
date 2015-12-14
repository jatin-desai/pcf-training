module.exports = function (grunt, options) {
  return {
    dev: {
      options: {    
        variables: {
          'DECK_DIR': 'courses',
          'S3_BUCKET_NAME':'pse-training'
        }
      }
    }
  };
};
