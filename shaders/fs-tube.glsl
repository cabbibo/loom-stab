
uniform sampler2D t_normal;
uniform sampler2D t_matcap;
uniform vec3 color;


varying vec3 vNorm;
varying vec3 vPos;
varying vec2 vUv;

varying vec3 vEye;

uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

$uvNormalMap
$semLookup

void main(){

  vec3 fNorm = uvNormalMap( t_normal , vPos , vUv * vec2( 100. , 1. ) , vNorm , .6 , 1. );

  vec3 col = fNorm * .5 + .5;

  col =  texture2D( t_matcap , semLookup( vEye , fNorm , modelViewMatrix , normalMatrix ) ).xyz;

  //col = texture2D( t_normal , vUv ).xyz;
  gl_FragColor = vec4( col * color ,  1. );
  
}