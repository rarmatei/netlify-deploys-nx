const {
  createProjectGraph
} = require('@nrwl/workspace/src/core/project-graph/project-graph');
const {
  filterAffected
} = require('@nrwl/workspace/src/core/affected-project-graph');
const { calculateFileChanges } = require('@nrwl/workspace/src/core/file-utils');
const { parseFiles } = require('@nrwl/workspace/src/command-line/shared');
module.exports = {
  onInit: ({ utils }) => {
    const files = parseFiles({
      base: process.env.CACHED_COMMIT_REF,
      head: 'HEAD'
    }).files;
    const calculatedFileChanges = calculateFileChanges(files, {
      base: process.env.CACHED_COMMIT_REF,
      head: 'HEAD'
    });
    const projectGraph = createProjectGraph();
    const affectedGraph = filterAffected(projectGraph, calculatedFileChanges);
    if (!affectedGraph.nodes[process.env.PROJECT_NAME]) {
      utils.build.cancelBuild(
        'Build was cancelled because Project was not affected'
      );
    }
  }
};
