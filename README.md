# airfocus-infra-metadata

Github action to expose useful metadata about the build.

```yaml
# .github/workflows/build.yaml
name: Build
on:
  push:
jobs:
  version:
    runs-on: ubuntu-latest
    steps:
      - id: airfocus-infra-metadata
        uses: airfocusio/airfocus-infra-metadata@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
      - run: |
          echo "${{ toJSON(steps.airfocus-infra-metadata.outputs.metadata) }}
```
