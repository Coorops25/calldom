import{jsxs as a,jsx as r}from"react/jsx-runtime";import{useRef as s,useEffect as v,Suspense as A,lazy as C}from"react";import{useScroll as I,useTransform as M,motion as b}from"motion/react";import{Globe2 as _,Settings as z,BarChart3 as D,Link2 as W,Brain as j,Zap as B}from"lucide-react";import{u as O}from"../entry-server.js";const $=C(()=>import("./SplitText-Cl3FJQEC.js")),y=[_,z,D,W,j,B],k=["border-teal/30","border-teal/20","border-teal/25","border-teal/30","border-teal/20","border-teal/25"],F=50/32,H=5,X=`
  :root { --ccg-cw: 240px; }
  @media (min-width: 480px)  { :root { --ccg-cw: 290px; } }
  @media (min-width: 768px)  { :root { --ccg-cw: 335px; } }
  @media (min-width: 1024px) { :root { --ccg-cw: 390px; } }

  /* Each card slot = card width + 16 px left gap.
     With the array doubled, translateX(-50%) is always a seamless restart. */
  .ccg-card {
    flex-shrink: 0;
    width: calc(var(--ccg-cw) + 16px);
    padding-left: 16px;
    padding-top: 12px;
    padding-bottom: 16px;
    box-sizing: border-box;
    position: relative;
  }

  /* JS drives --ccg-offset (percent of track width).
     translate3d goes on its own line so transforms compose correctly. */
  .ccg-track {
    display: flex;
    width: max-content;
    transform: translate3d(var(--ccg-offset, 0%), 0, 0);
    will-change: transform;
    touch-action: pan-y;
  }
  .ccg-track-wrap { cursor: grab; }
  .ccg-track-wrap:active { cursor: grabbing; }

  .ccg-track-wrap:hover .ccg-card {
    filter: brightness(0.65);
    transition: filter 0.2s;
  }
  .ccg-track-wrap:hover .ccg-card:hover {
    filter: brightness(1.05);
    z-index: 10;
  }
`;function V(){const{t:o,lang:h}=O(),x=s(null),d=s(null),n=s(0),m=s(!1),f=s(!1),i=s(null),{scrollYProgress:N}=I({target:x,offset:["start end","end start"]}),E=M(N,[0,1],[60,-60]);v(()=>{let e=0,t=performance.now();const c=l=>{const g=(l-t)/1e3;t=l,!m.current&&!f.current&&(n.current-=F*g),n.current<=-50&&(n.current+=50),n.current>0&&(n.current-=50),d.current&&d.current.style.setProperty("--ccg-offset",`${n.current}%`),e=requestAnimationFrame(c)};return e=requestAnimationFrame(c),()=>cancelAnimationFrame(e)},[]),v(()=>{const e=c=>{if(!m.current||!i.current)return;const l=c.clientX-i.current.x;Math.abs(l)>H&&(i.current.moved=!0);const{trackWidth:g,offsetPct:L}=i.current,T=g>0?l/g*100:0;n.current=L+T},t=()=>{m.current=!1};return window.addEventListener("pointermove",e),window.addEventListener("pointerup",t),window.addEventListener("pointercancel",t),()=>{window.removeEventListener("pointermove",e),window.removeEventListener("pointerup",t),window.removeEventListener("pointercancel",t)}},[]);const S=e=>{if(e.button!==0&&e.pointerType==="mouse")return;const t=d.current?.getBoundingClientRect().width??0;m.current=!0,i.current={x:e.clientX,offsetPct:n.current,trackWidth:t,moved:!1}},p=e=>e.replace(/^(?:Â)?(?:¿)\s*/,"").replace(/\?\s*$/,"").trim(),u=o.reasons.items,P=u.length,w=h==="es"?"¿":"",R=[...u,...u];return a("section",{id:"reasons",ref:x,className:"relative py-14 sm:py-16",children:[r("style",{children:X}),a("div",{className:"px-6 md:px-14 lg:px-28 max-w-3xl mb-14",children:[a(b.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6",children:[r("div",{className:"w-8 h-px bg-teal"}),o.reasons.label]}),r("h2",{className:"font-display text-[clamp(1.6rem,4vw,3.8rem)] leading-tight font-normal",children:r(A,{fallback:a("span",{className:"inline-block opacity-0",children:[w,p(o.reasons.headingPre)," ",p(o.reasons.headingEm),"?"]}),children:a($,{className:"inline-block",delay:30,duration:1,splitType:"words",from:{opacity:0,y:20},to:{opacity:1,y:0},children:[w,p(o.reasons.headingPre)," ",a("em",{className:"italic text-gradient inline-block align-baseline whitespace-nowrap",children:[p(o.reasons.headingEm),"?"]})]},`reasons-heading-${h}`)})})]}),r("div",{className:"ccg-track-wrap relative overflow-hidden",style:{maskImage:"linear-gradient(to right, transparent, #000 5% 95%, transparent)",WebkitMaskImage:"linear-gradient(to right, transparent, #000 5% 95%, transparent)"},onPointerDown:S,onMouseEnter:()=>{f.current=!0},onMouseLeave:()=>{f.current=!1},children:r(b.div,{style:{x:E},children:r("div",{ref:d,className:"ccg-track",children:R.map((e,t)=>{const c=y[t%y.length];return r("div",{className:"ccg-card",children:a("div",{className:`rounded-2xl border ${k[t%k.length]} bg-navy-deep/90 backdrop-blur-sm p-4 md:p-5 flex flex-col gap-3 hover:border-teal/60 hover:bg-navy-deep transition-colors duration-300 group`,children:[a("div",{className:"flex items-center justify-between",children:[r("div",{className:"w-8 h-8 md:w-10 md:h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center group-hover:bg-teal/20 group-hover:border-teal/40 transition-all duration-300",children:r(c,{size:17,className:"text-teal",strokeWidth:1.5})}),r("span",{className:"font-mono text-[0.55rem] tracking-[0.25em] text-teal/40",children:String(t%P+1).padStart(2,"0")})]}),r("h3",{className:"font-mono text-xs md:text-sm uppercase tracking-wider text-white leading-snug group-hover:text-teal transition-colors duration-300",children:e.title}),r("p",{className:"text-white font-light text-xs md:text-sm leading-relaxed",children:e.desc}),r("div",{className:"h-px w-0 bg-gradient-to-r from-teal to-transparent group-hover:w-full transition-all duration-500"})]})},t)})})})})]})}export{V as default};
