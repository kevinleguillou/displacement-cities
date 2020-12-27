varying vec2 vUv;
// We pass the displaced vertex (displacedPosition) to the fragment shader to recompute the normals
varying vec3 displacedPosition;

uniform sampler2D u_displacementMap;
uniform float u_displacementIntensity;
uniform vec2 u_translation;

void main(){
	// Number of Repeats of the displacement map
	vec2 transformedUV = fract(uv + u_translation);
	// Displaces geometry Y according to the displacement map passed as uniform
	// We can also replace this part with a noise function,
	// or displace geometry as a one time operation outside the shader
	displacedPosition = position;
	displacedPosition.y = texture2D(u_displacementMap, transformedUV).r * u_displacementIntensity;
	// We clamp the edges to 0 displacement to have a clean stop
	displacedPosition.y *= smoothstep(0., 0.01, abs(distance(uv.x, 0.5)*2. - 1.));
	displacedPosition.y *= smoothstep(0., 0.01, abs(distance(uv.y, 0.5)*2. - 1.));

	vUv = transformedUV;

	vec4 modelViewPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
	gl_Position = projectionMatrix * modelViewPosition;
}