import Rx from 'rx'

const target = document.querySelector('#table')
const mousedown = Rx.Observable.fromEvent(target, 'mousedown')
const mousemove = Rx.Observable.fromEvent(document, 'mousemove')
const mouseup = Rx.Observable.fromEvent(target, 'mouseup')

const mousedrag =
  mousedown
    .flatMap(md => mousemove.map(mm => {
      mm.preventDefault()
      return {
        left: mm.clientX = md.offsetX,
        top: mm.clientY = md.offsetY
      }
    }).takeUntil(mouseup))
