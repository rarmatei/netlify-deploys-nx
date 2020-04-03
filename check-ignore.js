const exec = require('child_process').exec;
const getAffected = `yarn --silent exec nx print-affected -- --base=${process.env.CACHED_COMMIT_REF} --head=HEAD`;
const currentProject = process.env.PROJECT_NAME;

if (!currentProject) {
  process.exit(0);
}

exec(getAffected, function(error, stdout, stderr) {
  const changedProjects = JSON.parse(stdout).projects;
  if (changedProjects.find(proj => proj === currentProject)) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});
