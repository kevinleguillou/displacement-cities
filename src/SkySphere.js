import * as THREE from "three";

const noiseTexture = new THREE.TextureLoader().load("assets/noise.png");
noiseTexture.magFilter = noiseTexture.minFilter = THREE.NearestFilter;

let u_gradientStop1 = new THREE.Color(0xc77c32);
u_gradientStop1 = new THREE.Vector3(u_gradientStop1.r, u_gradientStop1.g, u_gradientStop1.b);
let u_gradientStop2 = new THREE.Color(0x000000);
u_gradientStop2 = new THREE.Vector3(u_gradientStop2.r, u_gradientStop2.g, u_gradientStop2.b);

const skyMaterial = new THREE.ShaderMaterial({
	uniforms: {
		"u_gradientHeight": { value: 0.5 },
		"u_gradientStop1": { value: u_gradientStop1 },
		"u_gradientStop2": { value: u_gradientStop2 },
		"u_noisemap": { value: noiseTexture }
	},
	vertexShader: `
		varying vec2 boxCoords;
		void main(){
			boxCoords = position.xy;
			vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
			gl_Position = projectionMatrix * modelViewPosition;
		}
	`,
	fragmentShader: `
		varying vec2 boxCoords;
		uniform float u_gradientHeight;
		uniform vec3 u_gradientStop1;
		uniform vec3 u_gradientStop2;
		float easeOutQuad(float x){
			return 1. - (1. - x) * (1. - x);
		}
		void main(){
			float mixFactor = smoothstep(0., u_gradientHeight, boxCoords.y);
			vec3 gradient = mix(u_gradientStop1, u_gradientStop2, mixFactor);
			gl_FragColor = vec4(gradient, 1.);
		}
	`,
	side: THREE.BackSide
});

export default class SkySphere{
	constructor(){
		const geometry = new THREE.SphereGeometry(5, 8, 8);
		const material = skyMaterial;
		const model = new THREE.Mesh(geometry, material);
		const object = new THREE.Group;
		object.add(model);
		return object;
	}
}