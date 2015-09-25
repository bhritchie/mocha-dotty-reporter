module.exports = Dotty;

function Dotty(runner) {
  var width = 80;

  var passes = 0;
  var failures = 0;
  var pending = 0;

  var failedTestsDetails = [];
  var pendingTestDetails = [];

  runner.on('pass', function(test){
    passes++;
    console.log('.');
  });

  runner.on('fail', function(test, err){
    failures++;
    failedTestsDetails.push({
      title: test.fullTitle(),
      error: err.message
    });
    console.log('F');
  });

  runner.on('pending', function(test){
    pending++;
    pendingTestDetails.push({
      title: test.fullTitle()
    });
    console.log('*');
  });

  runner.on('end', function(){
    console.log('Passed: %d/%d', passes, passes + failures);
    console.log('Failed: %d', failures);
    console.log('Pending: %d', pending);
    process.exit(failures);
  });
}