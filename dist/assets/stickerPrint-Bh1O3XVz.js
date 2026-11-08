import{b as ne,g as re,a as ie}from"./index-78E_lI0W.js";var z={},Q,bt;function oe(){return bt||(bt=1,Q=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Q}var G={},D={},Bt;function _(){if(Bt)return D;Bt=1;let r;const i=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return D.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},D.getSymbolTotalCodewords=function(n){return i[n]},D.getBCHDigit=function(o){let n=0;for(;o!==0;)n++,o>>>=1;return n},D.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');r=n},D.isKanjiModeEnabled=function(){return typeof r<"u"},D.toSJIS=function(n){return r(n)},D}var W={},Rt;function pt(){return Rt||(Rt=1,(function(r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2};function i(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+o)}}r.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},r.from=function(n,t){if(r.isValid(n))return n;try{return i(n)}catch{return t}}})(W)),W}var Z,At;function se(){if(At)return Z;At=1;function r(){this.buffer=[],this.length=0}return r.prototype={get:function(i){const o=Math.floor(i/8);return(this.buffer[o]>>>7-i%8&1)===1},put:function(i,o){for(let n=0;n<o;n++)this.putBit((i>>>o-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(i){const o=Math.floor(this.length/8);this.buffer.length<=o&&this.buffer.push(0),i&&(this.buffer[o]|=128>>>this.length%8),this.length++}},Z=r,Z}var X,vt;function ae(){if(vt)return X;vt=1;function r(i){if(!i||i<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=i,this.data=new Uint8Array(i*i),this.reservedBit=new Uint8Array(i*i)}return r.prototype.set=function(i,o,n,t){const e=i*this.size+o;this.data[e]=n,t&&(this.reservedBit[e]=!0)},r.prototype.get=function(i,o){return this.data[i*this.size+o]},r.prototype.xor=function(i,o,n){this.data[i*this.size+o]^=n},r.prototype.isReserved=function(i,o){return this.reservedBit[i*this.size+o]},X=r,X}var $={},Tt;function ue(){return Tt||(Tt=1,(function(r){const i=_().getSymbolSize;r.getRowColCoords=function(n){if(n===1)return[];const t=Math.floor(n/7)+2,e=i(n),s=e===145?26:Math.ceil((e-13)/(2*t-2))*2,u=[e-7];for(let a=1;a<t-1;a++)u[a]=u[a-1]-s;return u.push(6),u.reverse()},r.getPositions=function(n){const t=[],e=r.getRowColCoords(n),s=e.length;for(let u=0;u<s;u++)for(let a=0;a<s;a++)u===0&&a===0||u===0&&a===s-1||u===s-1&&a===0||t.push([e[u],e[a]]);return t}})($)),$}var tt={},Mt;function le(){if(Mt)return tt;Mt=1;const r=_().getSymbolSize,i=7;return tt.getPositions=function(n){const t=r(n);return[[0,0],[t-i,0],[0,t-i]]},tt}var et={},Pt;function ce(){return Pt||(Pt=1,(function(r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const i={N1:3,N2:3,N3:40,N4:10};r.isValid=function(t){return t!=null&&t!==""&&!isNaN(t)&&t>=0&&t<=7},r.from=function(t){return r.isValid(t)?parseInt(t,10):void 0},r.getPenaltyN1=function(t){const e=t.size;let s=0,u=0,a=0,l=null,c=null;for(let E=0;E<e;E++){u=a=0,l=c=null;for(let h=0;h<e;h++){let f=t.get(E,h);f===l?u++:(u>=5&&(s+=i.N1+(u-5)),l=f,u=1),f=t.get(h,E),f===c?a++:(a>=5&&(s+=i.N1+(a-5)),c=f,a=1)}u>=5&&(s+=i.N1+(u-5)),a>=5&&(s+=i.N1+(a-5))}return s},r.getPenaltyN2=function(t){const e=t.size;let s=0;for(let u=0;u<e-1;u++)for(let a=0;a<e-1;a++){const l=t.get(u,a)+t.get(u,a+1)+t.get(u+1,a)+t.get(u+1,a+1);(l===4||l===0)&&s++}return s*i.N2},r.getPenaltyN3=function(t){const e=t.size;let s=0,u=0,a=0;for(let l=0;l<e;l++){u=a=0;for(let c=0;c<e;c++)u=u<<1&2047|t.get(l,c),c>=10&&(u===1488||u===93)&&s++,a=a<<1&2047|t.get(c,l),c>=10&&(a===1488||a===93)&&s++}return s*i.N3},r.getPenaltyN4=function(t){let e=0;const s=t.data.length;for(let a=0;a<s;a++)e+=t.data[a];return Math.abs(Math.ceil(e*100/s/5)-10)*i.N4};function o(n,t,e){switch(n){case r.Patterns.PATTERN000:return(t+e)%2===0;case r.Patterns.PATTERN001:return t%2===0;case r.Patterns.PATTERN010:return e%3===0;case r.Patterns.PATTERN011:return(t+e)%3===0;case r.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(e/3))%2===0;case r.Patterns.PATTERN101:return t*e%2+t*e%3===0;case r.Patterns.PATTERN110:return(t*e%2+t*e%3)%2===0;case r.Patterns.PATTERN111:return(t*e%3+(t+e)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}r.applyMask=function(t,e){const s=e.size;for(let u=0;u<s;u++)for(let a=0;a<s;a++)e.isReserved(a,u)||e.xor(a,u,o(t,a,u))},r.getBestMask=function(t,e){const s=Object.keys(r.Patterns).length;let u=0,a=1/0;for(let l=0;l<s;l++){e(l),r.applyMask(l,t);const c=r.getPenaltyN1(t)+r.getPenaltyN2(t)+r.getPenaltyN3(t)+r.getPenaltyN4(t);r.applyMask(l,t),c<a&&(a=c,u=l)}return u}})(et)),et}var j={},Nt;function Gt(){if(Nt)return j;Nt=1;const r=pt(),i=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],o=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return j.getBlocksCount=function(t,e){switch(e){case r.L:return i[(t-1)*4+0];case r.M:return i[(t-1)*4+1];case r.Q:return i[(t-1)*4+2];case r.H:return i[(t-1)*4+3];default:return}},j.getTotalCodewordsCount=function(t,e){switch(e){case r.L:return o[(t-1)*4+0];case r.M:return o[(t-1)*4+1];case r.Q:return o[(t-1)*4+2];case r.H:return o[(t-1)*4+3];default:return}},j}var nt={},K={},St;function fe(){if(St)return K;St=1;const r=new Uint8Array(512),i=new Uint8Array(256);return(function(){let n=1;for(let t=0;t<255;t++)r[t]=n,i[n]=t,n<<=1,n&256&&(n^=285);for(let t=255;t<512;t++)r[t]=r[t-255]})(),K.log=function(n){if(n<1)throw new Error("log("+n+")");return i[n]},K.exp=function(n){return r[n]},K.mul=function(n,t){return n===0||t===0?0:r[i[n]+i[t]]},K}var It;function de(){return It||(It=1,(function(r){const i=fe();r.mul=function(n,t){const e=new Uint8Array(n.length+t.length-1);for(let s=0;s<n.length;s++)for(let u=0;u<t.length;u++)e[s+u]^=i.mul(n[s],t[u]);return e},r.mod=function(n,t){let e=new Uint8Array(n);for(;e.length-t.length>=0;){const s=e[0];for(let a=0;a<t.length;a++)e[a]^=i.mul(t[a],s);let u=0;for(;u<e.length&&e[u]===0;)u++;e=e.slice(u)}return e},r.generateECPolynomial=function(n){let t=new Uint8Array([1]);for(let e=0;e<n;e++)t=r.mul(t,new Uint8Array([1,i.exp(e)]));return t}})(nt)),nt}var rt,Lt;function ge(){if(Lt)return rt;Lt=1;const r=de();function i(o){this.genPoly=void 0,this.degree=o,this.degree&&this.initialize(this.degree)}return i.prototype.initialize=function(n){this.degree=n,this.genPoly=r.generateECPolynomial(this.degree)},i.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const t=new Uint8Array(n.length+this.degree);t.set(n);const e=r.mod(t,this.genPoly),s=this.degree-e.length;if(s>0){const u=new Uint8Array(this.degree);return u.set(e,s),u}return e},rt=i,rt}var it={},ot={},st={},kt;function Wt(){return kt||(kt=1,st.isValid=function(i){return!isNaN(i)&&i>=1&&i<=40}),st}var I={},qt;function Zt(){if(qt)return I;qt=1;const r="[0-9]+",i="[A-Z $%*+\\-./:]+";let o="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";o=o.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+o+`)(?:.|[\r
]))+`;I.KANJI=new RegExp(o,"g"),I.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),I.BYTE=new RegExp(n,"g"),I.NUMERIC=new RegExp(r,"g"),I.ALPHANUMERIC=new RegExp(i,"g");const t=new RegExp("^"+o+"$"),e=new RegExp("^"+r+"$"),s=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return I.testKanji=function(a){return t.test(a)},I.testNumeric=function(a){return e.test(a)},I.testAlphanumeric=function(a){return s.test(a)},I}var Dt;function U(){return Dt||(Dt=1,(function(r){const i=Wt(),o=Zt();r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(e,s){if(!e.ccBits)throw new Error("Invalid mode: "+e);if(!i.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?e.ccBits[0]:s<27?e.ccBits[1]:e.ccBits[2]},r.getBestModeForData=function(e){return o.testNumeric(e)?r.NUMERIC:o.testAlphanumeric(e)?r.ALPHANUMERIC:o.testKanji(e)?r.KANJI:r.BYTE},r.toString=function(e){if(e&&e.id)return e.id;throw new Error("Invalid mode")},r.isValid=function(e){return e&&e.bit&&e.ccBits};function n(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+t)}}r.from=function(e,s){if(r.isValid(e))return e;try{return n(e)}catch{return s}}})(ot)),ot}var _t;function he(){return _t||(_t=1,(function(r){const i=_(),o=Gt(),n=pt(),t=U(),e=Wt(),s=7973,u=i.getBCHDigit(s);function a(h,f,T){for(let M=1;M<=40;M++)if(f<=r.getCapacity(M,T,h))return M}function l(h,f){return t.getCharCountIndicator(h,f)+4}function c(h,f){let T=0;return h.forEach(function(M){const N=l(M.mode,f);T+=N+M.getBitsLength()}),T}function E(h,f){for(let T=1;T<=40;T++)if(c(h,T)<=r.getCapacity(T,f,t.MIXED))return T}r.from=function(f,T){return e.isValid(f)?parseInt(f,10):T},r.getCapacity=function(f,T,M){if(!e.isValid(f))throw new Error("Invalid QR Code version");typeof M>"u"&&(M=t.BYTE);const N=i.getSymbolTotalCodewords(f),R=o.getTotalCodewordsCount(f,T),P=(N-R)*8;if(M===t.MIXED)return P;const A=P-l(M,f);switch(M){case t.NUMERIC:return Math.floor(A/10*3);case t.ALPHANUMERIC:return Math.floor(A/11*2);case t.KANJI:return Math.floor(A/13);case t.BYTE:default:return Math.floor(A/8)}},r.getBestVersionForData=function(f,T){let M;const N=n.from(T,n.M);if(Array.isArray(f)){if(f.length>1)return E(f,N);if(f.length===0)return 1;M=f[0]}else M=f;return a(M.mode,M.getLength(),N)},r.getEncodedBits=function(f){if(!e.isValid(f)||f<7)throw new Error("Invalid QR Code version");let T=f<<12;for(;i.getBCHDigit(T)-u>=0;)T^=s<<i.getBCHDigit(T)-u;return f<<12|T}})(it)),it}var at={},Ut;function me(){if(Ut)return at;Ut=1;const r=_(),i=1335,o=21522,n=r.getBCHDigit(i);return at.getEncodedBits=function(e,s){const u=e.bit<<3|s;let a=u<<10;for(;r.getBCHDigit(a)-n>=0;)a^=i<<r.getBCHDigit(a)-n;return(u<<10|a)^o},at}var ut={},lt,Ft;function we(){if(Ft)return lt;Ft=1;const r=U();function i(o){this.mode=r.NUMERIC,this.data=o.toString()}return i.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(n){let t,e,s;for(t=0;t+3<=this.data.length;t+=3)e=this.data.substr(t,3),s=parseInt(e,10),n.put(s,10);const u=this.data.length-t;u>0&&(e=this.data.substr(t),s=parseInt(e,10),n.put(s,u*3+1))},lt=i,lt}var ct,zt;function pe(){if(zt)return ct;zt=1;const r=U(),i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function o(n){this.mode=r.ALPHANUMERIC,this.data=n}return o.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(t){let e;for(e=0;e+2<=this.data.length;e+=2){let s=i.indexOf(this.data[e])*45;s+=i.indexOf(this.data[e+1]),t.put(s,11)}this.data.length%2&&t.put(i.indexOf(this.data[e]),6)},ct=o,ct}var ft,Vt;function ye(){if(Vt)return ft;Vt=1;const r=U();function i(o){this.mode=r.BYTE,typeof o=="string"?this.data=new TextEncoder().encode(o):this.data=new Uint8Array(o)}return i.getBitsLength=function(n){return n*8},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(o){for(let n=0,t=this.data.length;n<t;n++)o.put(this.data[n],8)},ft=i,ft}var dt,Kt;function Ce(){if(Kt)return dt;Kt=1;const r=U(),i=_();function o(n){this.mode=r.KANJI,this.data=n}return o.getBitsLength=function(t){return t*13},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(n){let t;for(t=0;t<this.data.length;t++){let e=i.toSJIS(this.data[t]);if(e>=33088&&e<=40956)e-=33088;else if(e>=57408&&e<=60351)e-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);e=(e>>>8&255)*192+(e&255),n.put(e,13)}},dt=o,dt}var gt={exports:{}},Ht;function Ee(){return Ht||(Ht=1,(function(r){var i={single_source_shortest_paths:function(o,n,t){var e={},s={};s[n]=0;var u=i.PriorityQueue.make();u.push(n,0);for(var a,l,c,E,h,f,T,M,N;!u.empty();){a=u.pop(),l=a.value,E=a.cost,h=o[l]||{};for(c in h)h.hasOwnProperty(c)&&(f=h[c],T=E+f,M=s[c],N=typeof s[c]>"u",(N||M>T)&&(s[c]=T,u.push(c,T),e[c]=l))}if(typeof t<"u"&&typeof s[t]>"u"){var R=["Could not find a path from ",n," to ",t,"."].join("");throw new Error(R)}return e},extract_shortest_path_from_predecessor_list:function(o,n){for(var t=[],e=n;e;)t.push(e),o[e],e=o[e];return t.reverse(),t},find_path:function(o,n,t){var e=i.single_source_shortest_paths(o,n,t);return i.extract_shortest_path_from_predecessor_list(e,t)},PriorityQueue:{make:function(o){var n=i.PriorityQueue,t={},e;o=o||{};for(e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t.queue=[],t.sorter=o.sorter||n.default_sorter,t},default_sorter:function(o,n){return o.cost-n.cost},push:function(o,n){var t={value:o,cost:n};this.queue.push(t),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};r.exports=i})(gt)),gt.exports}var jt;function be(){return jt||(jt=1,(function(r){const i=U(),o=we(),n=pe(),t=ye(),e=Ce(),s=Zt(),u=_(),a=Ee();function l(R){return unescape(encodeURIComponent(R)).length}function c(R,P,A){const b=[];let S;for(;(S=R.exec(A))!==null;)b.push({data:S[0],index:S.index,mode:P,length:S[0].length});return b}function E(R){const P=c(s.NUMERIC,i.NUMERIC,R),A=c(s.ALPHANUMERIC,i.ALPHANUMERIC,R);let b,S;return u.isKanjiModeEnabled()?(b=c(s.BYTE,i.BYTE,R),S=c(s.KANJI,i.KANJI,R)):(b=c(s.BYTE_KANJI,i.BYTE,R),S=[]),P.concat(A,b,S).sort(function(y,p){return y.index-p.index}).map(function(y){return{data:y.data,mode:y.mode,length:y.length}})}function h(R,P){switch(P){case i.NUMERIC:return o.getBitsLength(R);case i.ALPHANUMERIC:return n.getBitsLength(R);case i.KANJI:return e.getBitsLength(R);case i.BYTE:return t.getBitsLength(R)}}function f(R){return R.reduce(function(P,A){const b=P.length-1>=0?P[P.length-1]:null;return b&&b.mode===A.mode?(P[P.length-1].data+=A.data,P):(P.push(A),P)},[])}function T(R){const P=[];for(let A=0;A<R.length;A++){const b=R[A];switch(b.mode){case i.NUMERIC:P.push([b,{data:b.data,mode:i.ALPHANUMERIC,length:b.length},{data:b.data,mode:i.BYTE,length:b.length}]);break;case i.ALPHANUMERIC:P.push([b,{data:b.data,mode:i.BYTE,length:b.length}]);break;case i.KANJI:P.push([b,{data:b.data,mode:i.BYTE,length:l(b.data)}]);break;case i.BYTE:P.push([{data:b.data,mode:i.BYTE,length:l(b.data)}])}}return P}function M(R,P){const A={},b={start:{}};let S=["start"];for(let g=0;g<R.length;g++){const y=R[g],p=[];for(let d=0;d<y.length;d++){const B=y[d],m=""+g+d;p.push(m),A[m]={node:B,lastCount:0},b[m]={};for(let C=0;C<S.length;C++){const w=S[C];A[w]&&A[w].node.mode===B.mode?(b[w][m]=h(A[w].lastCount+B.length,B.mode)-h(A[w].lastCount,B.mode),A[w].lastCount+=B.length):(A[w]&&(A[w].lastCount=B.length),b[w][m]=h(B.length,B.mode)+4+i.getCharCountIndicator(B.mode,P))}}S=p}for(let g=0;g<S.length;g++)b[S[g]].end=0;return{map:b,table:A}}function N(R,P){let A;const b=i.getBestModeForData(R);if(A=i.from(P,b),A!==i.BYTE&&A.bit<b.bit)throw new Error('"'+R+'" cannot be encoded with mode '+i.toString(A)+`.
 Suggested mode is: `+i.toString(b));switch(A===i.KANJI&&!u.isKanjiModeEnabled()&&(A=i.BYTE),A){case i.NUMERIC:return new o(R);case i.ALPHANUMERIC:return new n(R);case i.KANJI:return new e(R);case i.BYTE:return new t(R)}}r.fromArray=function(P){return P.reduce(function(A,b){return typeof b=="string"?A.push(N(b,null)):b.data&&A.push(N(b.data,b.mode)),A},[])},r.fromString=function(P,A){const b=E(P,u.isKanjiModeEnabled()),S=T(b),g=M(S,A),y=a.find_path(g.map,"start","end"),p=[];for(let d=1;d<y.length-1;d++)p.push(g.table[y[d]].node);return r.fromArray(f(p))},r.rawSplit=function(P){return r.fromArray(E(P,u.isKanjiModeEnabled()))}})(ut)),ut}var xt;function Be(){if(xt)return G;xt=1;const r=_(),i=pt(),o=se(),n=ae(),t=ue(),e=le(),s=ce(),u=Gt(),a=ge(),l=he(),c=me(),E=U(),h=be();function f(g,y){const p=g.size,d=e.getPositions(y);for(let B=0;B<d.length;B++){const m=d[B][0],C=d[B][1];for(let w=-1;w<=7;w++)if(!(m+w<=-1||p<=m+w))for(let v=-1;v<=7;v++)C+v<=-1||p<=C+v||(w>=0&&w<=6&&(v===0||v===6)||v>=0&&v<=6&&(w===0||w===6)||w>=2&&w<=4&&v>=2&&v<=4?g.set(m+w,C+v,!0,!0):g.set(m+w,C+v,!1,!0))}}function T(g){const y=g.size;for(let p=8;p<y-8;p++){const d=p%2===0;g.set(p,6,d,!0),g.set(6,p,d,!0)}}function M(g,y){const p=t.getPositions(y);for(let d=0;d<p.length;d++){const B=p[d][0],m=p[d][1];for(let C=-2;C<=2;C++)for(let w=-2;w<=2;w++)C===-2||C===2||w===-2||w===2||C===0&&w===0?g.set(B+C,m+w,!0,!0):g.set(B+C,m+w,!1,!0)}}function N(g,y){const p=g.size,d=l.getEncodedBits(y);let B,m,C;for(let w=0;w<18;w++)B=Math.floor(w/3),m=w%3+p-8-3,C=(d>>w&1)===1,g.set(B,m,C,!0),g.set(m,B,C,!0)}function R(g,y,p){const d=g.size,B=c.getEncodedBits(y,p);let m,C;for(m=0;m<15;m++)C=(B>>m&1)===1,m<6?g.set(m,8,C,!0):m<8?g.set(m+1,8,C,!0):g.set(d-15+m,8,C,!0),m<8?g.set(8,d-m-1,C,!0):m<9?g.set(8,15-m-1+1,C,!0):g.set(8,15-m-1,C,!0);g.set(d-8,8,1,!0)}function P(g,y){const p=g.size;let d=-1,B=p-1,m=7,C=0;for(let w=p-1;w>0;w-=2)for(w===6&&w--;;){for(let v=0;v<2;v++)if(!g.isReserved(B,w-v)){let q=!1;C<y.length&&(q=(y[C]>>>m&1)===1),g.set(B,w-v,q),m--,m===-1&&(C++,m=7)}if(B+=d,B<0||p<=B){B-=d,d=-d;break}}}function A(g,y,p){const d=new o;p.forEach(function(v){d.put(v.mode.bit,4),d.put(v.getLength(),E.getCharCountIndicator(v.mode,g)),v.write(d)});const B=r.getSymbolTotalCodewords(g),m=u.getTotalCodewordsCount(g,y),C=(B-m)*8;for(d.getLengthInBits()+4<=C&&d.put(0,4);d.getLengthInBits()%8!==0;)d.putBit(0);const w=(C-d.getLengthInBits())/8;for(let v=0;v<w;v++)d.put(v%2?17:236,8);return b(d,g,y)}function b(g,y,p){const d=r.getSymbolTotalCodewords(y),B=u.getTotalCodewordsCount(y,p),m=d-B,C=u.getBlocksCount(y,p),w=d%C,v=C-w,q=Math.floor(d/C),V=Math.floor(m/C),$t=V+1,yt=q-V,te=new a(yt);let x=0;const H=new Array(C),Ct=new Array(C);let J=0;const ee=new Uint8Array(g.buffer);for(let F=0;F<C;F++){const Y=F<v?V:$t;H[F]=ee.slice(x,x+Y),Ct[F]=te.encode(H[F]),x+=Y,J=Math.max(J,Y)}const O=new Uint8Array(d);let Et=0,L,k;for(L=0;L<J;L++)for(k=0;k<C;k++)L<H[k].length&&(O[Et++]=H[k][L]);for(L=0;L<yt;L++)for(k=0;k<C;k++)O[Et++]=Ct[k][L];return O}function S(g,y,p,d){let B;if(Array.isArray(g))B=h.fromArray(g);else if(typeof g=="string"){let q=y;if(!q){const V=h.rawSplit(g);q=l.getBestVersionForData(V,p)}B=h.fromString(g,q||40)}else throw new Error("Invalid data");const m=l.getBestVersionForData(B,p);if(!m)throw new Error("The amount of data is too big to be stored in a QR Code");if(!y)y=m;else if(y<m)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+m+`.
