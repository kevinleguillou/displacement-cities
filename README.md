# Displacement Cities

Generating a cityscape from a 2D noise pattern.

## Generating the city mesh by interpreting the pattern as a heightmap

We create simple plane with subdivisions higher or equal to the noise pattern width in pixels.

## Apply a patchwork texture of city buildings

The main issue here is to correctly project the texture on the displaced geometry, since the regular UVs would just stretch the texture. We define a specific projection in the fragment shader that assumes a side projection.