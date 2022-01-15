
console.log('clender-scroll');
export default function scrollWeekRow(node, scrollCount) {
  const _scrollCount = scrollCount || 5
  let delayCount = 0;
  function handleScrolling(e) {
    const direction = e.wheelDeltaY / Math.abs(e.wheelDeltaY);
    if ((direction > 0 && delayCount >= 0) || (delayCount <= 0 && direction < 0)) {
      delayCount += direction;
    }
    else if ((direction > 0 && delayCount < 0) || (delayCount > 0 && direction < 0)) {
      delayCount = direction;
    }
    if (Math.abs(delayCount) >= _scrollCount) {
      node.dispatchEvent(new CustomEvent('calender-scroll', { detail: { direction } }));
      delayCount = 0;
    }
  }
  // node add event-listener
  node.addEventListener('wheel', handleScrolling, false)

  return {
    destroy: () => {
      node.removeEventListener('wheel', handleScrolling, false)

    },
  }
}