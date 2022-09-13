# Stability TS
A TypeScript client for the Stability AI SDK.

[Requires an API Key for DreamStudio which can be found here.](https://beta.dreamstudio.ai/membership)

## Installation
```sh
# NPM
npm i -g stability-ts

# To Update
npm update -g stability-ts

# Yarn
yarn global add stability-ts
```

## Example
```sh
stability \
  -s 150 \ # Steps
  -c 15 \ # Cfg Scale
  -a k_euler_ancestral \ # Diffusion Method
  -S 3465383516 \ # Seed
  -o ./examples \ # Output Directory
  -n 5 \ # 5 images
  "a anime still of an highly detailed night cyberpunk city life, bladerunner style!! detailed shops, neon lights, ray tracing, advertising everywhere, people and robots walking around. art by satoshi kon and studio ghibli, in the style of ghost in the shell, muted colours, hyperrealism, cinematic lighting, lush detail, award winning, wlop, octane render, trending on artstation" 
```

### Output
|<img src="https://i.imgur.com/m6k9u4t.png" width="100%">|<img src="https://i.imgur.com/tV23Lu2.png" width="100%">|<img src="https://i.imgur.com/YTlhfij.png" width="100%">|<img src="https://i.imgur.com/HMmbbZN.png" width="100%">|<img src="https://i.imgur.com/26oPc6k.png" width="100%">|
|---|---|---|---|---|

***

## API
```ts
import { generate } from 'stability-ts'

const api = generate({
  prompt: 'A Stunning House',
  apiKey: process.env.DREAMSTUDIO_API_KEY,
})

api.on('image', ({ buffer, filePath }) => {
  console.log('Image', buffer, filePath)
})

api.on('end', (data) => {
  console.log('Generating Complete', data)
})
```

Async/Promise API
```ts
import { generateAsync } from 'stability-ts'

try {
  const { res, images } = await generateAsync({
    prompt: 'A Stunning House',
    apiKey: process.env.DREAMSTUDIO_API_KEY,
  })
  console.log(images)
} catch (e) {
  // ...
}
```

## CLI
```sh
Usage: stability [options] [prompt]

Generate an image

Arguments:
  prompt                           The text prompt you want to use

Options:
  -V, --version                    output the version number
  -H, --height <height>            height of image (default: 512)
  -W, --width <width>              width of image (default: 512)
  -c, --cfg_scale <scale>          CFG scale factor (default: 7)
  -a, --sampler <sampler>          Diffusion Method (choices: "ddim", "plms", "k_euler", "k_euler_ancestral", "k_heun", "k_dpm_2", "k_dpm_2_ancestral", "k_lms", default: "k_lms")
  -s, --steps <steps>              number of steps (default: 50)
  -S, --seed <seed>                random seed to use (default: 1614811539)
  -n, --num_samples <num_samples>  number of samples to generate (default: 1)
  -e, --engine <engine>            engine to use for inference (default: "stable-diffusion-v1")
  --no-store                       do not write aritfacts to disk
  -k, --api-key <api-key>          DreamStudio API Key (env: DREAMSTUDIO_API_KEY)
  -o, --output-dir <outputDir>     directory to store images (default: "/Users/jacobkelley/code/stability-ts")
  -d, --debug                      Additional logging
  -h, --help                       display help for command
```

## Developing
```
nvm use
yarn
yarn build

npm link

export DREAMSTUDIO_API_KEY=...

stability "A stunning house"
```
