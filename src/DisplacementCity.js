import * as THREE from "three";
import fragmentShader from "DisplacementCityShader/DisplacementCity.frag";
import vertexShader from "DisplacementCityShader/DisplacementCity.vert";

const noiseTexture = new THREE.TextureLoader().load("assets/noise.png");
noiseTexture.magFilter = noiseTexture.minFilter = THREE.NearestFilter;
const skyscrappersTexture = new THREE.TextureLoader().load("assets/skyscrappers.jpg");

const cityMaterial = new THREE.ShaderMaterial({
	uniforms: {
		"u_displacementIntensity": { value: 0.5 },
		"u_displacementMap": { value: noiseTexture },
		"u_colorMap": { value: skyscrappersTexture },
	},
	vertexShader: vertexShader,
	fragmentShader: fragmentShader,
	extensions: {
		derivatives: true
	}
});

export default class DisplacementCity{
	constructor(){
		const geometry = new THREE.PlaneGeometry(1, 1, 64, 64);
		geometry.rotateX(-Math.PI/2);

		const material = cityMaterial;
		const model = new THREE.Mesh(geometry, material);

		const wireframe = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
			emissive: 0xFFFFFF,
			wireframe: true,
			displacementMap: noiseTexture,
			displacementScale: 0.5
		}));

		const object = new THREE.Group;
		object.add(model);
		// object.add(wireframe);
		return object;
	}
}