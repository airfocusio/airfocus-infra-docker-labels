import * as github from '@actions/github'
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods'
import { jsonSafeString, unique } from './utils'

type Octokit = ReturnType<typeof github.getOctokit>
type Commit = RestEndpointMethodTypes['git']['getCommit']['response']
type PullRequest = RestEndpointMethodTypes['pulls']['get']['response']

export interface Metadata {
  message: string
  authors: string
  commit: string
  pullRequests: string
  pullRequestLabels: string
}

const { owner, repo } = github.context.repo

export async function extractMetadata(token: string, commitId: string): Promise<Metadata> {
  const octokit = github.getOctokit(token)

  const commit = await getCommit(octokit, commitId)
  const message = getCommitMessageShort(commit)
  const authors = getAuthors(commit)
  const pullRequests = await getPullRequests(octokit, commit)
  const pullRequestLabels = unique(pullRequests.flatMap(pullRequest => pullRequest.data.labels.map(l => l.name)))

  return {
    message: jsonSafeString(message),
    authors: authors.map(jsonSafeString).join(' '),
    commit: commit.data.html_url,
    pullRequests: pullRequests.map(pullRequest => pullRequest.data.html_url).join(' '),
    pullRequestLabels: pullRequestLabels.map(jsonSafeString).join(' '),
  }
}

async function getCommit(octokit: Octokit, commitId: string): Promise<Commit> {
  return await octokit.rest.git.getCommit({
    owner,
    repo,
    commit_sha: commitId,
  })
}

function getCommitMessageShort(commit: Commit): string {
  const message: string = commit.data.message
  return message
    .split('\n')[0]
    .replace(/\(#\d+\)|#\d+/g, '')
    .trim()
}

function getAuthors(commit: Commit): string[] {
  const commits = [commit]
  const authors: string[] = commits.map(commit => commit.data.author.name || '')
  return Array.from(new Set(authors.filter(authorName => !!authorName)))
}

async function getPullRequests(octokit: Octokit, commit: Commit): Promise<PullRequest[]> {
  const message = commit.data.message
  const match = message.match(/(#\d+)/gm)
  if (match) {
    const issueOrPullNumbers = unique(match.map(str => parseInt(str.substring(1), 10))).sort((a, b) => a - b)
    return await Promise.all(
      issueOrPullNumbers.map(async pullNumber => {
        try {
          return await octokit.rest.pulls.get({
            owner,
            repo,
            pull_number: pullNumber,
          })
        } catch (err) {
          return undefined
        }
      })
    )
  }
  return []
}
