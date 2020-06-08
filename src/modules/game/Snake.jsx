import React, { useState, useEffect, useCallback, useRef } from "react"
import "./snake.less"
// class 版本
// class Snake1 extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       count: 20,
//       mapData: [],
//       snake: [],
//       target: [],
//       direction: "R",
//       pause: false,
//       score: 0,
//       interval: -1,
//       time: 200,
//       end: false,
//       endMsg: "",
//     }
//     this.keydown = this.keydown.bind(this)
//     this.move = this.move.bind(this)
//     this.reset = this.reset.bind(this)
//   }
//   initMap() {
//     let snake = [
//       [4, 0],
//       [3, 0],
//       [2, 0],
//       [1, 0],
//       [0, 0],
//     ]
//     var _data = []
//     for (let i = 0; i < this.state.count; i++) {
//       var _row = []
//       for (let j = 0; j < this.state.count; j++) {
//         _row.push(0)
//       }
//       _data.push(_row)
//     }
//     snake.forEach((e) => {
//       _data[e[1]][e[0]] = 1
//     })
//     this.setState({
//       snake: snake,
//       mapData: _data,
//     })
//   }
//   keydown(e) {
//     let direction = this.state.direction
//     switch (e.keyCode) {
//       case 38:
//         if (direction !== "D") {
//           this.setState({
//             direction: "U",
//           })
//         }
//         break
//       case 40:
//         if (direction !== "U") {
//           this.setState({
//             direction: "D",
//           })
//         }
//         break
//       case 37:
//         if (direction !== "R") {
//           this.setState({
//             direction: "L",
//           })
//         }
//         break
//       case 39:
//         if (direction !== "L") {
//           this.setState({
//             direction: "R",
//           })
//         }
//         break
//       case 32:
//         if (!this.state.end) {
//           this.setState((state, props) => ({
//             pause: !state.pause,
//           }))
//           if (this.state.interval === -1) {
//             this.setState({
//               interval: setInterval(this.move, this.state.time),
//             })
//           } else {
//             clearInterval(this.state.interval)
//             this.setState({
//               interval: -1,
//             })
//           }
//         }
//         break
//       default:
//         break
//     }
//   }
//   createOneTarget() {
//     var valid = false,
//       x,
//       y,
//       food,
//       count = this.state.count,
//       number = Math.ceil(Math.random() * count * count)
//     while (!valid) {
//       x = (number - 1) % count
//       y = Math.ceil(number / count) - 1
//       food = [x, y]
//       if (this.exit(food)) {
//         number++
//         if (number > count * count) {
//           number = number - count * count
//         }
//       } else {
//         valid = true
//       }
//     }
//     this.setState((state, props) => {
//       state.mapData[y][x] = 2
//       return {
//         target: food,
//         mapData: state.mapData,
//       }
//     })
//   }
//   exit(p) {
//     var _exit = false
//     this.state.snake.forEach((e) => {
//       if (p[0] === e[0] && p[1] === e[1]) {
//         _exit = true
//         return
//       }
//     })
//     return _exit
//   }
//   createNewHead() {
//     var _snake = this.state.snake
//     var _head = _snake[0]
//     var _newHead = []
//     switch (this.state.direction) {
//       case "U":
//         _newHead[0] = _head[0]
//         _newHead[1] = _head[1] - 1
//         break
//       case "D":
//         _newHead[0] = _head[0]
//         _newHead[1] = _head[1] + 1
//         break
//       case "L":
//         _newHead[0] = _head[0] - 1
//         _newHead[1] = _head[1]
//         break
//       case "R":
//         _newHead[0] = _head[0] + 1
//         _newHead[1] = _head[1]
//         break
//       default:
//         break
//     }
//     return _newHead
//   }
//   draw(h, t) {
//     let data = this.state.mapData
//     if (h) {
//       data[h[1]][h[0]] = 1
//     }
//     if (t) {
//       data[t[1]][t[0]] = 0
//     }
//     this.setState({
//       mapData: data,
//     })
//   }
//   move() {
//     var _newHead = this.createNewHead(),
//       _snake = this.state.snake,
//       _count = this.state.count,
//       _target = this.state.target,
//       _tail
//     //是否超出边界
//     if (
//       _newHead[0] < 0 ||
//       _newHead[1] < 0 ||
//       _newHead[0] > _count - 1 ||
//       _newHead[1] > _count - 1
//     ) {
//       clearInterval(this.state.interval)
//       this.setState({
//         end: true,
//         interval: -1,
//         endMsg: "游戏结束！",
//       })
//       return
//     } else {
//       //是否撞到自己
//       if (this.exit(_newHead)) {
//         clearInterval(this.state.interval)
//         this.setState({
//           end: true,
//           interval: -1,
//           endMsg: "游戏结束！",
//         })
//         return
//       }
//     }
//     _snake.unshift(_newHead)
//     if (_target.length === 2 && _newHead.join("-") === _target.join("-")) {
//       this.setState((state, props) => ({
//         score: state.score + 1,
//       }))
//       if (_snake.length === _count * _count) {
//         clearInterval(this.state.interval)
//         this.setState({
//           end: true,
//           interval: -1,
//           endMsg: "You Win",
//         })
//       } else {
//         this.createOneTarget()
//       }
//     } else {
//       _tail = _snake.pop()
//     }
//     this.draw(_newHead, _tail)
//   }
//   reset() {
//     this.initMap()
//     this.createOneTarget()
//     this.setState((state, props) => {
//       clearInterval(state.interval)
//       return {
//         end: false,
//         interval: setInterval(this.move, this.state.time),
//         endMsg: "",
//         score: 0,
//         direction: "R",
//         pause: false,
//       }
//     })
//   }
//   componentDidMount() {
//     this.initMap()
//     this.createOneTarget()
//     window.addEventListener("keydown", this.keydown)
//     this.setState({
//       interval: setInterval(this.move, this.state.time),
//     })
//   }
//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.keydown)
//   }
//   render() {
//     return (
//       <div className="snake-container">
//         <table>
//           <tbody>
//             {this.state.mapData.map((row, i) => (
//               <tr key={i}>
//                 {row.map((cell, j) => (
//                   <td
//                     key={i + "-" + j}
//                     className={
//                       (cell === 1 ? "active" : "") +
//                       " " +
//                       (cell === 2 ? "target" : "")
//                     }
//                   ></td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <p>空格暂停 上下左右移动</p>
//         <button onClick={this.reset}>重新开始</button>
//         <p className="score">得分：{this.state.score}</p>
//         {this.state.end ? <p className="msg">{this.state.endMsg}</p> : null}
//         {this.state.pause ? <p className="msg">暂停中...</p> : null}
//       </div>
//     )
//   }
// }

