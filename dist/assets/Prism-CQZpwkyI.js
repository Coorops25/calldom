import{a as se,j as ze}from"./vendor-react-lSmCTsfu.js";import{R as Ue,T as qe,P as We,M as Ne}from"./vendor-ogl-DTxvmtLW.js";const Xe=({height:z=3.5,baseWidth:U=5.5,animationType:f="rotate",glow:q=1,offset:S={x:0,y:0},noise:W=.5,transparent:H=!0,scale:N=3.6,hueShift:Y=0,colorFrequency:j=1,hoverStrength:G=2,inertia:X=.05,bloom:V=1,suspendWhenOffscreen:P=!1,timeScale:Z=.5})=>{const D=se.useRef(null);return se.useEffect(()=>{const i=D.current;if(!i)return;const b=Math.max(.001,z),I=Math.max(.001,U)*.5,ie=Math.max(0,q),k=Math.max(0,W),re=S?.x??0,ce=S?.y??0,le=H?1.5:1,y=Math.max(.001,N),ue=Y||0,fe=Math.max(0,j||1),me=Math.max(0,V||1),ve=1,he=1,de=1,g=Math.max(0,Z||1),Q=Math.max(0,G||1),J=Math.max(0,Math.min(1,X||.12)),A=Math.min(2,window.devicePixelRatio||1),F=new Ue({dpr:A,alpha:H,antialias:!1}),o=F.gl;o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.BLEND),Object.assign(o.canvas.style,{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block"}),i.appendChild(o.canvas);const xe=`
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `,we=`
      precision highp float;

      uniform vec2  iResolution;
      uniform float iTime;

      uniform float uHeight;
      uniform float uBaseHalf;
      uniform mat3  uRot;
      uniform int   uUseBaseWobble;
      uniform float uGlow;
      uniform vec2  uOffsetPx;
      uniform float uNoise;
      uniform float uSaturation;
      uniform float uScale;
      uniform float uHueShift;
      uniform float uColorFreq;
      uniform float uBloom;
      uniform float uCenterShift;
      uniform float uInvBaseHalf;
      uniform float uInvHeight;
      uniform float uMinAxis;
      uniform float uPxScale;
      uniform float uTimeScale;

      vec4 tanh4(vec4 x){
        vec4 e2x = exp(2.0*x);
        return (e2x - 1.0) / (e2x + 1.0);
      }

      float rand(vec2 co){
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float sdOctaAnisoInv(vec3 p){
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
        float m = q.x + q.y + q.z - 1.0;
        return m * uMinAxis * 0.5773502691896258;
      }

      float sdPyramidUpInv(vec3 p){
        float oct = sdOctaAnisoInv(p);
        float halfSpace = -p.y;
        return max(oct, halfSpace);
      }

      mat3 hueRotation(float a){
        float c = cos(a), s = sin(a);
        mat3 W = mat3(
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114
        );
        mat3 U = mat3(
           0.701, -0.587, -0.114,
          -0.299,  0.413, -0.114,
          -0.300, -0.588,  0.886
        );
        mat3 V = mat3(
           0.168, -0.331,  0.500,
           0.328,  0.035, -0.500,
          -0.497,  0.296,  0.201
        );
        return W + U * c + V * s;
      }

      void main(){
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;

        float z = 5.0;
        float d = 0.0;

        vec3 p;
        vec4 o = vec4(0.0);

        float centerShift = uCenterShift;
        float cf = uColorFreq;

        mat2 wob = mat2(1.0);
        if (uUseBaseWobble == 1) {
          float t = iTime * uTimeScale;
          float c0 = cos(t + 0.0);
          float c1 = cos(t + 33.0);
          float c2 = cos(t + 11.0);
          wob = mat2(c0, c1, c2, c0);
        }

        const int STEPS = 100;
        for (int i = 0; i < STEPS; i++) {
          p = vec3(f, z);
          p.xz = p.xz * wob;
          p = uRot * p;
          vec3 q = p;
          q.y += centerShift;
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
          z -= d;
          o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
        }

        o = tanh4(o * o * (uGlow * uBloom) / 1e5);

        vec3 col = o.rgb;
        float n = rand(gl_FragCoord.xy + vec2(iTime));
        col += (n - 0.5) * uNoise;
        col = clamp(col, 0.0, 1.0);

        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);

        if(abs(uHueShift) > 0.0001){
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
        }

        gl_FragColor = vec4(col, o.a);
      }
    `,pe=new qe(o),L=new Float32Array(2),O=new Float32Array(2),r=new We(o,{vertex:xe,fragment:we,uniforms:{iResolution:{value:L},iTime:{value:0},uHeight:{value:b},uBaseHalf:{value:I},uUseBaseWobble:{value:1},uRot:{value:new Float32Array([1,0,0,0,1,0,0,0,1])},uGlow:{value:ie},uOffsetPx:{value:O},uNoise:{value:k},uSaturation:{value:le},uScale:{value:y},uHueShift:{value:ue},uColorFreq:{value:fe},uBloom:{value:me},uCenterShift:{value:b*.25},uInvBaseHalf:{value:1/I},uInvHeight:{value:1/b},uMinAxis:{value:Math.min(I,b)},uPxScale:{value:1/((o.drawingBufferHeight||1)*.1*y)},uTimeScale:{value:g}}}),Me=new Ne(o,{geometry:pe,program:r}),K=()=>{const e=i.clientWidth||1,a=i.clientHeight||1;F.setSize(e,a),L[0]=o.drawingBufferWidth,L[1]=o.drawingBufferHeight,O[0]=re*A,O[1]=ce*A,r.uniforms.uPxScale.value=1/((o.drawingBufferHeight||1)*.1*y)},$=new ResizeObserver(K);$.observe(i),K();const s=new Float32Array(9),ee=(e,a,n,t)=>{const l=Math.cos(e),d=Math.sin(e),E=Math.cos(a),w=Math.sin(a),p=Math.cos(n),M=Math.sin(n),Ie=l*p+d*w*M,ye=-l*M+d*w*p,Ae=d*E,Fe=E*M,Le=E*p,Oe=-w,Ce=-d*p+l*w*M,_e=d*M+l*w*p,Te=l*E;return t[0]=Ie,t[1]=Fe,t[2]=Ce,t[3]=ye,t[4]=Le,t[5]=_e,t[6]=Ae,t[7]=Oe,t[8]=Te,t},Se=k<1e-6;let u=0;const be=performance.now(),R=()=>{u||(u=requestAnimationFrame(ne))},te=()=>{u&&(cancelAnimationFrame(u),u=0)},x=()=>Math.random(),ge=(.3+x()*.6)*ve,Re=(.2+x()*.7)*he,Be=(.1+x()*.5)*de,Ee=x()*Math.PI*2,He=x()*Math.PI*2;let m=0,v=0,h=0,C=0,_=0;const T=(e,a,n)=>e+(a-e)*n,c={x:0,y:0,inside:!0},Pe=e=>{const a=Math.max(1,window.innerWidth),n=Math.max(1,window.innerHeight),t=(e.clientX-a*.5)/(a*.5),l=(e.clientY-n*.5)/(n*.5);c.x=Math.max(-1,Math.min(1,t)),c.y=Math.max(-1,Math.min(1,l)),c.inside=!0},oe=()=>{c.inside=!1},ae=()=>{c.inside=!1};let B=null;f==="hover"?(B=e=>{Pe(e),R()},window.addEventListener("pointermove",B,{passive:!0}),window.addEventListener("mouseleave",oe),window.addEventListener("blur",ae),r.uniforms.uUseBaseWobble.value=0):f==="3drotate"?r.uniforms.uUseBaseWobble.value=0:r.uniforms.uUseBaseWobble.value=1;const ne=e=>{const a=(e-be)*.001;r.uniforms.iTime.value=a;let n=!0;if(f==="hover"){const t=.6*Q,l=.6*Q;C=(c.inside?-c.x:0)*l,_=(c.inside?c.y:0)*t,m=T(m,C,J),v=T(v,_,J),h=T(h,0,.1),r.uniforms.uRot.value=ee(m,v,h,s),Se&&Math.abs(m-C)<1e-4&&Math.abs(v-_)<1e-4&&Math.abs(h)<1e-4&&(n=!1)}else if(f==="3drotate"){const t=a*g;m=t*Re,v=Math.sin(t*ge+Ee)*.6,h=Math.sin(t*Be+He)*.5,r.uniforms.uRot.value=ee(m,v,h,s),g<1e-6&&(n=!1)}else s[0]=1,s[1]=0,s[2]=0,s[3]=0,s[4]=1,s[5]=0,s[6]=0,s[7]=0,s[8]=1,r.uniforms.uRot.value=s,g<1e-6&&(n=!1);F.render({scene:Me}),n?u=requestAnimationFrame(ne):u=0};if(P){const e=new IntersectionObserver(a=>{a.some(t=>t.isIntersecting)?R():te()});e.observe(i),R(),i.__prismIO=e}else R();return()=>{if(te(),$.disconnect(),f==="hover"&&(B&&window.removeEventListener("pointermove",B),window.removeEventListener("mouseleave",oe),window.removeEventListener("blur",ae)),P){const e=i.__prismIO;e&&e.disconnect(),delete i.__prismIO}o.canvas.parentElement===i&&i.removeChild(o.canvas)}},[z,U,f,q,W,S?.x,S?.y,N,H,Y,j,Z,G,X,V,P]),ze.jsx("div",{className:"w-full h-full relative",ref:D})};export{Xe as default};
