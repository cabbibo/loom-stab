

uniform vec3 startPoint;
uniform vec3 endPoint;

uniform vec3 startDir;
uniform vec3 endDir;


uniform float connectionType;


varying vec3 vNorm;
varying vec3 vPos;
varying vec2 vUv;

varying vec3 vEye;


$cubicCurve
$cubicFromValue


// from
// http://stackoverflow.com/questions/1560492/how-to-tell-whether-a-point-is-to-the-right-or-left-side-of-a-line
float isLeft( vec3 a , vec3 b , vec3 c ){
  return ((b.x - a.x)*(c.y - a.y) - (b.y - a.y)*(c.x - a.x));
}

void main() {


  vec3 upPos;
  vec3 doPos;

  float val = position.x * .95;

  vec3 pos = cubicFromValue( val  , startPoint , endPoint , startDir , endDir , upPos , doPos );

  vec3 d1 = normalize( pos - upPos );
  vec3 d2 = normalize( doPos - pos );

  vec3 curveDir =( d1 + d2 )/ 2.;
  vec3 curveX = normalize( cross( d1 , d2 ) );
  vec3 curveY = normalize( cross( curveDir, curveX ) );


  float left = isLeft( doPos , pos , upPos );
  
  float dirAngle = acos(dot(d1,d2) / (length(d1)* length(d2)));

  if(  left > 0.  ){ curveY *= -1.;  curveX *= -1.; }

  float angle = position.y * 2. * 3.14159;
  float radius = .03;

  vec3 fPos = pos + radius * curveX * sin( angle ) + radius * curveY * cos( angle );

  //fPos = pos + vec3( 0., 1. * position.y , 0.);

  vec3 norm = normalize( fPos - pos );

  vPos = fPos;
  vNorm = norm;
  vUv = position.xy;
  vEye = normalize( cameraPosition - vPos );

  //fPos = position;




  //vec3 dif = endPoint - startPoint;

  //vec3 pos = startPoint + dif * position.x;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( fPos , 1. );

}