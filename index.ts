import { grpc } from '@improbable-eng/grpc-web'
import { GenerationService } from 'stability-sdk/src/js/generation_pb_service'
import {
  Request,
  Prompt,
  ImageParameters,
  SamplerParameters,
  TransformType,
  DiffusionSampler,
  // ArtifactType,
  StepParameter,
  // Artifact,
  ClassifierParameters,
} from 'stability-sdk/src/js/generation_pb'
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport'
import uuid4 from 'uuid4'

const range = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

// const svc = new GenerationService();
const host = 'https://grpc.stability.ai:443'
const engineId = 'stable-diffusion-v1'
const requestId = uuid4()
const seed = range(0, 4294967295)
const width = 512
const height = 512
const promptText = 'A stunning house'
const diffusion = DiffusionSampler.SAMPLER_K_LMS
const steps = 50
const cfgScale = 7
const samples = 1
const debug = true

/** Begin Stuff */
const request = new Request()
request.setEngineId(engineId)
request.setRequestId(requestId)

const prompt = new Prompt()
prompt.setText(promptText)
request.addPrompt(prompt)

const image = new ImageParameters()
image.setWidth(width)
image.setHeight(height)
image.setSeedList([seed])
image.setSteps(steps)
image.setSamples(samples)

const transform = new TransformType()
transform.setDiffusion(diffusion)
image.setTransform(transform)

const step = new StepParameter()
step.setScaledStep(0)

const sampler = new SamplerParameters()
sampler.setCfgScale(cfgScale)
step.setSampler(sampler)

image.addParameters(step)

request.setImage(image)

const classifier = new ClassifierParameters()
request.setClassifier(classifier)

console.log('REQUEST', JSON.stringify(request.toObject(), null, 2))

grpc.invoke(GenerationService.Generate, {
  request,
  host,
  transport: NodeHttpTransport(),
  onEnd: (code, message, trailers) => {
    console.log('onEnd', {
      status: grpc.Code[code],
      code,
      message,
      trailers,
    })
  },
  debug,
})

// const getBookRequest = new GetBookRequest();
// getBookRequest.setIsbn(60929871);
// grpc.unary(BookService.GetBook, {
//   request: getBookRequest,
//   host: host,
//   onEnd: res => {
//     const { status, statusMessage, headers, message, trailers } = res;
//     if (status === grpc.Code.OK && message) {
//       console.log("all ok. got book: ", message.toObject());
//     }
//   }
// });
