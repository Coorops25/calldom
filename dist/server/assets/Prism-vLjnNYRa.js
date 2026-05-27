import{jsx as ze}from"react/jsx-runtime";import{useRef as Te,useEffect as Ue}from"react";import{Renderer as qe,Triangle as We,Program as Ne,Mesh as Ye}from"ogl";const je=({height:T=3.5,baseWidth:U=5.5,animationType:f="rotate",glow:q=1,offset:S={x:0,y:0},noise:W=.5,transparent:E=!0,scale:N=3.6,hueShift:Y=0,colorFrequency:G=1,hoverStrength:X=2,inertia:V=.05,bloom:Z=1,suspendWhenOffscreen:I=!1,timeScale:j=.5})=>{const D=Te(null);return Ue(()=>{const i=D.current;if(!i)return;const b=Math.max(.001,T),P=Math.max(.001,U)*.5,se=Math.max(0,q),k=Math.max(0,W),ie=S?.x??0,re=S?.y??0,ce=E?1.5:1,y=Math.max(.001,N),le=Y||0,ue=Math.max(0,G||1),fe=Math.max(0,Z||1),me=1,ve=1,he=1,g=Math.max(0,j||1),Q=Math.max(0,X||1),J=Math.max(0,Math.min(1,V||.12)),A=Math.min(2,window.devicePixelRatio||1),F=new qe({dpr:A,alpha:E,antialias:!1}),o=F.gl;o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.BLEND),Object.assign(o.canvas.style,{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block"}),i.appendChild(o.canvas);const de=`
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `,xe=`
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
    `,we=new We(o),L=new Float32Array(2),O=new Float32Array(2),r=new Ne(o,{vertex:de,fragment:xe,uniforms:{iResolution:{value:L},iTime:{value:0},uHeight:{value:b},uBaseHalf:{value:P},uUseBaseWobble:{value:1},uRot:{value:new Float32Array([1,0,0,0,1,0,0,0,1])},uGlow:{value:se},uOffsetPx:{value:O},uNoise:{value:k},uSaturation:{value:ce},uScale:{value:y},uHueShift:{value:le},uColorFreq:{value:ue},uBloom:{value:fe},uCenterShift:{value:b*.25},uInvBaseHalf:{value:1/P},uInvHeight:{value:1/b},uMinAxis:{value:Math.min(P,b)},uPxScale:{value:1/((o.drawingBufferHeight||1)*.1*y)},uTimeScale:{value:g}}}),pe=new Ye(o,{geometry:we,program:r}),K=()=>{const e=i.clientWidth||1,n=i.clientHeight||1;F.setSize(e,n),L[0]=o.drawingBufferWidth,L[1]=o.drawingBufferHeight,O[0]=ie*A,O[1]=re*A,r.uniforms.uPxScale.value=1/((o.drawingBufferHeight||1)*.1*y)},$=new ResizeObserver(K);$.observe(i),K();const s=new Float32Array(9),ee=(e,n,a,t)=>{const l=Math.cos(e),d=Math.sin(e),H=Math.cos(n),w=Math.sin(n),p=Math.cos(a),M=Math.sin(a),Ie=l*p+d*w*M,Pe=-l*M+d*w*p,ye=d*H,Ae=H*M,Fe=H*p,Le=-w,Oe=-d*p+l*w*M,Ce=d*M+l*w*p,_e=l*H;return t[0]=Ie,t[1]=Ae,t[2]=Oe,t[3]=Pe,t[4]=Fe,t[5]=Ce,t[6]=ye,t[7]=Le,t[8]=_e,t},Me=k<1e-6;let u=0;const Se=performance.now(),B=()=>{u||(u=requestAnimationFrame(ae))},te=()=>{u&&(cancelAnimationFrame(u),u=0)},x=()=>Math.random(),be=(.3+x()*.6)*me,ge=(.2+x()*.7)*ve,Be=(.1+x()*.5)*he,Re=x()*Math.PI*2,He=x()*Math.PI*2;let m=0,v=0,h=0,C=0,_=0;const z=(e,n,a)=>e+(n-e)*a,c={x:0,y:0,inside:!0},Ee=e=>{const n=Math.max(1,window.innerWidth),a=Math.max(1,window.innerHeight),t=(e.clientX-n*.5)/(n*.5),l=(e.clientY-a*.5)/(a*.5);c.x=Math.max(-1,Math.min(1,t)),c.y=Math.max(-1,Math.min(1,l)),c.inside=!0},oe=()=>{c.inside=!1},ne=()=>{c.inside=!1};let R=null;f==="hover"?(R=e=>{Ee(e),B()},window.addEventListener("pointermove",R,{passive:!0}),window.addEventListener("mouseleave",oe),window.addEventListener("blur",ne),r.uniforms.uUseBaseWobble.value=0):f==="3drotate"?r.uniforms.uUseBaseWobble.value=0:r.uniforms.uUseBaseWobble.value=1;const ae=e=>{const n=(e-Se)*.001;r.uniforms.iTime.value=n;let a=!0;if(f==="hover"){const t=.6*Q,l=.6*Q;C=(c.inside?-c.x:0)*l,_=(c.inside?c.y:0)*t,m=z(m,C,J),v=z(v,_,J),h=z(h,0,.1),r.uniforms.uRot.value=ee(m,v,h,s),Me&&Math.abs(m-C)<1e-4&&Math.abs(v-_)<1e-4&&Math.abs(h)<1e-4&&(a=!1)}else if(f==="3drotate"){const t=n*g;m=t*ge,v=Math.sin(t*be+Re)*.6,h=Math.sin(t*Be+He)*.5,r.uniforms.uRot.value=ee(m,v,h,s),g<1e-6&&(a=!1)}else s[0]=1,s[1]=0,s[2]=0,s[3]=0,s[4]=1,s[5]=0,s[6]=0,s[7]=0,s[8]=1,r.uniforms.uRot.value=s,g<1e-6&&(a=!1);F.render({scene:pe}),a?u=requestAnimationFrame(ae):u=0};if(I){const e=new IntersectionObserver(n=>{n.some(t=>t.isIntersecting)?B():te()});e.observe(i),B(),i.__prismIO=e}else B();return()=>{if(te(),$.disconnect(),f==="hover"&&(R&&window.removeEventListener("pointermove",R),window.removeEventListener("mouseleave",oe),window.removeEventListener("blur",ne)),I){const e=i.__prismIO;e&&e.disconnect(),delete i.__prismIO}o.canvas.parentElement===i&&i.removeChild(o.canvas)}},[T,U,f,q,W,S?.x,S?.y,N,E,Y,G,j,X,V,Z,I]),ze("div",{className:"w-full h-full relative",ref:D})};export{je as default};