`);const C=A(y,p,B),w=r.getSymbolSize(y),v=new n(w);return f(v,y),T(v),M(v,y),R(v,p,0),y>=7&&N(v,y),P(v,C),isNaN(d)&&(d=s.getBestMask(v,R.bind(null,v,p))),s.applyMask(d,v),R(v,p,d),{modules:v,version:y,errorCorrectionLevel:p,maskPattern:d,segments:B}}return G.create=function(y,p){if(typeof y>"u"||y==="")throw new Error("No input text");let d=i.M,B,m;return typeof p<"u"&&(d=i.from(p.errorCorrectionLevel,i.M),B=l.from(p.version),m=s.from(p.maskPattern),p.toSJISFunc&&r.setToSJISFunction(p.toSJISFunc)),S(y,B,d,m)},G}var ht={},mt={},Jt;function Xt(){return Jt||(Jt=1,(function(r){function i(o){if(typeof o=="number"&&(o=o.toString()),typeof o!="string")throw new Error("Color should be defined as hex string");let n=o.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+o);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(e){return[e,e]}))),n.length===6&&n.push("F","F");const t=parseInt(n.join(""),16);return{r:t>>24&255,g:t>>16&255,b:t>>8&255,a:t&255,hex:"#"+n.slice(0,6).join("")}}r.getOptions=function(n){n||(n={}),n.color||(n.color={});const t=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,e=n.width&&n.width>=21?n.width:void 0,s=n.scale||4;return{width:e,scale:e?4:s,margin:t,color:{dark:i(n.color.dark||"#000000ff"),light:i(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},r.getScale=function(n,t){return t.width&&t.width>=n+t.margin*2?t.width/(n+t.margin*2):t.scale},r.getImageWidth=function(n,t){const e=r.getScale(n,t);return Math.floor((n+t.margin*2)*e)},r.qrToImageData=function(n,t,e){const s=t.modules.size,u=t.modules.data,a=r.getScale(s,e),l=Math.floor((s+e.margin*2)*a),c=e.margin*a,E=[e.color.light,e.color.dark];for(let h=0;h<l;h++)for(let f=0;f<l;f++){let T=(h*l+f)*4,M=e.color.light;if(h>=c&&f>=c&&h<l-c&&f<l-c){const N=Math.floor((h-c)/a),R=Math.floor((f-c)/a);M=E[u[N*s+R]?1:0]}n[T++]=M.r,n[T++]=M.g,n[T++]=M.b,n[T]=M.a}}})(mt)),mt}var Ot;function Re(){return Ot||(Ot=1,(function(r){const i=Xt();function o(t,e,s){t.clearRect(0,0,e.width,e.height),e.style||(e.style={}),e.height=s,e.width=s,e.style.height=s+"px",e.style.width=s+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}r.render=function(e,s,u){let a=u,l=s;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),s||(l=n()),a=i.getOptions(a);const c=i.getImageWidth(e.modules.size,a),E=l.getContext("2d"),h=E.createImageData(c,c);return i.qrToImageData(h.data,e,a),o(E,l,c),E.putImageData(h,0,0),l},r.renderToDataURL=function(e,s,u){let a=u;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),a||(a={});const l=r.render(e,s,a),c=a.type||"image/png",E=a.rendererOpts||{};return l.toDataURL(c,E.quality)}})(ht)),ht}var wt={},Yt;function Ae(){if(Yt)return wt;Yt=1;const r=Xt();function i(t,e){const s=t.a/255,u=e+'="'+t.hex+'"';return s<1?u+" "+e+'-opacity="'+s.toFixed(2).slice(1)+'"':u}function o(t,e,s){let u=t+e;return typeof s<"u"&&(u+=" "+s),u}function n(t,e,s){let u="",a=0,l=!1,c=0;for(let E=0;E<t.length;E++){const h=Math.floor(E%e),f=Math.floor(E/e);!h&&!l&&(l=!0),t[E]?(c++,E>0&&h>0&&t[E-1]||(u+=l?o("M",h+s,.5+f+s):o("m",a,0),a=0,l=!1),h+1<e&&t[E+1]||(u+=o("h",c),c=0)):a++}return u}return wt.render=function(e,s,u){const a=r.getOptions(s),l=e.modules.size,c=e.modules.data,E=l+a.margin*2,h=a.color.light.a?"<path "+i(a.color.light,"fill")+' d="M0 0h'+E+"v"+E+'H0z"/>':"",f="<path "+i(a.color.dark,"stroke")+' d="'+n(c,l,a.margin)+'"/>',T='viewBox="0 0 '+E+" "+E+'"',N='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+T+' shape-rendering="crispEdges">'+h+f+`</svg>
`;return typeof u=="function"&&u(null,N),N},wt}var Qt;function ve(){if(Qt)return z;Qt=1;const r=oe(),i=Be(),o=Re(),n=Ae();function t(e,s,u,a,l){const c=[].slice.call(arguments,1),E=c.length,h=typeof c[E-1]=="function";if(!h&&!r())throw new Error("Callback required as last argument");if(h){if(E<2)throw new Error("Too few arguments provided");E===2?(l=u,u=s,s=a=void 0):E===3&&(s.getContext&&typeof l>"u"?(l=a,a=void 0):(l=a,a=u,u=s,s=void 0))}else{if(E<1)throw new Error("Too few arguments provided");return E===1?(u=s,s=a=void 0):E===2&&!s.getContext&&(a=u,u=s,s=void 0),new Promise(function(f,T){try{const M=i.create(u,a);f(e(M,s,a))}catch(M){T(M)}})}try{const f=i.create(u,a);l(null,e(f,s,a))}catch(f){l(f)}}return z.create=i.create,z.toCanvas=t.bind(null,o.render),z.toDataURL=t.bind(null,o.renderToDataURL),z.toString=t.bind(null,function(e,s,u){return n.render(e,u)}),z}var Te=ve();const Me=ne(Te),Pe=async r=>{if(!r||Array.isArray(r)&&r.length===0)return;const i=Array.isArray(r)?r:[r],o=new Map;await Promise.all(i.map(async u=>{const a=(u.Material||"").toString().trim();if(a&&!o.has(a))try{const l=await Me.toDataURL(a,{margin:0,width:100,errorCorrectionLevel:"M"});o.set(a,l)}catch(l){console.error("QR Code generation error:",l)}}));const n=new Date().getTime(),e=window.open("about:blank",n,"left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"),s=i.map((u,a)=>{const l=(u.Material||"").toString().trim(),c=o.get(l)||"";return`
        <div class="sticker-container" style="${a<i.length-1?"page-break-after: always;":""}">
            <div class="header">SPARE PART STICKER</div>
            <div class="ticket-number">${u["Ticket Number"]||"-"}</div>
            
            <div class="field highlight-field">
                <div class="label">Store Name:</div>
                <div class="value">${u.Brand||"-"}</div>
            </div>
            
            <div class="field highlight-field">
                <div class="label">Team:</div>
                <div class="value">${u.Team||"-"}</div>
            </div>
            
            <!-- Material & QR Row -->
            <div class="material-qr-container">
                <div class="material-info">
                    <div class="mat-label">Material:</div>
                    <div class="mat-value">${l||"-"}</div>
                </div>
                ${c?`<div class="qr-box"><img src="${c}" alt="QR" /></div>`:""}
            </div>

            <!-- Description Block -->
            <div class="desc-container">
                <div class="desc-label">Desc:</div>
                <div class="desc-value">${re(u)}</div>
            </div>

            <div class="footer">
                <div class="footer-label">ศูนย์พื้นที่:</div>
                <div class="footer-value">${ie(u.TeamPlant)}</div>
            </div>
        </div>
    `}).join("");e.document.write(`
        <html>
            <head>
                <title>Sticker Print</title>
                <style>
                    @page {
                        size: 80mm 100mm;
                        margin: 0;
                    }
                    *, *::before, *::after {
                        box-sizing: border-box;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: 'Prompt', sans-serif;
                        width: 80mm;
                        box-sizing: border-box;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .sticker-container {
                        border: 1.5px solid #000;
                        width: 76mm;
                        height: 96mm;
                        margin: 2mm auto;
                        padding: 2.2mm 3.2mm;
                        display: flex;
                        flex-direction: column;
                        box-sizing: border-box;
                        overflow: hidden;
                    }
                    .header {
                        text-align: center;
                        font-weight: 800;
                        font-size: 12pt;
                        border-bottom: 2px solid #000;
                        padding-bottom: 1.2mm;
                        margin-bottom: 1.2mm;
                        letter-spacing: 0.5px;
                        line-height: 1.15;
                    }
                    .ticket-number {
                        font-size: 15.5pt;
                        font-weight: 900;
                        text-align: center;
                        margin: 0 0 1.2mm 0;
                        padding: 1mm 2mm;
                        background: #f0f0f0;
                        border: 1px solid #ccc;
                        letter-spacing: 0.5px;
                        line-height: 1.15;
                    }
                    .field.highlight-field {
                        display: flex;
                        align-items: baseline;
                        margin-bottom: 1mm;
                        line-height: 1.2;
                    }
                    .field.highlight-field .label {
                        font-weight: 900;
                        width: 17mm;
                        min-width: 17mm;
                        font-size: 13.5pt;
                        line-height: 1.2;
                    }
                    .field.highlight-field .value {
                        flex: 1;
                        font-size: 14.5pt;
                        font-weight: 900;
                        line-height: 1.2;
                        word-break: break-word;
                    }
                    /* Material & QR Row */
                    .material-qr-container {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: 0.8mm;
                        margin-bottom: 1.2mm;
                        padding: 1mm 1.8mm;
                        background: #fdfdfd;
                        border: 1px solid #ddd;
                        border-radius: 3px;
                    }
                    .material-info {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                    }
                    .mat-label {
                        font-size: 11pt;
                        font-weight: 900;
                        color: #222;
                        line-height: 1.1;
                    }
                    .mat-value {
                        font-size: 17pt;
                        font-weight: 900;
                        letter-spacing: 0.5px;
                        line-height: 1.15;
                        color: #000;
                        margin-top: 0.5mm;
                    }
                    .qr-box {
                        width: 18mm;
                        height: 18mm;
                        min-width: 18mm;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #fff;
                        padding: 0.5mm;
                        border: 1px solid #ccc;
                        border-radius: 2px;
                        margin-left: 2mm;
                    }
                    .qr-box img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        display: block;
                    }
                    /* Description Block */
                    .desc-container {
                        display: flex;
                        flex-direction: column;
                        margin-bottom: 1.2mm;
                        line-height: 1.25;
                    }
                    .desc-label {
                        font-size: 11pt;
                        font-weight: 900;
                        color: #222;
                        line-height: 1.1;
                        margin-bottom: 0.3mm;
                    }
                    .desc-value {
                        font-size: 12.5pt;
                        font-weight: 800;
                        color: #000;
                        line-height: 1.25;
                        word-break: break-word;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    .footer {
                        border-top: 2px dashed #000;
                        padding-top: 1.5mm;
                        margin-top: auto;
                        text-align: center;
                    }
                    .footer-label {
                        font-size: 11pt;
                        font-weight: bold;
                        margin-bottom: 0.5mm;
                        line-height: 1.1;
                    }
                    .footer-value {
                        font-size: 23pt;
                        font-weight: 900;
                        line-height: 1.1;
                    }
                </style>
            </head>
            <body>
                ${s}
            </body>
        </html>
    `),e.document.close(),e.focus(),setTimeout(()=>{e.print(),e.close()},250)},Se=Object.freeze(Object.defineProperty({__proto__:null,printStickers:Pe},Symbol.toStringTag,{value:"Module"}));export{Me as Q,Pe as p,Se as s};
