import * as THREE from "three";
import vertexShader from "./SkySphere.vert";
import fragmentShader from "./SkySphere.frag";

const noiseTexture = new THREE.TextureLoader().load("assets/noise.png");
noiseTexture.magFilter = noiseTexture.minFilter = THREE.NearestFilter;

let u_gradientStop1 = new THREE.Color(0xc77c32);
u_gradientStop1 = new THREE.Vector3(u_gradientStop1.r, u_gradientStop1.g, u_gradientStop1.b);
let u_gradientStop2 = new THREE.Color(0x000000);
u_gradientStop2 = new THREE.Vector3(u_gradientStop2.r, u_gradientStop2.g, u_gradientStop2.b);

const skyMaterial = new THREE.ShaderMaterial({
	uniforms: {
		"u_gradientStop1": { value: u_gradientStop1 },
		"u_gradientStop2": { value: u_gradientStop2 },
		"u_noisemap": { value: noiseTexture }
	},
	vertexShader: vertexShader,
	fragmentShader: fragmentShader,
	side: THREE.BackSide
});

export default class SkySphere{
	constructor(){
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = skyMaterial;
		const model = new THREE.Mesh(geometry, material);
		model.translateY(0.49);
		this.meshGroup = new THREE.Group;
		this.meshGroup.add(model);
	}
}