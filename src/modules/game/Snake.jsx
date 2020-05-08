import React from "react"
import "./snake.less"

class Snake extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 20,
      mapData: [],
      snake: [],
      target: [],
      direction: "R",
      pause: false,
      score: 0,
      interval: -1,
      time: 200,
      end: false,
      endMsg: "",
    }
    this.keydown = this.keydown.bind(this)
    this.move = this.move.bind(this)
    this.reset = this.reset.bind(this)
  }
  initMap() {
    let snake = [
      [4, 0],
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 0],
    ]
    var _data = []
    for (let i = 0; i < this.state.count; i++) {
      var _row = []
      for (let j = 0; j < this.state.count; j++) {
        _row.push(0)
      }
      _data.push(_row)
    }
    snake.forEach((e) => {
      _data[e[1]][e[0]] = 1
    })
    this.setState({
      snake: snake,
      mapData: _data,
    })
  }
  keydown(e) {
    let direction = this.state.direction
    switch (e.keyCode) {
      case 38:
        if (direction !== "D") {
          this.setState({
            direction: "U",
          })
        }
        break
      case 40:
        if (direction !== "U") {
          this.setState({
            direction: "D",
          })
        }
        break
      case 37:
        if (direction !== "R") {
          this.setState({
            direction: "L",
          })
        }
        break
      case 39:
        if (direction !== "L") {
          this.setState({
            direction: "R",
          })
        }
        break
      case 32:
        if (!this.state.end) {
          this.setState((state, props) => ({
            pause: !state.pause,
          }))
          if (this.state.interval === -1) {
            this.setState({
              interval: setInterval(this.move, this.state.time),
            })
          } else {
            clearInterval(this.state.interval)
            this.setState({
              interval: -1,
            })
          }
        }
        break
      default:
        break
    }
  }
  createOneTarget() {
    var valid = false,
      x,
      y,
      food,
      count = this.state.count,
      number = Math.ceil(Math.random() * count * count)
    while (!valid) {
      x = (number - 1) % count
      y = Math.ceil(number / count) - 1
      food = [x, y]
      if (this.exit(food)) {
        number++
        if (number > count * count) {
          number = number - count * count
        }
      } else {
        valid = true
      }
    }
    this.setState((state, props) => {
      state.mapData[y][x] = 2
      return {
        target: food,
        mapData: state.mapData,
      }
    })
  }
  exit(p) {
    var _exit = false
    this.state.snake.forEach((e) => {
      if (p[0] === e[0] && p[1] === e[1]) {
        _exit = true
        return
      }
    })
    return _exit
  }
  createNewHead() {
    var _snake = this.state.snake
    var _head = _snake[0]
    var _newHead = []
    switch (this.state.direction) {
      case "U":
        _newHead[0] = _head[0]
        _newHead[1] = _head[1] - 1
        break
      case "D":
        _newHead[0] = _head[0]
        _newHead[1] = _head[1] + 1
        break
      case "L":
        _newHead[0] = _head[0] - 1
        _newHead[1] = _head[1]
        break
      case "R":
        _newHead[0] = _head[0] + 1
        _newHead[1] = _head[1]
        break
      default:
        break
    }
    return _newHead
  }
  draw(h, t) {
    let data = this.state.mapData
    if (h) {
      data[h[1]][h[0]] = 1
    }
    if (t) {
      data[t[1]][t[0]] = 0
    }
    this.setState({
      mapData: data,
    })
  }
  move() {
    var _newHead = this.createNewHead(),
      _snake = this.state.snake,
      _count = this.state.count,
      _target = this.state.target,
      _tail
    //是否超出边界
    if (
      _newHead[0] < 0 ||
      _newHead[1] < 0 ||
      _newHead[0] > _count - 1 ||
      _newHead[1] > _count - 1
    ) {
      clearInterval(this.state.interval)
      this.setState({
        end: true,
        interval: -1,
        endMsg: "游戏结束！",
      })
      return
    } else {
      //是否撞到自己
      if (this.exit(_newHead)) {
        clearInterval(this.state.interval)
        this.setState({
          end: true,
          interval: -1,
          endMsg: "游戏结束！",
        })
        return
      }
    }
    _snake.unshift(_newHead)
    if (_target.length === 2 && _newHead.join("-") === _target.join("-")) {
      this.setState((state, props) => ({
        score: state.score + 1,
      }))
      if (_snake.length === _count * _count) {
        clearInterval(this.state.interval)
        this.setState({
          end: true,
          interval: -1,
          endMsg: "You Win",
        })
      } else {
        this.createOneTarget()
      }
    } else {
      _tail = _snake.pop()
    }
    this.draw(_newHead, _tail)
  }
  reset() {
    this.initMap()
    this.createOneTarget()
    this.setState((state, props) => {
      clearInterval(state.interval)
      return {
        end: false,
        interval: setInterval(this.move, this.state.time),
        endMsg: "",
        score: 0,
        direction: "R",
        pause: false,
      }
    })
  }
  componentDidMount() {
    this.initMap()
    this.createOneTarget()
    window.addEventListener("keydown", this.keydown)
    this.setState({
      interval: setInterval(this.move, this.state.time),
    })
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.keydown)
  }
  render() {
    return (
      <div className="snake-container">
        <table>
          <tbody>
            {this.state.mapData.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={i + "-" + j}
                    className={
                      (cell === 1 ? "active" : "") +
                      " " +
                      (cell === 2 ? "target" : "")
                    }
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p>空格暂停 上下左右移动</p>
        <button onClick={this.reset}>重新开始</button>
        <p className="score">得分：{this.state.score}</p>
        {this.state.end ? <p className="msg">{this.state.endMsg}</p> : null}
        {this.state.pause ? <p className="msg">暂停中...</p> : null}
      </div>
    )
  }
}
export default Snake
