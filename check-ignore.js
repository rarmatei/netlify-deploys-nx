const exec = require('child_process').exec;
const getAffected = `yarn --silent exec nx print-affected --base=${process.env.CACHED_COMMIT_REF} --head=HEAD`;

exec(getAffected, function(error, stdout, stderr) {
  process.stdout.write('hey there!');

  if (error || stderr) {
    process.stdout.write(error);
    process.stdout.write(stderr);
  }
  const changedProjects = JSON.parse(stdout).projects;
  const currentProject = process.env.PROJECT_NAME;
  console.log('----CACHING-----');
  console.log(changedProjects);
  console.log(currentProject);
  console.log(process.env.CACHED_COMMIT_REF);
  if (changedProjects.find(proj => proj === currentProject)) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});
