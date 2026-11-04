// Project videos play muted while they're on screen and pause when they leave.
// A clip with data-start (SwingIQ) starts at the interesting part and loops back to it.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

function play(video) {
  const start = Number(video.dataset.start || 0)
  video.preload = "auto"
  if (start && !video.dataset.armed) {
    video.dataset.armed = "1"
    const seek = () => { if (video.currentTime < start) video.currentTime = start }
    if (video.readyState >= 1) seek()
    else video.addEventListener("loadedmetadata", seek, { once: true })
    video.addEventListener("ended", () => {
      if (!video.muted) return
      video.currentTime = start
      video.play().catch(() => {})
    })
  }
  video.play().catch(() => {})
}

if (!reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      // Leave a video alone once someone has unmuted it to watch with sound
      if (!target.muted) continue
      if (isIntersecting) play(target)
      else target.pause()
    }
  }, { threshold: 0.5 })
  document.querySelectorAll("video").forEach((v) => io.observe(v))
}
