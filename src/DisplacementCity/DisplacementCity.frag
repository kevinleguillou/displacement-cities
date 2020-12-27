varying vec2 vUv;
varying vec3 displacedPosition;

uniform sampler2D u_colorMap;
uniform float u_displacementIntensity;

void main(){
	// Recomputes the normals of the displaced geometry
	vec3 normal = normalize(cross(dFdx(-displacedPosition), dFdy(-displacedPosition)));

	// Projects the texture according to direction the normals point to
	vec4 frontSideMap = step(0.5, abs(normal.z)) * texture2D(u_colorMap, vec2(vUv.x, displacedPosition.y));
	vec4 lateralSideMap = step(0.5, abs(normal.x)) * texture2D(u_colorMap, vec2(vUv.y, displacedPosition.y));
	vec4 color = frontSideMap + lateralSideMap;

	// Adds a Light pollution effect
	float lightPosition = displacedPosition.y / u_displacementIntensity;
	lightPosition = smoothstep(0., 0.25, lightPosition);
	vec4 lightColor = vec4(0.8, 0.5, 0.2, 1.);
	color = mix(lightColor, color, lightPosition);

	gl_FragColor = color;
}