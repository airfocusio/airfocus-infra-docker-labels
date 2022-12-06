import { extractMetadata } from './metadata'

it('extractMetadata', async () => {
  const metadata = await extractMetadata(process.env.GITHUB_TOKEN || '', 'a55d822fdac3d2b4446217dc960a0d6cc217e412')
  expect(metadata).toEqual({
    'org.opencontainers.image.source': 'https://github.com/airfocusio/airfocus-infra-metadata',
    'org.opencontainers.image.revision': 'a55d822fdac3d2b4446217dc960a0d6cc217e412',
  })
})
