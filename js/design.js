/* Nurture Paradise — design.js */
(function(){
  var T=window.matchMedia('(pointer:coarse)').matches;

  /* Cursor */
  if(!T){
    var D=document.createElement('div');D.id='np-cur';
    var R=document.createElement('div');R.id='np-ring';
    document.body.appendChild(D);document.body.appendChild(R);
    var mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',function(e){
      mx=e.clientX;my=e.clientY;
      D.style.left=mx+'px';D.style.top=my+'px';
      D.style.transform='translate(-50%,-50%)';
    });
    (function l(){rx+=(mx-rx)*.11;ry+=(my-ry)*.11;
      R.style.left=rx+'px';R.style.top=ry+'px';
      R.style.transform='translate(-50%,-50%)';
      requestAnimationFrame(l);
    })();
    var HS='button,a,input,textarea,select,label,.plant-api-card,.shop-card,.plant-card-home,.garden-card,.feature-item,.choice-card';
    document.addEventListener('mouseover',function(e){if(e.target.closest(HS)){D.classList.add('hov');R.classList.add('hov');}});
    document.addEventListener('mouseout',function(e){if(e.target.closest(HS)){D.classList.remove('hov');R.classList.remove('hov');}});
    document.addEventListener('mousedown',function(){D.classList.add('dn');});
    document.addEventListener('mouseup',function(){D.classList.remove('dn');});
    document.addEventListener('mouseleave',function(){D.style.opacity='0';R.style.opacity='0';});
    document.addEventListener('mouseenter',function(){D.style.opacity='';R.style.opacity='';});
  }

  /* Page wipe */
  var W=document.createElement('div');W.id='np-wipe';document.body.appendChild(W);
  var _n=window.navigate;
  if(_n)window.navigate=function(p){
    window.scrollTo({top:0,behavior:'instant'});
    W.classList.add('go');
    setTimeout(function(){_n(p);requestAnimationFrame(function(){
      W.classList.add('done');
      setTimeout(function(){W.classList.remove('go','done');},500);
    });},290);
  };

  /* Progress bar */
  var PB=document.createElement('div');PB.id='np-progress';document.body.appendChild(PB);
  var _n2=window.navigate;
  if(_n2)window.navigate=function(p){
    PB.style.opacity='1';PB.style.transition='width .25s ease';
    PB.style.width='0';setTimeout(function(){PB.style.width='70%';},10);
    _n2(p);
    setTimeout(function(){PB.style.width='100%';setTimeout(function(){PB.style.opacity='0';PB.style.width='0';},300);},600);
  };


  /* Scroll reveal */
  var IO=new IntersectionObserver(function(en){
    en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');IO.unobserve(e.target);}});
  },{threshold:.07,rootMargin:'0px 0px -40px 0px'});
  function scan(){
    document.querySelectorAll('.sr:not(.on)').forEach(function(el,i){
      el.style.transitionDelay=(i%5)*70+'ms';IO.observe(el);
    });
  }
  scan();new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});

  function tag(){
    document.querySelectorAll('.feature-item,.plant-card-home,.plant-api-card,.shop-card,.garden-card,.guide-item,.product-card:not(.sr)').forEach(function(el){el.classList.add('sr');});
  }
  tag();new MutationObserver(tag).observe(document.body,{childList:true,subtree:true});

  /* Ripple */
  function rip(){
    document.querySelectorAll('.btn-ink,.auth-btn-primary,.btn-add-cart,.log-send-btn:not([data-r])').forEach(function(b){
      if(b.dataset.r)return;b.dataset.r='1';
      b.addEventListener('click',function(e){
        var r=b.getBoundingClientRect(),s=document.createElement('span');s.className='np-rip';
        var sz=Math.max(r.width,r.height)*2;
        s.style.cssText='width:'+sz+'px;height:'+sz+'px;left:'+(e.clientX-r.left-sz/2)+'px;top:'+(e.clientY-r.top-sz/2)+'px;';
        b.appendChild(s);setTimeout(function(){s.remove();},700);
      });
    });
  }
  rip();new MutationObserver(rip).observe(document.body,{childList:true,subtree:true});

  /* 3D tilt — desktop */
  function tilt(){
    if(T)return;
    document.querySelectorAll('.plant-api-card:not([data-t]),.shop-card:not([data-t]),.plant-card-home:not([data-t])').forEach(function(c){
      c.dataset.t='1';
      c.addEventListener('mousemove',function(e){
        var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        c.style.transform='perspective(900px) rotateY('+(x*7)+'deg) rotateX('+(-y*5)+'deg) translateZ(8px)';
      });
      c.addEventListener('mouseleave',function(){c.style.transform='';});
    });
  }
  tilt();new MutationObserver(tilt).observe(document.body,{childList:true,subtree:true});

  /* Magnetic buttons */
  function mag(){
    if(T)return;
    document.querySelectorAll('.btn-ink,.btn-outline:not([data-m])').forEach(function(b){
      if(b.dataset.m)return;b.dataset.m='1';
      b.addEventListener('mousemove',function(e){
        var r=b.getBoundingClientRect();
        b.style.transform='translate('+(e.clientX-(r.left+r.width/2))*.18+'px,'+(e.clientY-(r.top+r.height/2))*.14+'px)';
      });
      b.addEventListener('mouseleave',function(){b.style.transform='';});
    });
  }
  mag();new MutationObserver(mag).observe(document.body,{childList:true,subtree:true});

  /* Image fade-in */
  function imgs(){
    document.querySelectorAll('.plant-api-img:not([data-fi])').forEach(function(img){
      img.dataset.fi='1';
      if(img.complete){img.style.opacity='1';}
      else{img.addEventListener('load',function(){img.style.opacity='1';});}
    });
  }
  imgs();new MutationObserver(imgs).observe(document.body,{childList:true,subtree:true});

  /* Garden tap-to-expand (mobile) */
  function gExp(){
    if(!T)return;
    document.querySelectorAll('.garden-card:not([data-exp])').forEach(function(c){
      c.dataset.exp='1';
      var left=c.querySelector('.garden-card-left');
      if(left)left.addEventListener('click',function(){c.classList.toggle('expanded');});
    });
  }
  gExp();new MutationObserver(gExp).observe(document.body,{childList:true,subtree:true});

  /* Upload drag-drop */
  function drag(){
    var z=document.getElementById('upload-zone');
    if(!z||z.dataset.dd)return;z.dataset.dd='1';
    ['dragenter','dragover'].forEach(function(ev){z.addEventListener(ev,function(e){e.preventDefault();z.classList.add('drag-over');});});
    ['dragleave','drop'].forEach(function(ev){z.addEventListener(ev,function(e){e.preventDefault();z.classList.remove('drag-over');});});
    z.addEventListener('drop',function(e){
      var f=e.dataTransfer.files[0];
      if(f&&f.type.startsWith('image/')){
        var dt=new DataTransfer();dt.items.add(f);
        var inp=document.getElementById('file-input');
        if(inp){inp.files=dt.files;inp.dispatchEvent(new Event('change'));}
      }
    });
  }
  drag();new MutationObserver(drag).observe(document.body,{childList:true,subtree:true});

  /* Close drawer on outside tap */
  document.addEventListener('click',function(e){
    var d=document.getElementById('nav-drawer');
    var b=document.getElementById('nav-hamburger');
    if(d&&b&&d.classList.contains('open')&&!d.contains(e.target)&&!b.contains(e.target)){
      d.classList.remove('open');b.classList.remove('open');
    }
  });

  /* Toast */
  window.showToast=function(msg){
    var t=document.getElementById('toast');if(!t)return;
    t.className='';void t.offsetWidth;t.textContent=msg;t.classList.add('show');
    setTimeout(function(){t.classList.remove('show');},3000);
  };

  /* Nav scramble */
  var CH='abcdefghijklmnopqrstuvwxyz';
  document.querySelectorAll('.nav-link').forEach(function(el){
    el.addEventListener('mouseenter',function(){
      var orig=el.dataset.orig||el.textContent;el.dataset.orig=orig;
      var f=0,tot=10;
      (function step(){
        el.textContent=orig.split('').map(function(c,i){
          if(c===' ')return ' ';
          if(i<Math.floor(f/tot*orig.length))return orig[i];
          return CH[Math.floor(Math.random()*CH.length)];
        }).join('');
        f++;if(f<=tot)requestAnimationFrame(step);else el.textContent=orig;
      })();
    });
  });
})();
