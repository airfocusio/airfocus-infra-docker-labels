import { extractMetadata } from './metadata'

it('extractMetadata', async () => {
  const metadata = await extractMetadata(process.env.GITHUB_TOKEN || '', '6c0693a92b46e35e1014158fd3e313e27e607af4')
  expect(metadata).toEqual({
    message: 'test pull request',
    authors: 'Christian Hoffmeister',
    commit: 'https://github.com/airfocusio/airfocus-infra-metadata/commit/6c0693a92b46e35e1014158fd3e313e27e607af4',
    pullRequests: 'https://github.com/airfocusio/airfocus-infra-metadata/pull/1',
    pullRequestLabels: 'TEST 1, TEST 2',
  })
})
