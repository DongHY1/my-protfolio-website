import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  SphereGeometry,
  ShaderMaterial,
  Group,
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  Points,
  Raycaster,
  Vector2,
  BoxGeometry,
  MeshBasicMaterial,
  Matrix4,
  AdditiveBlending,
  BackSide,
  TextureLoader,
} from "three";
import earth from "../../assets/Home/earth-2k.webp";
import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl?raw";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl?raw";
import gsap from "gsap";
export function initThree() {
  const scene = new Scene();
  let camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 15;
  const renderer = new WebGLRenderer({
    //   添加抗锯齿
    antialias: true,
    canvas:document.querySelector("#home")
  });
  //   开启HIDPI设置:https://blog.skk.moe/post/hidpi-what-why-how/
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // const div = document.querySelector("#home");

  // div.appendChild(renderer.domElement);
  //   创建一个球体
  const sphere = new Mesh(
    new SphereGeometry(5, 50, 50),
    new ShaderMaterial({
      //   color: 0xff0000,
      vertexShader,
      fragmentShader,
      uniforms: {
        globeTexture: {
          value: new TextureLoader().load(earth),
        },
      },
      // map: new THREE.TextureLoader().load(earth),
    })
  );
  //   创建大气层
  const atmosphere = new Mesh(
    new SphereGeometry(5, 50, 50),
    new ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: AdditiveBlending,
      side: BackSide,
    })
  );
  atmosphere.scale.set(1.1, 1.1, 1.1);
  scene.add(atmosphere);
  const group = new Group();
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
  const starGeometry = new BufferGeometry();
  starGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(starVertices, 3)
  );
  const starMeterial = new PointsMaterial({ color: 0xffffff });
  const stars = new Points(starGeometry, starMeterial);
  scene.add(stars);
  // 添加地点
  getCountries(group, 5);
  // 旋转地球正确角度
  sphere.rotation.y = -Math.PI / 2;
  group.rotation.offset = {
    x: 0,
    y: 0,
  };
  const mouse = {
    x: 0,
    y: 0,
    xPrev: undefined,
    yPrev: undefined,
    down: false,
  };
  // 实现鼠标移入长方体发光效果
  const raycaster = new Raycaster();
  const pointer = new Vector2();
  // 拿到html元素
  const popUpEl = document.querySelector("#popUpEl");
  const countryEl = document.querySelector("#countryEl");
  const populationEl = document.querySelector("#populationEl");
  function animate() {
    requestAnimationFrame(animate);
    // renderer.render(scene, camera);
    // group.rotation.y += 0.002;
    // group.rotation.y = mouse.x*0.5;
    // gsap.to(group.rotation, {
    //   x: -mouse.y * 1.3,
    //   y: mouse.x * 1.5,
    //   duration: 2,
    // });
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer, camera);
    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects(
      group.children.filter((item) => {
        return item.geometry.type === "BoxGeometry";
      })
    );

    group.children.forEach((item) => {
      item.material.opacity = 0.4;
    });
    gsap.set(popUpEl, {
      display: "none",
    });
    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material.opacity = 1;
      gsap.set(popUpEl, {
        display: "block",
      });
      countryEl.innerHTML = intersects[i].object.country;
      populationEl.innerHTML = intersects[i].object.population;
    }
    renderer.render(scene, camera);
  }
  animate();
  // window.addEventListener("mousemove", (event) => {
  //   event.preventDefault();
  //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // });
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    gsap.set(popUpEl, {
      x: event.clientX,
      y: event.clientY,
      duration: 2,
    });
    if (mouse.down) {
      event.preventDefault();
      const deltaX = event.clientX - mouse.xPrev;
      const deltaY = event.clientY - mouse.yPrev;
      group.rotation.offset.x += deltaY * 0.005;
      group.rotation.offset.y += deltaX * 0.005;
      gsap.to(group.rotation, {
        x: group.rotation.offset.x,
        y: group.rotation.offset.y,
      });
      mouse.xPrev = event.clientX;
      mouse.yPrev = event.clientY;
    }
  });
  window.addEventListener("mousedown", ({ clientX, clientY }) => {
    mouse.down = true;
    mouse.xPrev = clientX;
    mouse.yPrev = clientY;
  });
  window.addEventListener("mouseup", () => {
    mouse.down = false;
  });
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
  });
  window.addEventListener('touchmove',(event)=>{
    event.clientX = event.touches[0].clientX
    event.clientY = event.touches[0].clientY
    const isIntersect = raycaster.intersectObject(sphere)
    if(isIntersect.length!==0)mouse.down = true
    if(mouse.down){
      const offset = document.querySelector('#home').getBoundingClientRect().top
      mouse.x = (event.clientX/innerWidth)*2-1
      mouse.y = -((event.clientY-offset)/innerHeight)*2+1
      gsap.set(popUpEl,{
        x:event.clientX,
        y:event.clientY
      })
      event.preventDefault()
      mouse.xPrev = event.clientX
      mouse.yPrev = event.clientY
    }
    
  },{passive:false})
  window.addEventListener('touchend',()=>{
    mouse.down = false
  })
}
async function getCountries(group, radius) {
  const countries = await fetch("http://159.75.0.182:3000/countries");
  const res = await countries.json();
  res.forEach((country) => {
    const scale = country.population / 100000000;
    const Xscale = scale * 0.02;
    const Yscale = scale * 0.02;
    const Zscale = scale * 0.8;
    const point = new Mesh(
      new BoxGeometry(
        Math.max(0.1, Xscale),
        Math.max(0.1, Yscale),
        Math.max(0.4, Zscale)
      ),
      new MeshBasicMaterial({
        color: "#47A3F5",
        opacity: 0.4,
        transparent: true,
      })
    );
    // 坐标转换 https://blog.csdn.net/ruangong1203/article/details/75994424
    const latitude = country.latlng[0];
    const longitude = country.latlng[1];
    const transformLatitude = (latitude / 180) * Math.PI;
    const transformLongitude = (longitude / 180) * Math.PI;
    const x =radius * Math.cos(transformLatitude) * Math.sin(transformLongitude);
    const y =radius * Math.sin(transformLatitude);
    const z =radius * Math.cos(transformLatitude) * Math.cos(transformLongitude);
    // 更新位置
    point.position.x = x;
    point.position.y = y;
    point.position.z = z;
    point.lookAt(0, 0, 0);
    point.geometry.applyMatrix4(new Matrix4().makeTranslation(0, 0, -0.4));
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
    point.country = country.name;
    point.population = new Intl.NumberFormat().format(country.population);
  });
}
