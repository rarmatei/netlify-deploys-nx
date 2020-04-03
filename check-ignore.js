if (!process.env.NETLIFY) {
  process.exit(0);
}

const currentProject = process.env.PROJECT_NAME;
const lastDeployedCommit = process.env.CACHED_COMMIT_REF;
const latestCommit = 'HEAD';
const projectHasChanged = projectChanged(
  currentProject,
  lastDeployedCommit,
  latestCommit
);

if (projectHasChanged) {
  process.exit(0);
} else {
  //stop the build if process hasn't changed
  process.exit(1);
}

function projectChanged(projectName, fromHash, toHash) {
  const execSync = require('child_process').execSync;
  const getAffected = `yarn --silent exec nx print-affected -- --base=${fromHash} --head=${toHash}`;
  const output = execSync(getAffected).toString();
  const changedProjects = JSON.parse(output).projects;
  if (changedProjects.find(proj => proj === currentProject)) {
    return true;
  } else {
    return false;
  }
}
