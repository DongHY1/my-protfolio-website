uniform sampler2D globeTexture;
varying vec2 vertexUV;
void main(){
    // gl_FragColor = vec4(0.4,1,1,1);
    gl_FragColor=texture2D(globeTexture,vertexUV);
}