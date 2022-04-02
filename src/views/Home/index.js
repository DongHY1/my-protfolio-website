import * as THREE from "three";
import earth from "@/assets/Home/earth-4k.jpg";
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
    new THREE.MeshBasicMaterial({
      //   color: 0xff0000,
      map: new THREE.TextureLoader().load(earth),
    })
  );
  scene.add(sphere);
  camera.position.z = 15;
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
