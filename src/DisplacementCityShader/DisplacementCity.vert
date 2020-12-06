varying vec2 vUv;
varying vec3 displacedPosition;

uniform sampler2D u_displacementMap;
uniform float u_displacementIntensity;

void main(){
	vUv = uv;
	// Displaces geometry Y according to the displacement map passed as uniform
	// We can also replace this part with a noise function,
	// or displace geometry as a one time operation outside the shader
	displacedPosition = position;
	displacedPosition.y = texture2D(u_displacementMap, uv).x * u_displacementIntensity;
	// We pass the vertex to the fragment shader to recompute normals

	vec4 modelViewPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
	gl_Position = projectionMatrix * modelViewPosition;
}