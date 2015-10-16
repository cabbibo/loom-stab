

uniform vec3 startPoint;
uniform vec3 endPoint;

uniform vec3 startDir;
uniform vec3 endDir;


uniform float connectionType;

varying float vLength;

$cubicCurve
$cubicFromValue


void main() {


  vec3 upPos;
  vec3 doPos;

  vec3 pos = cubicFromValue( position.x , startPoint , endPoint , startDir , endDir , upPos , doPos );

  vLength = length( startPoint - endPoint );


  

  

  //vec3 dif = endPoint - startPoint;

  //vec3 pos = startPoint + dif * position.x;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos , 1. );

}