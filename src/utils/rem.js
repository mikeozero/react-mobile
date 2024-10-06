function adapter() {
  const dip = document.documentElement.clientWidth  // phone width pix
  const rootFontSize = dip / 10  // calculate root font size
  document.documentElement.style.fontSize = rootFontSize + 'px'  // set root font size
}
adapter()

window.onresize = adapter