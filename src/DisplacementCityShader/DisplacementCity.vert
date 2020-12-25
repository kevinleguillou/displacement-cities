varying vec2 vUv;
varying vec3 displacedPosition;

uniform sampler2D u_displacementMap;
uniform float u_displacementIntensity;

void main(){
	// Number of Repeats of the displacement map
	float repeats = 2.;
	vec2 scaledUV = fract(repeats * uv);
	// Displaces geometry Y according to the displacement map passed as uniform
	// We can also replace this part with a noise function,
	// or displace geometry as a one time operation outside the shader
	displacedPosition = position;
	displacedPosition.y = texture2D(u_displacementMap, scaledUV).x * u_displacementIntensity;
	// We pass the displaced vertex (displacedPosition) to the fragment shader to recompute the normals

	// The UVs are scaled according to the repeat value
	vUv = scaledUV;

	vec4 modelViewPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
	gl_Position = projectionMatrix * modelViewPosition;
}