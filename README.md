# Complete this


## How to use

RiffRaff payload: 
```json
    {
      "vcsUrl": "%deploy.tag.vcsUrl%",
      "vcsRevision": "%deploy.tag.vcsRevision%",
      "vcsRepo": "%deploy.tag.vcsRepo%"
    }
```

GitHub action:
```yaml
name: <NAME>
on:
  repository_dispatch:
    types: [riffraff]

jobs:
  build:
    name: <NAME>
    runs-on: <RUNS_ON>
    steps:
      ... # YOUR JOBS HERE
      - name: Update commit status
        uses: guardian/update-commit-status
        with:
          ref: ${{ github.event.client_payload.ref }}

```
