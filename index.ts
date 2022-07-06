import * as core from '@actions/core'
import { extractMetadata } from './metadata'

async function run() {
  const metadata = await extractMetadata()
  core.setOutput('metadata', metadata)
  console.log(`Metadata:\n${JSON.stringify(metadata, undefined, 2)}`)
}
run().catch(err => core.setFailed(err.message))
