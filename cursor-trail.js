<script>
  const canvas = document.getElementById("cursorCanvas");
  const ctx = canvas.getContext("2d");

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  let points = []; // Stores trail points

  function updateCanvasSize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener("resize", updateCanvasSize);

  document.addEventListener("mousemove", (e) => {
    points.push({ x: e.clientX, y: e.clientY, alpha: 1 });

    if (points.length > 50) {
      points.shift(); // Remove oldest point to maintain trail length
    }
  });

  function drawTrail() {
    ctx.clearRect(0, 0, width, height);

    if (points.length < 2) return;

    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    for (let i = 1; i < points.length; i++) {
      let p1 = points[i - 1];
      let p2 = points[i];

      ctx.beginPath();

      // Gradient effect for fading trail
      let gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      gradient.addColorStop(0, `rgba(255, 0, 150, ${p1.alpha})`); // Pink
      gradient.addColorStop(1, `rgba(0, 255, 255, ${p2.alpha})`); // Cyan

      ctx.strokeStyle = gradient;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    // Reduce opacity of old points to create fade effect
    for (let i = 0; i < points.length; i++) {
      points[i].alpha -= 0.02;
      if (points[i].alpha <= 0) {
        points.splice(i, 1);
        i--;
      }
    }

    requestAnimationFrame(drawTrail);
  }

  drawTrail();
</script>
