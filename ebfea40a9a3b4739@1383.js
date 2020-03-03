// https://observablehq.com/d/ebfea40a9a3b4739@1383
import define1 from "./c7e2ddcdd503d595@292.js";
import define2 from "./576f8943dbfbd395@109.js";
import define3 from "./e93997d5089d7165@2227.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# United States 2017-2018 Congressional Race FEC Filings Cartogram

Select from dropdown menu to change dataset, hover over bar to see details`
)});
  main.variable(observer("chart")).define("chart", ["d3","DOM","_width","margin","height","bgColor","cartogram_data","x_column","y_column","state_size","xAxis","selectedEncoding","x","z","getColor","getText","axisPosition","textColor"], function(d3,DOM,_width,margin,height,bgColor,cartogram_data,x_column,y_column,state_size,xAxis,selectedEncoding,x,z,getColor,getText,axisPosition,textColor)
{
  const svg = d3.select(DOM.svg(_width + margin.left + margin.right, height + margin.top + margin.bottom))
  const background = svg.append('rect')
    .attr('width', _width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('fill', bgColor)
  
  const g = svg
      .attr('preserveAspectRatio', 'xMidYMid')
    .append('g')
      .attr('transform', `translate(${margin.left + margin.right}, ${margin.top - margin.bottom})`)
    
  const states = g.selectAll('.states')
    .data(cartogram_data)
    .enter().append('g')
    .attr('class', 'state-groups');
    
 states.append('g')
   .attr('transform', d => `translate(${x_column(d)}, ${y_column(d) + state_size})`)
   .call(xAxis)
  
 states.append('g')
    .attr('transform', d => `translate(${x_column(d)}, ${y_column(d)})`)
 .selectAll('.bar')
    .data(d => d.data[selectedEncoding]).enter()
    .append('rect')
      .attr('x', d => x(d.key))
      .attr('y', d => z(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => z(0) - z(d.value))
      .attr('fill', getColor)
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .append('title').text(getText)
      .on('mouseover', function (d, i) {
          d3.select(this).transition()
               .duration('50')
               .attr('opacity', '.85');
      })
     .on('mouseout', function (d, i) {
          d3.select(this).transition()
               .duration('50')
               .attr('opacity', '1');
      })  



  states.append('text')
    .attr('class', 'state-label')
    .attr('dominant-baseline', 'central')
    .attr('x', ({column}) => axisPosition(column))
    .attr('y', ({row}) => axisPosition(row))
    .attr('text-anchor', 'middle')
    .attr('font-size', 12)
    .attr('font-family', 'Helvetica')
    .attr('fill', textColor)
    .text(d => d.state_postal);
  
  return svg.node()
}
);
  main.variable(observer()).define(["DOM","serialize","chart"], async function(DOM,serialize,chart){return(
DOM.download(await serialize(chart), 'chart.svg', 'Download as svg')
)});
  main.variable(observer("viewof selectedEncoding")).define("viewof selectedEncoding", ["select"], function(select){return(
select({
  title: 'Dataset',
  description: 'Pick dataset to encode for bar height and color',
  options: ['Individual_Contributions', 'Total_Receipts','From_Candidate','Debts_owed_by'],
  value: 'Individual_Contributions'
})
)});
  main.variable(observer("selectedEncoding")).define("selectedEncoding", ["Generators", "viewof selectedEncoding"], (G, _) => G.input(_));
  main.variable(observer("viewof bgColor")).define("viewof bgColor", ["color"], function(color){return(
color({
  value: "#1a1a1a",
  title: "Background Color"
})
)});
  main.variable(observer("bgColor")).define("bgColor", ["Generators", "viewof bgColor"], (G, _) => G.input(_));
  main.variable(observer("viewof textColor")).define("viewof textColor", ["color"], function(color){return(
color({
  value: "#dddddd",
  title: "Text Color"
})
)});
  main.variable(observer("textColor")).define("textColor", ["Generators", "viewof textColor"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`### Data Handling Functions`
)});
  main.variable(observer("getColor")).define("getColor", ["getCandidate","selectedEncoding"], function(getCandidate,selectedEncoding){return(
d => {
  var affil = getCandidate(d,selectedEncoding).affil;
  if (affil == 1){
    return "#0000FF";
  }
  else if (affil == 2){
    return "#FF0000";
  }
  else{
    return "#00FF00";
    console.log(affil);
  }
}
)});
  main.variable(observer("getText")).define("getText", ["getCandidate","selectedEncoding","numberWithCommas","reverseName","titleCase"], function(getCandidate,selectedEncoding,numberWithCommas,reverseName,titleCase){return(
d => {
  var candidate = getCandidate(d,selectedEncoding);
  var district = candidate.district;
  if (d.value){
    var value = numberWithCommas(d.value);
  }
  else{
    value = d.value;
  }
  if (candidate.name){
    var name = reverseName(candidate.name);
    name = titleCase(name);
  }
  else{
    name = candidate.name;
  }
  let text
  switch(selectedEncoding) {
    case 'Individual_Contributions': {
      text = `$${(value)} recieved`
      break
    }
    case 'Total_Receipts': {
      text = `$${(value)} recieved`
      break
    }
    case 'Debts_owed_by': {
      text = `$${(value)} owed`
      break
    }

    default:
      text = `${value}`
      break
  }
  if (district > 0){
    return `${name} running for District ${district} \n ${text} in ${d.state} `
  }
  else{
    return `${name} running for Senate \n ${text} in ${d.state} `
  }
}
)});
  main.variable(observer("titleCase")).define("titleCase", function(){return(
function titleCase(str) {
        return str.replace(
            /\w*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
)});
  main.variable(observer("reverseName")).define("reverseName", function(){return(
function reverseName(name){
  var last = name.split(', ');
  last[1] = last[1].split(" ")[0];
  return last.reverse().join(' ');
}
)});
  main.variable(observer("numberWithCommas")).define("numberWithCommas", function(){return(
function numberWithCommas(x) {
    console.log(x)
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
)});
  main.variable(observer("getCandidate")).define("getCandidate", ["dataByState"], function(dataByState){return(
function getCandidate(candidate, encoding){
    var value = candidate.value;
    var state = candidate.state;
    var key = candidate.key;
    var candidate = {};
    const candidate_state = dataByState.filter(element => element.key == state)[0].values;
    candidate_state.forEach(function(element){
      if(value == element[encoding]){
        candidate['name'] = element.Name;
        candidate['affil'] = element.Party_Code;
        candidate['district'] =element.District;
      }
   });
   return candidate;
}
)});
  main.variable(observer("maxValues")).define("maxValues", ["Individual_Contributions","Total_Receipts","Debts_owed_by","From_Candidate"], function(Individual_Contributions,Total_Receipts,Debts_owed_by,From_Candidate){return(
{
  highest_Individual_Contributions: Math.max.apply(Math, Individual_Contributions.map(function(o) { return o.CAND_1; })),
  highest_Total_Receipts: Math.max.apply(Math, Total_Receipts.map(function(o) { return o.CAND_1; })),
  highest_Debts_owed_by: Math.max.apply(Math, Debts_owed_by.map(function(o) { return o.CAND_1; })),
  highest_From_Candidate: Math.max.apply(Math, From_Candidate.map(function(o) { return o.CAND_1; }))
}
)});
  main.variable(observer("candidates")).define("candidates", function(){return(
["CAND_1","CAND_2","CAND_3","CAND_4","CAND_5"]
)});
  main.variable(observer("cartogram_data")).define("cartogram_data", ["statesData","data"], function(statesData,data){return(
statesData.map(obj => Object.assign({}, obj, {
  data: data.find(d => d.key === obj.state_postal)
}))
)});
  main.variable(observer("data")).define("data", ["Individual_Contributions","Total_Receipts","Debts_owed_by","From_Candidate","candidates"], function(Individual_Contributions,Total_Receipts,Debts_owed_by,From_Candidate,candidates)
{
  return Individual_Contributions.map(obj => {
    const Total_Receipt = Total_Receipts.find(d => d.state === obj.state)
    const Debt_owed_by = Debts_owed_by.find(d => d.state === obj.state)
    const From_Candidates = From_Candidate.find(d => d.state === obj.state)
    
    return {
      key: obj.state,
      Individual_Contributions: candidates.map(candidate => ({key: candidate, value: obj[candidate], state: obj.state, affil : obj.affil})),
      Total_Receipts : candidates.map(candidate => ({key: candidate, value: Total_Receipt[candidate], state: obj.state, affil : obj.affil})),
      Debts_owed_by: candidates.map(candidate => ({key: candidate, value: Debt_owed_by[candidate], state: obj.state, affil : obj.affil})),
      From_Candidate: candidates.map(candidate => ({key: candidate, value: From_Candidates[candidate], state: obj.state, affil : obj.affil})),
    }
  })
}
);
  main.variable(observer("From_Candidate")).define("From_Candidate", ["dataByState","getData"], function(dataByState,getData){return(
dataByState.map(element => getData(element,"From_Candidate"))
)});
  main.variable(observer("Debts_owed_by")).define("Debts_owed_by", ["dataByState","getData"], function(dataByState,getData){return(
dataByState.map(element => getData(element,"Debts_owed_by"))
)});
  main.variable(observer("Total_Receipts")).define("Total_Receipts", ["dataByState","getData"], function(dataByState,getData){return(
dataByState.map(element => getData(element,"Total_Receipts"))
)});
  main.variable(observer("Individual_Contributions")).define("Individual_Contributions", ["dataByState","getData"], function(dataByState,getData){return(
dataByState.map(element => getData(element,"Individual_Contributions"))
)});
  main.variable(observer("getData")).define("getData", function(){return(
function getData(element, encoding){
  var candidate_list = element.values;
  var sorted = candidate_list.sort((a,b) => b[encoding] - a[encoding]);
  let state_obj = {};
  let count = 1;
  for (var i = 0; i < 5; i++) {
    if (typeof sorted[i] !== 'undefined') {
      state_obj['CAND_' + count++] = (sorted[i][encoding]);
    }
    else{
      state_obj['CAND_' + count++] = null;
    }
  }
  state_obj['state']=element.key;
  return state_obj;
}
)});
  main.variable(observer("dataByState")).define("dataByState", ["d3","filtered"], function(d3,filtered){return(
d3.nest()
  .key(function(d) { return d.State; })
  .entries(filtered)
)});
  main.variable(observer("filtered")).define("filtered", ["filtered_with_duplicates"], function(filtered_with_duplicates){return(
filtered_with_duplicates.reduce((acc, current) => {
  const x = acc.find(item => item.Total_Receipts === current.Total_Receipts);
  if (!x) {
    return acc.concat([current]);
  } else {
    return acc;
  }
}, [])
)});
  main.variable(observer("filtered_with_duplicates")).define("filtered_with_duplicates", ["table"], function(table){return(
table.filter(function(d){ return d.State != "0" && d.State != "VI" && d.State != "AS" && d.State != "MP" && d.State != "GU" && d.Individual_Contributions > 100000})
)});
  main.variable(observer("table")).define("table", ["d3"], function(d3){return(
d3.csv('https://raw.githubusercontent.com/whall800/A4-FEC-Donations/master/FEC_Midterm_Donations%20_CSV.csv')
)});
  main.variable(observer("statesData")).define("statesData", function(){return(
[{
        'state_full': 'Alabama',
        'state_postal': 'AL',
        'row': 5,
        'column': 6
    },
    {
        'state_full': 'Alaska',
        'state_postal': 'AK',
        'row': 6,
        'column': 1
    },
    {
        'state_full': 'Arizona',
        'state_postal': 'AZ',
        'row': 4,
        'column': 1
    },
    {
        'state_full': 'Arkansas',
        'state_postal': 'AR',
        'row': 4,
        'column': 4
    },
    {
        'state_full': 'California',
        'state_postal': 'CA',
        'row': 3,
        'column': 0
    },
    {
        'state_full': 'Colorado',
        'state_postal': 'CO',
        'row': 3,
        'column': 2
    },
    {
        'state_full': 'Connecticut',
        'state_postal': 'CT',
        'row': 2,
        'column': 9
    },
    {
        'state_full': 'District of Columbia',
        'state_postal': 'DC',
        'row': 4,
        'column': 8
    },
    {
        'state_full': 'Delaware',
        'state_postal': 'DE',
        'row': 3,
        'column': 9
    },
    {
        'state_full': 'Florida',
        'state_postal': 'FL',
        'row': 6,
        'column': 8
    },
    {
        'state_full': 'Georgia',
        'state_postal': 'GA',
        'row': 5,
        'column': 7
    },
    {
        'state_full': 'Hawaii',
        'state_postal': 'HI',
        'row': 6,
        'column': 0
    },
    {
        'state_full': 'Idaho',
        'state_postal': 'ID',
        'row': 1,
        'column': 1
    },
    {
        'state_full': 'Illinois',
        'state_postal': 'IL',
        'row': 1,
        'column': 5
    },
    {
        'state_full': 'Indiana',
        'state_postal': 'IN',
        'row': 2,
        'column': 5
    },
    {
        'state_full': 'Iowa',
        'state_postal': 'IA',
        'row': 2,
        'column': 4
    },
    {
        'state_full': 'Kansas',
        'state_postal': 'KS',
        'row': 4,
        'column': 3
    },
    {
        'state_full': 'Kentucky',
        'state_postal': 'KY',
        'row': 3,
        'column': 5
    },
    {
        'state_full': 'Louisiana',
        'state_postal': 'LA',
        'row': 5,
        'column': 4
    },
    {
        'state_full': 'Maine',
        'state_postal': 'ME',
        'row': -1,
        'column': 10
    },
    {
        'state_full': 'Maryland',
        'state_postal': 'MD',
        'row': 3,
        'column': 8
    },
    {
        'state_full': 'Massachusetts',
        'state_postal': 'MA',
        'row': 1,
        'column': 9
    },
    {
        'state_full': 'Michigan',
        'state_postal': 'MI',
        'row': 1,
        'column': 6
    },
    {
        'state_full': 'Minnesota',
        'state_postal': 'MN',
        'row': 1,
        'column': 4
    },
    {
        'state_full': 'Mississippi',
        'state_postal': 'MS',
        'row': 5,
        'column': 5
    },
    {
        'state_full': 'Missouri',
        'state_postal': 'MO',
        'row': 3,
        'column': 4
    },
    {
        'state_full': 'Montana',
        'state_postal': 'MT',
        'row': 1,
        'column': 2
    },
    {
        'state_full': 'Nebraska',
        'state_postal': 'NE',
        'row': 3,
        'column': 3
    },
    {
        'state_full': 'Nevada',
        'state_postal': 'NV',
        'row': 2,
        'column': 1
    },
    {
        'state_full': 'New Hampshire',
        'state_postal': 'NH',
        'row': 0,
        'column': 10
    },
    {
        'state_full': 'New Jersey',
        'state_postal': 'NJ',
        'row': 2,
        'column': 8
    },
    {
        'state_full': 'New Mexico',
        'state_postal': 'NM',
        'row': 4,
        'column': 2
    },
    {
        'state_full': 'New York',
        'state_postal': 'NY',
        'row': 1,
        'column': 8
    },
    {
        'state_full': 'North Carolina',
        'state_postal': 'NC',
        'row': 4,
        'column': 6
    },
    {
        'state_full': 'North Dakota',
        'state_postal': 'ND',
        'row': 1,
        'column': 3
    },
    {
        'state_full': 'Ohio',
        'state_postal': 'OH',
        'row': 2,
        'column': 6
    },
    {
        'state_full': 'Oklahoma',
        'state_postal': 'OK',
        'row': 5,
        'column': 3
    },
    {
        'state_full': 'Oregon',
        'state_postal': 'OR',
        'row': 2,
        'column': 0
    },
    {
        'state_full': 'Pennsylvania',
        'state_postal': 'PA',
        'row': 2,
        'column': 7
    },
    {
        'state_full': 'Rhode Island',
        'state_postal': 'RI',
        'row': 2,
        'column': 10
    },
    {
        'state_full': 'South Carolina',
        'state_postal': 'SC',
        'row': 4,
        'column': 7
    },
    {
        'state_full': 'South Dakota',
        'state_postal': 'SD',
        'row': 2,
        'column': 3
    },
    {
        'state_full': 'Tennessee',
        'state_postal': 'TN',
        'row': 4,
        'column': 5
    },
    {
        'state_full': 'Texas',
        'state_postal': 'TX',
        'row': 6,
        'column': 3
    },
    {
        'state_full': 'Utah',
        'state_postal': 'UT',
        'row': 3,
        'column': 1
    },
    {
        'state_full': 'Vermont',
        'state_postal': 'VT',
        'row': 0,
        'column': 9
    },
    {
        'state_full': 'Virginia',
        'state_postal': 'VA',
        'row': 3,
        'column': 7
    },
    {
        'state_full': 'Washington',
        'state_postal': 'WA',
        'row': 1,
        'column': 0
    },
    {
        'state_full': 'West Virginia',
        'state_postal': 'WV',
        'row': 3,
        'column': 6
    },
    {
        'state_full': 'Wisconsin',
        'state_postal': 'WI',
        'row': 0,
        'column': 5
    },
    {
        'state_full': 'Wyoming',
        'state_postal': 'WY',
        'row': 2,
        'column': 2
    }
]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Configuration`
)});
  main.variable(observer("get_range")).define("get_range", ["d3","z","maxValues","selectedEncoding"], function(d3,z,maxValues,selectedEncoding){return(
ramp => {
  const maxRange = 3
  if (d3[`scheme${ramp}`] === undefined) {
    // this is a sequential, multi-hue value
    // so we'll need to do some minor work
    const sequentialScale = d3.scaleSequential(d3[`interpolate${ramp}`])
      .domain(z.domain())
    
    return [
      0, 
      maxValues[`highest_${selectedEncoding}`] / 2, 
      maxValues[`highest_${selectedEncoding}`]
    ].map(d => sequentialScale(d))
  } else {
    // use a scheme!
    return d3[`scheme${ramp}`][maxRange]
  }
}
)});
  main.variable(observer("x")).define("x", ["d3","candidates","state_size"], function(d3,candidates,state_size){return(
d3.scaleBand()
  .domain(candidates)
  .range([0, state_size])
)});
  main.variable(observer("z")).define("z", ["d3","maxValues","selectedEncoding","state_size"], function(d3,maxValues,selectedEncoding,state_size){return(
d3.scaleLinear()
  .domain([0, maxValues[`highest_${selectedEncoding}`]])
  .range([state_size, 0])
)});
  main.variable(observer()).define(["z"], function(z){return(
z.domain()
)});
  main.variable(observer("xAxis")).define("xAxis", ["d3","x"], function(d3,x){return(
d3.axisBottom()
  .scale(x)
  .tickSizeOuter(0)
  .tickSizeInner(0)
  .tickValues([])
)});
  main.variable(observer("axisPosition")).define("axisPosition", ["state_size","state_padding"], function(state_size,state_padding){return(
(cell, size = state_size, padding = state_padding) =>  
  (cell * (size + padding)) + size / 2
)});
  main.variable(observer("get_values")).define("get_values", ["_","data"], function(_,data){return(
key => _.flatten(
  data.map(
    d => d[key].map(d => d.value)
  )
)
)});
  main.variable(observer("get_value")).define("get_value", ["selectedEncoding","cartogram_data"], function(selectedEncoding,cartogram_data){return(
(d, key=selectedEncoding) => {
  // return data based on data key
  const { value } = cartogram_data
    .find(v => v.state_full === d.state)
    .data[key]
    .find(v => v.key === d.key)
 
  return value
}
)});
  main.variable(observer("x_column")).define("x_column", ["state_size","state_padding"], function(state_size,state_padding){return(
({column}) => column * (state_size + state_padding)
)});
  main.variable(observer("y_column")).define("y_column", ["state_size","state_padding"], function(state_size,state_padding){return(
({row}) => row * (state_size + state_padding)
)});
  main.variable(observer("state_size")).define("state_size", ["_width","offset"], function(_width,offset){return(
_width / offset
)});
  main.variable(observer("colorRamps")).define("colorRamps", function(){return(
[
  ['Blues', 'Greens', 'Greys', 'Oranges', 'Purples', 'Reds'],
  ['BuGn', 'BuPu', 'GnBu', 'OrRd', 'PuBuGn', 'PuBu', 'PuRd', 'RdPu', 'YlGnBu', 'YlGn', 'YlOrBr', 'YlOrRd'],
  ['Viridis', 'Inferno', 'Magma', 'Plasma', 'Warm', 'Cool', 'CubehelixDefault'],
  ['BrBG', 'PRGn', 'PiYG', 'PuOr', 'RdBu', 'RdGy', 'RdYlBu', 'RdYlGn', 'Spectral'],
  ['Rainbow', 'Sinebow']
]
)});
  main.variable(observer("state_padding")).define("state_padding", function(){return(
5
)});
  main.variable(observer("offset")).define("offset", function(){return(
12
)});
  main.variable(observer("_width")).define("_width", ["width","margin"], function(width,margin){return(
width - margin.left - margin.right
)});
  main.variable(observer("height")).define("height", ["margin"], function(margin){return(
700 - margin.top - margin.bottom
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### External Libraries`
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 100, right: 20, bottom: 20, left: 20}
)});
  const child1 = runtime.module(define1);
  main.import("ramp", child1);
  main.variable(observer("scaleCluster")).define("scaleCluster", ["require"], function(require){return(
require('d3-scale-cluster@1.3.1/dist/d3-scale-cluster.min.js')
)});
  main.variable(observer("_")).define("_", ["require"], function(require){return(
require('lodash')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5", "d3-svg-legend@2", "d3-scale-chromatic@1.3.3")
)});
  const child2 = runtime.module(define2);
  main.import("serialize", child2);
  const child3 = runtime.module(define3);
  main.import("select", child3);
  main.import("color", child3);
  return main;
}
