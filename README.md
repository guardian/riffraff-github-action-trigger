# RiffRaff GitHub Action Trigger


## How to use

Right now, you need to do 3 things to set this up:

1. Set up a post-deploy hook in RiffRaff with the following payload:

RiffRaff payload: 
```json
{
  "vcsUrl": "%deploy.tag.vcsUrl%",
  "vcsRevision": "%deploy.tag.vcsRevision%",
  "vcsRepo": "%deploy.tag.vcsRepo%",
  "branch": "%deploy.tag.branch%",
  "build": "%deploy.build%",
  "deployer": "%deploy.deployer%"
}
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
    - name: Update commit status (pending)
      uses: Sibz/github-status-action@v1
      with:
        authToken: ${{secrets.GITHUB_TOKEN}}
        context: 'RiffRaff Trigger'
        description: ${{ github.event.client_payload.build }}
        state: 'pending'
        target_url: "https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}"
        sha: ${{ github.event.client_payload.ref }}
    
      ... # YOUR JOBS HERE

    - name: Update commit status (SUCCESS)
      if: ${{ success() }}
      uses: Sibz/github-status-action@v1
      with:
        authToken: ${{secrets.GITHUB_TOKEN}}
        context: 'RiffRaff Trigger'
        description: ${{ github.event.client_payload.build }}
        state: 'success'
        target_url: "https://github.com/guardian/<REPO>/actions"
        sha: ${{ github.event.client_payload.ref }}
    - name: Update commit status (FAILURE)
      if: ${{ failure() }}
      uses: Sibz/github-status-action@v1
      with:
        authToken: ${{secrets.GITHUB_TOKEN}}
        context: 'RiffRaff Trigger'
        description: ${{ github.event.client_payload.build }}
        state: 'failure'
        target_url: "https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}"
        sha: ${{ github.event.client_payload.ref }}
```

3. Add a secret to your repo called `GITHUB_TOKEN`. This will be used in the Workflow to grant permissions to update a commit status.

### Why not use `worfklow_dispatch`?

`worfklow_dispatch` doesn't work quite as expected. Clarification on how it's meant to be used should hopefully arrive soon-ish: https://github.community/t/error-in-docs-or-misunderstanding-for-workflow-dispatch-event/125066
