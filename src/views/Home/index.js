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
  createPoint(35, 103, 5, group);
  createPoint(-14, -52, 5, group);
  createPoint(20, 78, 5, group);
  // 旋转地球正确角度
  sphere.rotation.y = -Math.PI / 2;
  const mouse = {
    x: 0,
    y: 0,
  };
  // 实现鼠标移入长方体发光效果
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    group.rotation.y += 0.002;
    // group.rotation.y = mouse.x*0.5;
    // gsap.to(group.rotation, {
    //   x: -mouse.y * 1.3,
    //   y: mouse.x * 1.5,
    //   duration: 2,
    // });
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer, camera);
    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects(group.children.filter((item)=>{
      return item.geometry.type === 'BoxGeometry'
    }));

    group.children.forEach((item) => {
      item.material.opacity = 0.4;
    });
    for (let i = 0; i < intersects.length; i++) {
      console.log("gogo")
      intersects[i].object.material.opacity = 1;
    }
    renderer.render(scene, camera);
  }
  animate();
  window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientX / window.innerHeight) * 2 + 1;
  });
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });
}
/**
 *
 * @param {*} latitude 纬度 N为正
 * @param {*} longitude 经度 E为正
 * @param {*} radius 球体半径
 * @param {*} group 分组
 */
function createPoint(latitude, longitude, radius, group) {
  const point = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.8),
    new THREE.MeshBasicMaterial({
      color: "#47A3F5",
      opacity: 0.4,
      transparent: true,
    })
  );
  // 坐标转换
  const transformLatitude = (latitude / 180) * Math.PI;
  const transformLongitude = (longitude / 180) * Math.PI;
  const x = radius * Math.cos(transformLatitude) * Math.sin(transformLongitude);
  const y = radius * Math.sin(transformLatitude);
  const z = radius * Math.cos(transformLatitude) * Math.cos(transformLongitude);
  // 更新位置
  point.position.x = x;
  point.position.y = y;
  point.position.z = z;
  point.lookAt(0, 0, 0);
  point.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, -0.4));
  // 添加坐标
  // 生长动画
  gsap.to(point.scale, {
    z: 0,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: "linear",
    delay: Math.random(),
  });
  group.add(point);
}
