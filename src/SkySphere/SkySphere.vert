varying vec2 boxCoords;
varying vec2 vUv;

void main(){
	vUv = uv;
	boxCoords = position.xy;
	
	vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
	gl_Position = projectionMatrix * modelViewPosition;
}