// hooks 版本
const Snake = () => {
  const countRef = useRef(20)
  const snakeRef = useRef()
  const directionRef = useRef("R")
  const targetRef = useRef([])
  const timeRef = useRef(200)
  const intervalRef = useRef(-1)
  const [score, setScore] = useState(0)
  const [pause, setPause] = useState(false)
  const [end, setEnd] = useState(false)
  const [endMsg, setEndMsg] = useState("")
  const [mapData, setMapData] = useState([])

  const exit = useCallback((p) => {
    let _exit = false
    snakeRef.current.forEach((e) => {
      if (p[0] === e[0] && p[1] === e[1]) {
        _exit = true
        return
      }
    })
    return _exit
  }, [])

  const createOneTarget = useCallback(() => {
    var valid = false,
      x,
      y,
      food,
      number = Math.ceil(Math.random() * countRef.current * countRef.current)
    while (!valid) {
      x = (number - 1) % countRef.current
      y = Math.ceil(number / countRef.current) - 1
      food = [x, y]
      if (exit(food)) {
        number++
        if (number > countRef.current * countRef.current) {
          number = number - countRef.current * countRef.current
        }
      } else {
        valid = true
      }
    }
    setMapData((mapData) => {
      mapData[y][x] = 2
      return mapData
    })
    targetRef.current = food
  }, [exit])

  const createNewHead = useCallback(() => {
    var _head = snakeRef.current[0]
    var _newHead = []
    switch (directionRef.current) {
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
  }, [])

  const move = useCallback(() => {
    let _newHead = createNewHead()
    let _snake = JSON.parse(JSON.stringify(snakeRef.current))
    let _tail = []
    //是否超出边界
    if (
      _newHead[0] < 0 ||
      _newHead[1] < 0 ||
      _newHead[0] > countRef.current - 1 ||
      _newHead[1] > countRef.current - 1
    ) {
      clearInterval(intervalRef.current)
      setEnd(true)
      setEndMsg("游戏结束！")
      return
    } else {
      //是否撞到自己
      if (exit(_newHead)) {
        clearInterval(intervalRef.current)
        setEnd(true)
        setEndMsg("游戏结束！")
        return
      }
    }
    _snake.unshift(_newHead)
    if (
      targetRef.current.length === 2 &&
      _newHead.join("-") === targetRef.current.join("-")
    ) {
      setScore((prevScore) => prevScore + 1)
      if (_snake.length === countRef.current * countRef.current) {
        clearInterval(intervalRef.current)
        setEnd(true)
        setEndMsg("You Win")
      } else {
        createOneTarget()
      }
    } else {
      _tail = _snake.pop()
    }
    snakeRef.current = _snake
    setMapData((mapData) => {
      let _mapData = JSON.parse(JSON.stringify(mapData))
      if (_newHead.length) {
        _mapData[_newHead[1]][_newHead[0]] = 1
      }
      if (_tail.length) {
        _mapData[_tail[1]][_tail[0]] = 0
      }
      return _mapData
    })
  }, [createNewHead, createOneTarget, exit])

  const keydownEvent = useCallback(
    (e) => {
      switch (e.keyCode) {
        case 38:
          directionRef.current =
            directionRef.current !== "D" ? "U" : directionRef.current
          break
        case 40:
          directionRef.current =
            directionRef.current !== "U" ? "D" : directionRef.current
          break
        case 37:
          directionRef.current =
            directionRef.current !== "R" ? "L" : directionRef.current
          break
        case 39:
          directionRef.current =
            directionRef.current !== "L" ? "R" : directionRef.current
          break
        case 32:
          if (!end) {
            setPause((pause) => !pause)
            if (intervalRef.current === -1) {
              intervalRef.current = setInterval(move, timeRef.current)
            } else {
              clearInterval(intervalRef.current)
              intervalRef.current = -1
            }
          }
          break
        default:
          break
      }
    },
    [end, move]
  )

  const initMap = useCallback(() => {
    snakeRef.current = [
      [4, 0],
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 0],
    ]

    let _data = []
    for (let i = 0; i < countRef.current; i++) {
      let _row = []
      for (let j = 0; j < countRef.current; j++) {
        _row.push(0)
      }
      _data.push(_row)
    }
    snakeRef.current.forEach((e) => {
      _data[e[1]][e[0]] = 1
    })
    setMapData(_data)
    createOneTarget()
  }, [createOneTarget])

  useEffect(() => {
    initMap()
  }, [initMap])

  useEffect(() => {
    intervalRef.current = setInterval(move, timeRef.current)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [move])

  useEffect(() => {
    window.addEventListener("keydown", keydownEvent)
    return () => {
      window.removeEventListener("keydown", keydownEvent)
    }
  }, [keydownEvent])

  const reset = () => {
    clearInterval(intervalRef.current)
    directionRef.current = "R"
    intervalRef.current = setInterval(move, timeRef.current)
    setScore(0)
    setEnd(false)
    setEndMsg("")
    setPause(false)
    initMap()
  }

  return (
    <div className="snake-container">
      <table>
        <tbody>
          {mapData.map((row, i) => (
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
      <button onClick={reset}>重新开始</button>
      <p className="score">得分：{score}</p>
      {end ? <p className="msg">{endMsg}</p> : null}
      {pause ? <p className="msg">暂停中...</p> : null}
    </div>
  )
}
export default Snake
