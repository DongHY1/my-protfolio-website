import * as THREE from "three";
import earth from "@/assets/Home/earth-4k.jpg";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl";
import gsap from 'gsap'
export function initThree() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    //   添加抗锯齿
    antialias: true,
  });
  //   开启HIDPI设置:https://blog.skk.moe/post/hidpi-what-why-how/
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(innerWidth, innerHeight);
  const div = document.querySelector("#home");
  div.appendChild(renderer.domElement);
  //   创建一个球体
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      //   color: 0xff0000,
      vertexShader,
      fragmentShader,
      uniforms: {
        globeTexture: {
          value: new THREE.TextureLoader().load(earth),
        },
      },
      // map: new THREE.TextureLoader().load(earth),
    })
  );
  //   创建大气层
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
  );
  atmosphere.scale.set(1.1, 1.1, 1.1);
  scene.add(atmosphere);
  camera.position.z = 15;
  const group = new THREE.Group();
  group.add(sphere);
  scene.add(group);
  const mouse = {
    x: undefined,
    y: undefined,
  };
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // sphere.rotation.y += 0.001;
    // group.rotation.y = mouse.x*0.5;
    gsap.to(group.rotation,{
      x:-mouse.y*0.3,
      y:mouse.x*0.5,
      duration:2
    })
  }
  animate();
  addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = (event.clientX / innerHeight) * 2 - 1;
  });
}
