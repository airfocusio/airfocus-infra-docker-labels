import { extractMetadata } from './metadata'

it('extractMetadata', async () => {
  const metadata = await extractMetadata(process.env.GITHUB_TOKEN || '', 'a55d822fdac3d2b4446217dc960a0d6cc217e412')
  expect(metadata).toEqual({
    message: 'test pull foo bar request',
    authors: 'Christian Hoffmeister',
    commit: 'https://github.com/airfocusio/airfocus-infra-metadata/commit/a55d822fdac3d2b4446217dc960a0d6cc217e412',
    pullRequests: 'https://github.com/airfocusio/airfocus-infra-metadata/pull/1',
    pullRequestLabels: 'TEST 1 TEST 2',
  })
})
