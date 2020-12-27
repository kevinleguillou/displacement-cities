import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import SkySphere from "SkySphere";
import DisplacementCity from "DisplacementCity/DisplacementCity";

export default class Logic{
	constructor(){
		this.scene = new THREE.Scene;
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight);
		this.camera.position.set(0, 0.65, 1.25);
		this.camera.lookAt(0, 0.5, 0);
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		document.body.appendChild(this.renderer.domElement);
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.target.set(0, 0.35, 0);
		this.controls.update();
		this.objectTicks = [];

		window.addEventListener("resize", ()=>{ this.setSize(window.innerWidth, window.innerHeight); });
		this.setSize(window.innerWidth, window.innerHeight);

		const sky = new SkySphere;
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
		if(object.tick) this.objectTicks.push(object.tick);
	}
	tick(){
		this.renderer.render(this.scene, this.camera);

		this.objectTicks.forEach(tick=>{
			tick();
		});
		window.requestAnimationFrame(()=>{
			this.tick()
		});
	}
}