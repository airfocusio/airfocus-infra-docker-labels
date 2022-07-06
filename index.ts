import * as core from '@actions/core'
import * as github from '@actions/github'
import { extractMetadata } from './metadata'

async function run() {
  const token = core.getInput('github-token')
  const metadata = await extractMetadata(token, github.context.payload?.head_commit?.id)
  core.setOutput('metadata', metadata)
  console.log(`Metadata:\n${JSON.stringify(metadata, undefined, 2)}`)
}
run().catch(err => core.setFailed(err.message))
