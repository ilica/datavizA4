// https://observablehq.com/@d3/color-schemes@292
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Color Schemes
## Including Every ColorBrewer Scale

Click any [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic) scheme below to copy it to the clipboard.`
)});
  main.variable(observer("viewof n")).define("viewof n", ["html","d3"], function(html,d3){return(
html`<select>
  <option value=256>continuous</option>${d3.range(11, 2, -1).map(n => `
  <option value=${n}>discrete (${n})</option>`)}
</select>`
)});
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer("sequential")).define("sequential", ["md"], function(md){return(
md`## Sequential (Single-Hue)`
)});
  main.variable(observer("Blues")).define("Blues", ["ramp"], function(ramp){return(
ramp("Blues")
)});
  main.variable(observer("Greens")).define("Greens", ["ramp"], function(ramp){return(
ramp("Greens")
)});
  main.variable(observer("Greys")).define("Greys", ["ramp"], function(ramp){return(
ramp("Greys")
)});
  main.variable(observer("Oranges")).define("Oranges", ["ramp"], function(ramp){return(
ramp("Oranges")
)});
  main.variable(observer("Purples")).define("Purples", ["ramp"], function(ramp){return(
ramp("Purples")
)});
  main.variable(observer("Reds")).define("Reds", ["ramp"], function(ramp){return(
ramp("Reds")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Sequential (Multi-Hue)`
)});
  main.variable(observer("BuGn")).define("BuGn", ["ramp"], function(ramp){return(
ramp("BuGn")
)});
  main.variable(observer("BuPu")).define("BuPu", ["ramp"], function(ramp){return(
ramp("BuPu")
)});
  main.variable(observer("GnBu")).define("GnBu", ["ramp"], function(ramp){return(
ramp("GnBu")
)});
  main.variable(observer("OrRd")).define("OrRd", ["ramp"], function(ramp){return(
ramp("OrRd")
)});
  main.variable(observer("PuBuGn")).define("PuBuGn", ["ramp"], function(ramp){return(
ramp("PuBuGn")
)});
  main.variable(observer("PuBu")).define("PuBu", ["ramp"], function(ramp){return(
ramp("PuBu")
)});
  main.variable(observer("PuRd")).define("PuRd", ["ramp"], function(ramp){return(
ramp("PuRd")
)});
  main.variable(observer("RdPu")).define("RdPu", ["ramp"], function(ramp){return(
ramp("RdPu")
)});
  main.variable(observer("YlGnBu")).define("YlGnBu", ["ramp"], function(ramp){return(
ramp("YlGnBu")
)});
  main.variable(observer("YlGn")).define("YlGn", ["ramp"], function(ramp){return(
ramp("YlGn")
)});
  main.variable(observer("YlOrBr")).define("YlOrBr", ["ramp"], function(ramp){return(
ramp("YlOrBr")
)});
  main.variable(observer("YlOrRd")).define("YlOrRd", ["ramp"], function(ramp){return(
ramp("YlOrRd")
)});
  main.variable(observer("Cividis")).define("Cividis", ["ramp"], function(ramp){return(
ramp("Cividis")
)});
  main.variable(observer("Viridis")).define("Viridis", ["ramp"], function(ramp){return(
ramp("Viridis")
)});
  main.variable(observer("Inferno")).define("Inferno", ["ramp"], function(ramp){return(
ramp("Inferno")
)});
  main.variable(observer("Magma")).define("Magma", ["ramp"], function(ramp){return(
ramp("Magma")
)});
  main.variable(observer("Plasma")).define("Plasma", ["ramp"], function(ramp){return(
ramp("Plasma")
)});
  main.variable(observer("Warm")).define("Warm", ["ramp"], function(ramp){return(
ramp("Warm")
)});
  main.variable(observer("Cool")).define("Cool", ["ramp"], function(ramp){return(
ramp("Cool")
)});
  main.variable(observer("CubehelixDefault")).define("CubehelixDefault", ["ramp"], function(ramp){return(
ramp("CubehelixDefault")
)});
  main.variable(observer("Turbo")).define("Turbo", ["ramp"], function(ramp){return(
ramp("Turbo")
)});
  main.variable(observer("diverging")).define("diverging", ["md"], function(md){return(
md`## Diverging`
)});
  main.variable(observer("BrBG")).define("BrBG", ["ramp"], function(ramp){return(
ramp("BrBG")
)});
  main.variable(observer("PRGn")).define("PRGn", ["ramp"], function(ramp){return(
ramp("PRGn")
)});
  main.variable(observer("PiYG")).define("PiYG", ["ramp"], function(ramp){return(
ramp("PiYG")
)});
  main.variable(observer("PuOr")).define("PuOr", ["ramp"], function(ramp){return(
ramp("PuOr")
)});
  main.variable(observer("RdBu")).define("RdBu", ["ramp"], function(ramp){return(
ramp("RdBu")
)});
  main.variable(observer("RdGy")).define("RdGy", ["ramp"], function(ramp){return(
ramp("RdGy")
)});
  main.variable(observer("RdYlBu")).define("RdYlBu", ["ramp"], function(ramp){return(
ramp("RdYlBu")
)});
  main.variable(observer("RdYlGn")).define("RdYlGn", ["ramp"], function(ramp){return(
ramp("RdYlGn")
)});
  main.variable(observer("Spectral")).define("Spectral", ["ramp"], function(ramp){return(
ramp("Spectral")
)});
  main.variable(observer("cyclical")).define("cyclical", ["md"], function(md){return(
md`## Cyclical`
)});
  main.variable(observer("Rainbow")).define("Rainbow", ["ramp"], function(ramp){return(
ramp("Rainbow")
)});
  main.variable(observer("Sinebow")).define("Sinebow", ["ramp"], function(ramp){return(
ramp("Sinebow")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Categorical`
)});
  main.variable(observer("Category10")).define("Category10", ["swatches"], function(swatches){return(
swatches("Category10")
)});
  main.variable(observer("Accent")).define("Accent", ["swatches"], function(swatches){return(
swatches("Accent")
)});
  main.variable(observer("Dark2")).define("Dark2", ["swatches"], function(swatches){return(
swatches("Dark2")
)});
  main.variable(observer("Paired")).define("Paired", ["swatches"], function(swatches){return(
swatches("Paired")
)});
  main.variable(observer("Pastel1")).define("Pastel1", ["swatches"], function(swatches){return(
swatches("Pastel1")
)});
  main.variable(observer("Pastel2")).define("Pastel2", ["swatches"], function(swatches){return(
swatches("Pastel2")
)});
  main.variable(observer("Set1")).define("Set1", ["swatches"], function(swatches){return(
swatches("Set1")
)});
  main.variable(observer("Set2")).define("Set2", ["swatches"], function(swatches){return(
swatches("Set2")
)});
  main.variable(observer("Set3")).define("Set3", ["swatches"], function(swatches){return(
swatches("Set3")
)});
  main.variable(observer("Tableau10")).define("Tableau10", ["swatches"], function(swatches){return(
swatches("Tableau10")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Appendix`
)});
  main.variable(observer("swatches")).define("swatches", ["d3","svg","copy","html"], function(d3,svg,copy,html){return(
function swatches(name) {
  const colors = d3[`scheme${name}`];
  const n = colors.length;
  const dark = d3.lab(colors[0]).l < 50;;
  const canvas = svg`<svg viewBox="0 0 ${n} 1" style="display:block;width:${n * 33}px;height:33px;margin:0 -14px;cursor:pointer;">${colors.map((c, i) => svg`<rect x=${i} width=1 height=1 fill=${c}>`)}`;
  const label = document.createElement("DIV");
  label.textContent = name;
  label.style.position = "absolute";
  label.style.top = "4px";
  label.style.color = dark ? `#fff` : `#000`;
  canvas.onclick = () => {
    label.textContent = "Copied!";
    copy(JSON.stringify(colors));
    setTimeout(() => label.textContent = name, 2000);
  };
  return html`${canvas}${label}`;
}
)});
  main.variable(observer("ramp")).define("ramp", ["d3","n","svg","DOM","copy","html"], function(d3,n,svg,DOM,copy,html){return(
function ramp(name) {
  let canvas;
  let colors;
  let dark;
  if (d3[`scheme${name}`] && d3[`scheme${name}`][n]) {
    colors = d3[`scheme${name}`][n];
    dark = d3.lab(colors[0]).l < 50;
  } else {
    const interpolate = d3[`interpolate${name}`];
    colors = [];
    dark = d3.lab(interpolate(0)).l < 50;
    for (let i = 0; i < n; ++i) {
      colors.push(d3.rgb(interpolate(i / (n - 1))).hex());
    }
  }
  if (n < 128) {
    canvas = svg`<svg viewBox="0 0 ${n} 1" style="display:block;shape-rendering:crispEdges;width:calc(100% + 28px);height:33px;margin:0 -14px;cursor:pointer;" preserveAspectRatio="none">${colors.map((c, i) => svg`<rect x=${i} width=1 height=1 fill=${c}>`)}`;
  } else {
    const context = (canvas = DOM.canvas(n, 1)).getContext("2d");
    canvas.style.margin = "0 -14px";
    canvas.style.width = "calc(100% + 28px)";
    canvas.style.height = "33px";
    canvas.style.cursor = "pointer";
    for (let i = 0; i < n; ++i) {
      context.fillStyle = colors[i];
      context.fillRect(i, 0, 1, 1);
    }
  }
  const label = document.createElement("DIV");
  label.textContent = name;
  label.style.position = "absolute";
  label.style.top = "4px";
  label.style.color = dark ? `#fff` : `#000`;
  canvas.onclick = () => {
    label.textContent = "Copied!";
    copy(JSON.stringify(colors));
    setTimeout(() => label.textContent = name, 2000);
  };
  return html`${canvas}${label}`;
}
)});
  main.variable(observer("copy")).define("copy", function(){return(
function copy(text) {
  const fakeElem = document.body.appendChild(document.createElement("input"));
  fakeElem.style.position = "absolute";
  fakeElem.style.left = "-9999px";
  fakeElem.setAttribute("readonly", "");
  fakeElem.value = "" + text;
  fakeElem.select();
  try {
    return document.execCommand("copy");
  } catch (err) {
    return false;
  } finally {
    fakeElem.parentNode.removeChild(fakeElem);
  }
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3-array@1", "d3-color@1", "d3-scale-chromatic@^1.4.0")
)});
  return main;
}
