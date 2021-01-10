import * as THREE from "three";
import fragmentShader from "./DisplacementCity.frag";
import vertexShader from "./DisplacementCity.vert";

const noiseTexture = new THREE.TextureLoader().load("assets/noise.png");
noiseTexture.magFilter = noiseTexture.minFilter = THREE.NearestFilter;
const skyscrappersTexture = new THREE.TextureLoader().load("assets/skyscrappers.jpg");

const cityMaterial = new THREE.ShaderMaterial({
	uniforms: {
		"u_displacementIntensity": { value: 1. },
		"u_displacementMap": { value: noiseTexture },
		"u_colorMap": { value: skyscrappersTexture },
		"u_planeRatio": { value: 1. },
		"u_translation": { value: new THREE.Vector2 }
	},
	vertexShader: vertexShader,
	fragmentShader: fragmentShader,
	extensions: {
		derivatives: true
	}
});

export default class DisplacementCity{
	constructor(controls){
		this.controls = controls;
		const textureSize = 64;
		const precision = 4; // min 2
		const verticesCount = textureSize*precision;
		const geometry = new THREE.PlaneGeometry(1, 1, verticesCount, verticesCount);
		geometry.rotateX(-Math.PI/2);
		this.material = cityMaterial;

		const model = new THREE.Mesh(geometry, this.material);
		this.meshGroup = new THREE.Group;
		this.meshGroup.add(model);
	}
	tick(){
		this.material.uniforms.u_translation.value.x = this.controls.translation;
		this.material.uniforms.u_displacementIntensity.value = this.controls.height;
	}
}