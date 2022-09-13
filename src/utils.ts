import { DiffusionSampler } from 'stability-sdk/gooseai/generation/generation_pb'

export const range = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const diffusionMap = {
  ddim: DiffusionSampler.SAMPLER_DDIM,
  plms: DiffusionSampler.SAMPLER_DDPM,
  k_euler: DiffusionSampler.SAMPLER_K_EULER,
  k_euler_ancestral: DiffusionSampler.SAMPLER_K_EULER_ANCESTRAL,
  k_heun: DiffusionSampler.SAMPLER_K_HEUN,
  k_dpm_2: DiffusionSampler.SAMPLER_K_DPM_2,
  k_dpm_2_ancestral: DiffusionSampler.SAMPLER_K_DPM_2_ANCESTRAL,
  k_lms: DiffusionSampler.SAMPLER_K_LMS,
}
