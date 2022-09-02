#! /usr/bin/env node
import * as dotenv from 'dotenv'
dotenv.config()
import { Command, Option, InvalidArgumentError } from 'commander'
import { sync as readPackageUpSync } from 'read-pkg-up'
import { generate } from './index'
import { diffusionMap, range } from './utils'

const res = readPackageUpSync({
  cwd: __dirname,
})

const pkg = res?.packageJson ?? {
  bin: { stability: '' },
  description: '',
  version: '',
}

const name = Object.keys(pkg.bin ?? {})[0]

const parseCommanderInt = (value: string | number) => {
  if (typeof value === 'number') return value
  const parsedValue = parseInt(value, 10)
  if (isNaN(parsedValue)) throw new InvalidArgumentError('Not a number.')
  return parsedValue
}

const cli = new Command()
  .name(name)
  .description(String(pkg.description))
  .version(pkg.version)

cli
  .description('Generate an image')
  .argument('[prompt]', 'The text prompt you want to use')

  .option('-H, --height <height>', 'height of image', parseCommanderInt, 512)
  .option('-W, --width <width>', 'width of image', parseCommanderInt, 512)
  .option('-c, --cfg_scale <scale>', 'CFG scale factor', parseCommanderInt, 7)
  .addOption(
    new Option('-a, --sampler <sampler>', 'Diffusion Method')
      .choices(Object.keys(diffusionMap))
      .default('k_lms')
  )
  .option('-s, --steps <steps>', 'number of steps', parseCommanderInt, 50)
  .option(
    '-S, --seed <seed>',
    'random seed to use',
    parseCommanderInt,
    range(0, 4294967295)
  )

  .option(
    '-n, --num_samples <num_samples>',
    'number of samples to generate',
    parseCommanderInt,
    1
  )
  .option(
    '-e, --engine <engine>',
    'engine to use for inference',
    'stable-diffusion-v1'
  )
  .option('--no-store', 'do not write aritfacts to disk')

  .addOption(
    new Option('-k, --api-key <api-key>', 'DreamStudio API Key').env(
      'DREAMSTUDIO_API_KEY'
    )
  )

  .option(
    '-o, --output-dir <outputDir>',
    'directory to store images',
    process.cwd()
  )
  .option('-d, --debug', 'Additional logging')

  .action((prompt, opts) => {
    if (!opts.apiKey) {
      console.error(
        'A DREAMSTUDIO_API_KEY is required to be exported. You can find yours here: https://beta.dreamstudio.ai/membership'
      )
      process.exit(1)
    }
    const stabilityOpts = {
      prompt,
      engine: opts.engine,
      seed: opts.seed,
      width: opts.width,
      height: opts.height,
      diffusion: opts.sampler,
      steps: opts.steps,
      cfgScale: opts.cfg_scale,
      samples: opts.num_samples,
      outDir: opts.outputDir,
      apiKey: opts.apiKey,
      debug: Boolean(opts.debug),
      noStore: Boolean(opts.noStore),
    }

    const api = generate(stabilityOpts)

    api.on('image', ({ filePath }) => {
      console.log('Image', filePath)
    })

    api.on('end', ({ isOk, status, message }) => {
      if (!isOk) console.error(`[stability] ${status}: ${message}`)
    })
  })
  .parse()
