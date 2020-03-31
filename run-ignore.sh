#!/usr/bin/env bash

yarn --silent exec nx print-affected -- --base=f5c4cfe --head=HEAD --select="projects"

#yarn --silent exec 
#f5c4cfe
#${CACHED_COMMIT_REF}