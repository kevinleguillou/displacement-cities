import * as THREE from "three";

export default class DisplacementCity{
	constructor(){
		const geometry = new THREE.PlaneGeometry(1, 1, 64, 64);
		geometry.rotateX(-Math.PI/2);
		const noiseTexture = new THREE.TextureLoader().load("assets/noise.png");
		noiseTexture.magFilter = THREE.NearestFilter;
		noiseTexture.minFilter = THREE.NearestFilter;
		const material = new THREE.MeshStandardMaterial({ emissiveMap: noiseTexture, emissive: 0xFFFFFF, displacementMap: noiseTexture, displacementScale: 0.5 });
		const model = new THREE.Mesh(geometry, material);

		const wireframe = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({wireframe: true}));

		const object = new THREE.Group;
		object.add(model);
		//object.add(wireframe);
		return object;
	}
}