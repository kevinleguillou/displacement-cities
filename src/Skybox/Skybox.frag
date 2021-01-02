varying vec2 boxCoords;
varying vec2 vUv;

uniform vec3 u_gradientStop1;
uniform vec3 u_gradientStop2;
uniform sampler2D u_noisemap;

void main(){
	// Paints a gradient from the bottom of the box to half height
	float mixFactor = smoothstep(-1., 0., boxCoords.y*2.);
	vec3 gradient = mix(u_gradientStop1, u_gradientStop2, mixFactor);
	// Pick a random value in the middle row of the noise map
	float randomIntensity = texture2D(u_noisemap, vec2(fract(vUv.x*2.), 0.5)).r;

	float noiseMix = 0.5;
	randomIntensity = randomIntensity*noiseMix + (1.-noiseMix);
	float isWithinGradient = step(-0.99, boxCoords.y*2.) * abs(step(0., boxCoords.y*2.) - 1.);
	gradient = (isWithinGradient * randomIntensity * gradient) + (abs(isWithinGradient - 1.) * gradient);

	gl_FragColor = vec4(gradient, 1.);
}