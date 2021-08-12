// ES6 语法，直接原先需要在支持ES6 的浏览器中，比如chrome
// 定义最大的 fontSize，避免屏幕分辨率过大导致 fonSize 过大
const MAX_FONT_SIZE = 42

document.addEventListener('DOMContentLoaded', () => {
// 获取 html 标签
  const html = document.querySelector('html')
  // 屏幕的宽度除以10，获取根元素 fontSize 标准
  let fontSize = window.innerWidth / 10
  // 获取到的fontSize 标准不允许超过我们定义的最大值
  fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
  // 定义根元素 fontSize 的大小
  html.style.fontSize = fontSize + 'px'
})
