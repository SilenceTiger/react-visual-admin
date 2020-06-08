const G = 8 //万有引力常数

export const Ball = function (m, r, color, location, speed) {
  this.m = m
  this.r = r
  this.color = color
  this.location = location
  this.speed = speed
}

export const Vector2 = function (x, y) {
  this.x = x
  this.y = y
}

//球体间距离
export const getDistance = function (ball1, ball2) {
  return Math.sqrt(
    (ball1.location.x - ball2.location.x) *
      (ball1.location.x - ball2.location.x) +
      (ball1.location.y - ball2.location.y) *
        (ball1.location.y - ball2.location.y)
  )
}
//万有引力
export const getForce = function (ball1, ball2) {
  let F = (G * ball1.m * ball2.m) / getDistance(ball1, ball2)
  //力的方向 ball1=>sun ball2=>earth
  let direction = new Vector2(
    ball1.location.x - ball2.location.x,
    ball1.location.y - ball2.location.y
  )
  let directionDistanse = Math.sqrt(
    direction.x * direction.x + direction.y * direction.y
  )
  return new Vector2(
    (direction.x * F) / directionDistanse,
    (direction.y * F) / directionDistanse
  )
}
//加速度
export const getA = function (F, ball) {
  return new Vector2(F.x / ball.m, F.y / ball.m)
}
//速度
export const getSpeed = function (speed, a, t) {
  return new Vector2(speed.x + a.x * t, speed.y + a.y * t)
}
//位置偏移量
export const getS = function (speed, a, t) {
  return new Vector2(
    speed.x * t + (a.x * t * t) / 2,
    speed.y * t + (a.y * t * t) / 2
  )
}
