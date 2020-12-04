import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import DisplacementCity from "DisplacementCity";

export default class Logic{
	constructor(){
		this.scene = new THREE.Scene;
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight);
		this.camera.position.set(0, 1, 2);
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		document.body.appendChild(this.renderer.domElement);
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);

		window.addEventListener("resize", ()=>{ this.setSize(window.innerWidth, window.innerHeight); });
		this.setSize(window.innerWidth, window.innerHeight);

		const debugCube = new DisplacementCity;
		this.scene.add(debugCube);

		this.tick();
	}
	setSize(width, height){
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		let resizeCanvas = window.devicePixelRatio > 1 ? true : false;
		this.renderer.setSize(width, height, resizeCanvas);
	}
	tick(){
		this.renderer.render(this.scene, this.camera);
		window.requestAnimationFrame(()=>{ this.tick() });
	}
}