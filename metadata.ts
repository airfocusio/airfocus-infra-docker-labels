import * as github from '@actions/github'
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods'

type Octokit = ReturnType<typeof github.getOctokit>
type Commit = RestEndpointMethodTypes['git']['getCommit']['response']

export interface Metadata {
  'org.opencontainers.image.source': string
  'org.opencontainers.image.revision': string
}

const { owner, repo } = github.context.repo

export async function extractMetadata(token: string, commitId: string): Promise<Metadata> {
  const octokit = github.getOctokit(token)

  const commit = await getCommit(octokit, commitId)
  const repoRegex = /^(https:\/\/github.com\/(?:[^\/]+)\/(?:[^\/]+))\//
  const source = commit.data.html_url.match(repoRegex)?.[1] || ''
  const revision = commit.data.sha || ''

  return {
    'org.opencontainers.image.source': source,
    'org.opencontainers.image.revision': revision,
  }
}

async function getCommit(octokit: Octokit, commitId: string): Promise<Commit> {
  return await octokit.rest.git.getCommit({
    owner,
    repo,
    commit_sha: commitId,
  })
}
