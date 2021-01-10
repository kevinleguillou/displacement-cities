![A cityscape generated using the Displacement Cities project](https://github.com/kevinleguillou/displacement-cities/blob/develop/assets/banner.jpg)

[Test here ! 🌆][https://kevinleguillou.github.io/displacement-cities/index.html]

# Displacement Cities

Generating a cityscape from a 2D noise pattern.

Inspired by [/u/ckinggfx on /r/Blender](https://www.reddit.com/r/blender/comments/k05280/sprawling_city_from_a_single_plane/).

## Generating the city mesh by interpreting a noise pattern as a heightmap

We create simple plane with subdivisions higher or equal to the [noise pattern](https://github.com/kevinleguillou/displacement-cities/blob/develop/assets/noise.png) width in pixels.

## Apply a patchwork texture of city buildings

The main issue here is to correctly project [the texture](https://github.com/kevinleguillou/displacement-cities/blob/develop/assets/skyscrappers.jpg) on the displaced geometry, since the regular UVs would just stretch the texture. We define a specific projection in the [fragment shader](https://github.com/kevinleguillou/displacement-cities/blob/develop/src/DisplacementCity/DisplacementCity.frag) that assumes a side projection.