(function paintMarble() {
  const width = 900;
  const height = 1400;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  const wash = ctx.createLinearGradient(0, 0, width, height);
  wash.addColorStop(0, "#160d0a");
  wash.addColorStop(0.45, "#0c0705");
  wash.addColorStop(1, "#130b08");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, width, height);

  const pixels = ctx.getImageData(0, 0, width, height);
  const data = pixels.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 14;
    data[i] = Math.max(0, Math.min(255, data[i] + n));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n * 0.5));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n * 0.3));
  }
  ctx.putImageData(pixels, 0, 0);

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  function drawStoneVein(startX, startY, angle, branches) {
    let x = startX;
    let y = startY;
    let a = angle;
    const steps = 14 + Math.floor(Math.random() * 18);
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let i = 0; i < steps; i += 1) {
      a += (Math.random() - 0.5) * 0.85;
      const len = 28 + Math.random() * 46;
      const cx = x + Math.cos(a) * len * 0.5 + (Math.random() - 0.5) * 18;
      const cy = y + Math.sin(a) * len * 0.5 + (Math.random() - 0.5) * 18;
      x += Math.cos(a) * len;
      y += Math.sin(a) * len;
      ctx.quadraticCurveTo(cx, cy, x, y);
      if (branches && Math.random() < 0.18) {
        drawStoneVein(x, y, a + (Math.random() - 0.5) * 1.3, false);
      }
    }
    const widthMain = 1.4 + Math.random() * 2.2;
    ctx.strokeStyle = "rgba(168, 62, 22, 0.38)";
    ctx.lineWidth = widthMain + 2.2;
    ctx.stroke();
    ctx.strokeStyle = "rgba(204, 96, 36, 0.72)";
    ctx.lineWidth = widthMain;
    ctx.stroke();
    ctx.strokeStyle = "rgba(240, 176, 92, 0.55)";
    ctx.lineWidth = Math.max(0.4, widthMain * 0.32);
    ctx.stroke();
  }

  for (let i = 0; i < 11; i += 1) {
    drawStoneVein(
      Math.random() * width,
      Math.random() * height,
      Math.random() * Math.PI * 2,
      true
    );
  }

  const texture = canvas.toDataURL("image/jpeg", 0.92);
  document.querySelectorAll(".marble").forEach((panel) => {
    panel.style.backgroundImage = [
      "radial-gradient(ellipse at 20% 25%, rgba(196, 90, 28, 0.12), transparent 40%)",
      `url("${texture}")`,
    ].join(", ");
    panel.style.backgroundSize = "auto, 100cqw 100cqh";
  });
})();
