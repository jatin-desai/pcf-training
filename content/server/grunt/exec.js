module.exports = function (grunt, options) {
  return {
    goget: '( go get -u github.com/tools/godep && go get -u github.com/xchapter7x/goutil/itertools && go get -u github.com/codegangsta/cli && go get -u bitbucket.org/tebeka/selenium )',
    unit: '( cd ./video-runner/ && godep go test ./...)',
    cover: '( cd ./video-runner/ && ./testCoverage ./autoyaml 85 && ./testCoverage ./processors/... 85 && ./testCoverage ./autoyaml/cmd/... 68 )',
    forceclean: '( rm -fR ${GOPATH}/pkg/linux_amd64/github.com/pivotalservices/pcf-training )',
    yamlrunner: '( cd ./video-runner/autoyaml/cmd/yaml-runner/ && GOBIN=<%= process.cwd() %>/bin godep go install ./ )',
    generatecontent: '( ./bin/yaml-runner --moviescript ./video-runner/scripts/make-my-movie --filename ./video-runner/autoyaml/auto_example.yml --s3-AccessKey ${S3_KEY} --s3-SecretKey ${S3_SECRET} --s3-Bucket <%= grunt.config.get("S3_BUCKET_NAME") %> )',
    movietest: '( cd ./video-runner/scripts/test && ./make-my-movie-test )',
    buildpushassets: '( find <%= process.cwd() %> -name auto.yml | xargs -I yamlf ./bin/yaml-runner --filename yamlf --moviescript ./video-runner/scripts/make-my-movie --s3-AccessKey ${S3_KEY} --s3-SecretKey ${S3_SECRET} --s3-Bucket <%= grunt.config.get("S3_BUCKET_NAME") %> )',
    buildassets: '( find  <%= process.cwd() %> -name auto.yml | xargs -I yamlf ./bin/yaml-runner --filename yamlf --moviescript ./video-runner/scripts/make-my-movie )',
    buildpushassetsdelta: '( find <%= process.cwd() %> -name auto.yml | xargs -I yamlf ./bin/yaml-runner --filename yamlf --moviescript ./video-runner/scripts/make-my-movie --s3-AccessKey ${S3_KEY} --s3-SecretKey ${S3_SECRET} --s3-Bucket <%= grunt.config.get("S3_BUCKET_NAME") %> --s3-Delta-Only )',
    pushassetsdelta: '( find <%= process.cwd() %> -name auto.yml | xargs -I yamlf ./bin/yaml-runner --filename yamlf --s3-AccessKey ${S3_KEY} --s3-SecretKey ${S3_SECRET} --s3-Bucket <%= grunt.config.get("S3_BUCKET_NAME") %> --s3-Delta-Only)',
    pushassets: '( find <%= process.cwd() %> -name auto.yml | xargs -I yamlf ./bin/yaml-runner --filename yamlf --s3-AccessKey ${S3_KEY} --s3-SecretKey ${S3_SECRET} --s3-Bucket <%= grunt.config.get("S3_BUCKET_NAME") %> )',
    validasset: '( ./validateAssets  <%= grunt.config.get("DECK_DIR") %> )',
    run: ''
  };
};
