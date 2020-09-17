# RiffRaff GitHub Action Trigger


## How to use

Right now, you need to do 3 things to set this up:

1. Set up a post-deploy hook in RiffRaff with the following payload:

RiffRaff payload: 
```json
{"vcsUrl": "%deploy.tag.vcsUrl%", "vcsRevision": "%deploy.tag.vcsRevision%", "vcsRepo": "%deploy.tag.vcsRepo%", "branch": "%deploy.tag.branch%", "build": "%deploy.build%" }
```

2. Set up a GitHub workflow in your repo (`$REPO_ROOT_DIR/.github/workflows`) with the following template:

GitHub action:
```yaml
name: <NAME>
on:
  repository_dispatch:
    types: [riffraff] # This is required so that the app knows which event to trigger

jobs:
  build:
    name: <NAME>
    runs-on: <RUNS_ON>
    steps:
      ... # YOUR JOBS HERE
      - name: Update commit status (SUCCESS)
        if: ${{ success() }}
        uses: Sibz/github-status-action@v1
        with:
          authToken: ${{secrets.GITHUB_TOKEN}}
          context: 'RiffRaff Deploy'
          description: 'BUILD_ID'
          state: 'success'
          target_url: "https://github.com/guardian/riffraff-github-action-trigger/actions"
          sha: ${{ github.event.client_payload.ref }}
      - name: Update commit status (FAILURE)
        if: ${{ failure() }}
        uses: Sibz/github-status-action@v1
        with:
          authToken: ${{secrets.GITHUB_TOKEN}}
          context: 'RiffRaff Deploy'
          description: 'BUILD_ID'
          state: 'failure'
          sha: ${{ github.event.client_payload.ref }}


```
