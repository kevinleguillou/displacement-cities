import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Skybox from "Skybox/Skybox";
import DisplacementCity from "DisplacementCity/DisplacementCity";

export default class Logic{
	constructor(){
		this.scene = new THREE.Scene;
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight);
		this.camera.position.set(0, 0.25, 1);
		// this.camera.position.set(0.4, 1, 1.25);
		this.camera.lookAt(0, 0.5, 0);
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		document.body.appendChild(this.renderer.domElement);
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.target.set(0, 0.35, 0);
		this.controls.update();
		this.sceneObjects = [];

		window.addEventListener("resize", ()=>{ this.setSize(window.innerWidth, window.innerHeight); });
		this.setSize(window.innerWidth, window.innerHeight);

		this.startTime = new Date;

		const sky = new Skybox;
		this.registerObject(sky);
		const city = new DisplacementCity;
		this.registerObject(city);

		this.tick();
	}
	setSize(width, height){
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		let resizeCanvas = window.devicePixelRatio > 1 ? true : false;
		this.renderer.setSize(width, height, resizeCanvas);
	}
	registerObject(object){
		this.scene.add(object.meshGroup);
		if(object.tick) this.sceneObjects.push(object);
	}
	tick(){
		const elapsedTime = (Date.now() - this.startTime)/1000;
		this.renderer.render(this.scene, this.camera);
		this.sceneObjects.forEach(object=>{
			object.tick(elapsedTime);
		});
		window.requestAnimationFrame(()=>{
			this.tick()
		});
	}
}