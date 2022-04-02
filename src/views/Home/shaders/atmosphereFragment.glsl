varying vec3 vertexNormal;
void main(){
    // gl_FragColor = vec4(0.4,1,1,1);
    float intensity =pow(0.9-dot(vertexNormal,vec3(0,0,1.0)),2.0);
    gl_FragColor=vec4(0.3,0.6,0.9,1.0)*intensity;
}