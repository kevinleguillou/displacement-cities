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
	constructor(){
		const textureSize = 64;
		const precision = 4; // min 2
		const verticesCount = textureSize*precision;
		const geometry = new THREE.PlaneGeometry(1, 1, verticesCount, verticesCount);
		geometry.rotateX(-Math.PI/2);
		const material = cityMaterial;
		this.heightMapTranslation = new THREE.Vector2;
		material.uniforms.u_translation.value = this.heightMapTranslation;

		const model = new THREE.Mesh(geometry, material);
		this.meshGroup = new THREE.Group;
		this.meshGroup.add(model);
	}
	tick(time){
		let fractTime = time - Math.floor(time);
		fractTime = time/10;
		this.heightMapTranslation.set(fractTime, 0);
	}
}