uniform sampler2D globeTexture; //uniform定义值：因为显卡的架构，所有线程的输入值必须统一，只读
varying vec2 vertexUV; //varying定义值：变化
varying vec3 vertexNormal;
void main(){
    // gl_FragColor = vec4(0.4,1,1,1);
    float intensity =1.05-dot(vertexNormal,vec3(0.0,0.0,1.0));
    vec3 atmosphere = vec3(0.3,0.6,1.0)*pow(intensity,1.5);
    gl_FragColor=vec4(atmosphere+texture2D(globeTexture,vertexUV).xyz,1.0);
}