import * as THREE from "three";
import earth from "@/assets/Home/earth-4k.jpg";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl";
import gsap from "gsap";
export function initThree() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  );
  camera.position.z = 15;
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
  const group = new THREE.Group();
  group.add(sphere);
  scene.add(group);
  // 星空背景
  const starVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -(Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  const starMeterial = new THREE.PointsMaterial({ color: 0xffffff });
  const stars = new THREE.Points(starGeometry, starMeterial);
  scene.add(stars);
  // 添加地点
  createPoint(35,103,5,group)
  createPoint(-14,-52,5,group)
  createPoint(20,78,5,group)
  // 旋转地球正确角度
  sphere.rotation.y = -Math.PI/2
  const mouse = {
    x: undefined,
    y: undefined,
  };
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // sphere.rotation.y += 0.001;
    // group.rotation.y = mouse.x*0.5;
    gsap.to(group.rotation, {
      x: -mouse.y * 1.3,
      y: mouse.x * 1.5,
      duration: 2,
    });
  }
  animate();
  addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = (event.clientX / innerHeight) * 2 - 1;
  });
}
/**
 *
 * @param {*} latitude 纬度 N为正
 * @param {*} longitude 经度 E为正
 * @param {*} radius 球体半径
 * @param {*} group 分组
 */
function createPoint(latitude, longitude,radius,group) {
  const point = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 50, 50),
    new THREE.MeshBasicMaterial({
      color: "#ff0000",
    })
  );
  // 坐标转换
  const transformLatitude = (latitude / 180) * Math.PI;
  const transformLongitude = (longitude / 180) * Math.PI;
  const x = radius * Math.cos(transformLatitude) * Math.sin(transformLongitude);
  const y = radius * Math.sin(transformLatitude);
  const z = radius * Math.cos(transformLatitude) * Math.cos(transformLongitude);
  // 更新位置
  point.position.x = x
  point.position.y = y
  point.position.z = z
  // 添加坐标
  group.add(point)
}
