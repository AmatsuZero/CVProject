// 需要先安装 imagemagick
const { promisify } = require("util");
const writeFile = promisify(require("fs").writeFile);
const TextToSVG = require("text-to-svg");
const svgToImg = require("svg-to-img");

const rawSize = 1024;
//考虑到图标可能会被切成圆角，计算尺寸使用内切圆的内接正方形
const fontSize = Math.sqrt(2) * 1024 / 2;

const textToSVG = TextToSVG.loadSync();
const SVG = textToSVG.getSVG(process.env.lastName, {
  x: rawSize - fontSize,
  y: rawSize - fontSize,
  fontSize: Math.pow(fontSize, 2),
  anchor: "top"
});

(async () => {
  const image = await svgToImg.from(SVG).toPng({
    background: "white",
    width: rawSize,
    height: rawSize
  });
  writeFile("icon.png", image);
})();
