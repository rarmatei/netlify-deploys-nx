const exec = require('child_process').exec;
const getAffected = `yarn nx print-affected --base=${process.env.CACHED_COMMIT_REF} --head=HEAD`;

exec(getAffected, function(error, stdout, stderr) {
  const changedProjects = JSON.parse(stdout).projects;
  const currentProject = process.env.PROJECT_NAME;
  console.log('----CACHING-----');
  console.log(changedProjects);
  console.log(currentProject);
  console.log(process.env.CACHED_COMMIT_REF);
  if (changedProjects.find(proj => proj === currentProject)) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});
