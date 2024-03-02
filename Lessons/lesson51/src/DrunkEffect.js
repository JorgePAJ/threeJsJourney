import { Effect } from "postprocessing";
import { Uniform } from "three";
import { BlendFunction } from "postprocessing";

const fragmentShader = /* glsl */ `
    uniform float frequency;
    uniform float amplitude;
    uniform float offset;

    void mainUv(inout vec2 uv)
    {
        uv.y += sin(uv.x * frequency + offset) * amplitude;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        vec4 color = vec4(0.8,1.0,0.5,inputColor.a);
        outputColor =  color;
    }
`;

export default class DrunkEffect extends Effect {
  constructor({
    frequency = 2.0,
    amplitude = 0.1,
    blendFunction = BlendFunction.DARKEN,
  }) {
    super("DrunkEffect", fragmentShader, {
      blendFunction: blendFunction,
      uniforms: new Map([
        ["frequency", new Uniform(frequency)],
        ["amplitude", new Uniform(amplitude)],
        ["offset", new Uniform(0.0)],
      ]),
    });
  }

  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get("offset").value += deltaTime;
  }
}