#! /usr/bin/env node
import * as dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import { Command } from 'commander'
import { sync as readPackageUpSync } from 'read-pkg-up'
import { stability } from '.'

const token = process.env.DREAMSTUDIO_API_KEY
if (!token) throw new Error('export DREAMSTUDIO_API_KEY is required')

const res = readPackageUpSync({
  cwd: __dirname,
})
if (!res) process.exit(0)

const pkg = res.packageJson
// @ts-ignore
const name = Object.keys(pkg.bin)[0]

const cli = new Command()
  .name(name)
  .description(String(pkg.description))
  .version(pkg.version)

cli
  .description('Generate an image')
  .argument('<prompt>', 'The text prompt you want to use')
  .action((prompt, opts) => {
    console.log({
      prompt,
      opts,
    })

    const api = stability({
      prompt,
      outDir: path.join(process.cwd(), '.out'),
      token,
    })

    api.on('image', ({ filePath }) => {
      console.log('Image', filePath)
    })
  })
  .parse()
