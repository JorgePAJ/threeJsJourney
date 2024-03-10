#include ../includes/random2D.glsl
#include <skinning_pars_vertex>
#include <common>

varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;

void main(){
    #include <skinbase_vertex>
    #include <begin_vertex>
    #include <beginnormal_vertex>
    #include <defaultnormal_vertex>
    #include <skinning_vertex>
    #include <project_vertex>

    // Model position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 mdPosition = viewMatrix * modelPosition;

    // Model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);


    // Glitch
    float glitchTime = uTime - modelPosition.y;
    float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime *8.76);
    glitchStrength /= 3.0;
    glitchStrength = smoothstep(0.3,1.0,glitchStrength);
glitchStrength *= 0.15; 
mvPosition.x += random2D((mvPosition.xy + uTime) -0.5) * glitchStrength;
mvPosition.z += random2D((mvPosition.zx + uTime) -0.5) * glitchStrength;

// Apply similar effect to normals
vec3 glitchedNormal = normal;
glitchedNormal.x += random2D((glitchedNormal.xy + uTime) -0.5) * glitchStrength;
glitchedNormal.z += random2D((glitchedNormal.zx + uTime) -0.5) * glitchStrength;
glitchedNormal = normalize(glitchedNormal);



// Final position
vNormal = normalize(normalMatrix * normal);
vPosition = vec3(viewMatrix * vec4(position, 1.0));


gl_Position = projectionMatrix * mvPosition;

    // Varyings
    vPosition = modelPosition.xyz * glitchedNormal;
    vNormal = modelNormal.xyz * glitchedNormal;
}