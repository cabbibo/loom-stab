
vec3 cubicFromValue( in float val , in vec3 startP , in vec3 endP , in vec3 startDir , in vec3 endDir , out vec3 upPos , out vec3 doPos ){

  vec3 dir = endP - startP;

  vec3 endPDown = endPoint + endDir - .1 * dir;
  vec3 startPUp = startPoint + startDir + .1 * dir;

  vec3 p0 = vec3(0.);
  vec3 v0 = vec3(0.);
  vec3 p1 = vec3(0.);
  vec3 v1 = vec3(0.);

  vec3 p2 = vec3(0.);


  float base = val * 3.;
  float baseUp   = floor( base );
  float baseDown = ceil( base );
  float amount = base - baseUp;

  if( baseUp == 0. ){

      p0 = startP;
      p1 = startPUp;
      p2 = endPDown;


      v1 = .5 * ( p2 - p0 );

  }else if( baseDown == 3. ){

      p0 = endPDown;
      p1 = endP;
      p2 = startPUp;

      v0 = .5 * ( p1 - p2 );

  }else if( baseUp == 1. ){

      p0 = startPUp;
      p1 = endPDown;


      vec3 pMinus;

      pMinus = startP;
      p2 = endP;

      v1 = .5 * ( p2 - p0 );
      v0 = .5 * ( p1 - pMinus );

  }


  vec3 c0 = p0;
  vec3 c1 = p0 + v0/3.;
  vec3 c2 = p1 - v1/3.;
  vec3 c3 = p1;


  vec3 pos = cubicCurve( amount , c0 , c1 , c2 , c3 );

  upPos = cubicCurve( amount  + .01 , c0 , c1 , c2 , c3 );
  doPos = cubicCurve( amount  - .01 , c0 , c1 , c2 , c3 );

  return pos;


}
