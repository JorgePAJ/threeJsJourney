(()=>{const e=new THREE.Scene,n=new THREE.BoxGeometry(1,1,1),E=new THREE.MeshBasicMaterial({color:"#e3bfd4"}),a=new THREE.Mesh(n,E);e.add(a);const c=new THREE.PerspectiveCamera(75,800/600);e.add(c),c.position.z=3;const o=document.querySelector("canvas.webgl"),r=new THREE.WebGLRenderer({canvas:o});r.setSize(800,600),r.render(e,c)})();
//# sourceMappingURL=bundle.910d7df5d4392fbb.js.map