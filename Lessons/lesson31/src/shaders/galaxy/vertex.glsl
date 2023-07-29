uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute vec3 aRandomness;
varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0) ;

    // Angle
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCentre = length(modelPosition.xz);
    float angleOffset= (1.0/distanceToCentre)*uTime*0.2;
    angle += angleOffset;

    modelPosition.x = cos(angle) * distanceToCentre;
    modelPosition.z = sin(angle) * distanceToCentre;

    //  Randomness
    modelPosition.xyz += aRandomness;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition ;

    gl_Position = projectionPosition;

    // Size
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Color
    vColor = color;
}