function DrawBarGraph(sampleID) {
  console.log(`Calling DrawBargraph(${sampleID})`);

  d3.json("data/data_samples.json").then((data)=> { 

    var samples = data.samples; 
    var resultArray = samples.filter(s => s.id ==sampleID); 
    var result = resultArray[0]; 
    var otu_ids = result.otu_ids; 
    var otu_labels = result.otu_labels; 
    var sample_values = result.sample_values;

    yticks= otu_ids.slice(0,10)
            .map(otuID => `OTU ${otuID}`).reverse();
    
    var barData = {
      x: sample_values.slice(0,10).reverse(),
      y: yticks, 
      type: "bar", 
      text: otu_labels.slice(0,10).reverse(), 
      orientation: "h"
    };

    barArray = [barData]; 

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found", 
      margin: {t: 30, l: 100}
    };

    Plotly.newPlot("bar", barArray, barLayout);
  });

}
function DrawBubbleChart(sampleID) {
  console.log(`Calling DrawBubbleChart(${sampleID})`);

  d3.json("data/data_samples.json").then((data)=> { 

    var samples = data.samples; 
    var resultArray = samples.filter(s => s.id ==sampleID); 
    var result = resultArray[0]; 
    var otu_ids = result.otu_ids; 
    var otu_labels = result.otu_labels; 
    var sample_values = result.sample_values;

    var bubbleData = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: { size: sample_values , 
      color: otu_ids, 
      colorscale: "Viridis"
      },
      text: otu_labels
    };
    bubbleArray = [bubbleData]; 

    var bubbleLayout = {
      xaxis: {title: "OTU ID"}, 
      margin: {t: 30, l: 50}
    };

    Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
  });
}

function ShowMetadata(sampleID) {
  console.log(`Calling ShowMetadata(${sampleID})`);

  d3.json("data/data_samples.json").then((data)=> { 

    var metadata = data.metadata; 
    var resultArray = metadata.filter(md => md.id ==sampleID); 
    var result = resultArray[0]; 
    var otu_ids = result.otu_ids; 
    var otu_labels = result.otu_labels; 
    var sample_values = result.sample_values;

    var PANEL = d3.select("#sample-metadata"); 
    
    PANEL.html("");
    Object.entries(result).forEach(([key,value]) => {
      var textToShow = [`${key} :  ${value}`]; 
      PANEL.append("h6").text(textToShow);
    });
  });

}
function DrawGauge(sampleID){
  console.log(`Calling DrawGauge(${sampleID})`)

  d3.json("data/data_samples.json").then((data)=> { 

    var metadata = data.metadata; 
    var resultArray = metadata.filter(md => md.id ==sampleID); 
    var result = resultArray[0]; 
    var wFreq = result.wfreq; 

  var gaugeData =  [{
		value: wFreq,
    title: { text: "Belly Button Washing Frequency per Week" },
    
		type: "indicator",
    mode: "gauge+number",
    gauge: { 
      axis: { range: [null, 10], tickwidth: 1 },
      bar: {color: "lightblue"}
    },
  }];

  var gaugeLayout = { width: 500, height: 500, margin: { t: 0, b: 10 } };
Plotly.newPlot('gauge', gaugeData, gaugeLayout);

  });
}
function optionChanged(newSampleID){
  
  console.log(`User selected ${newSampleID}`);

  DrawBubbleChart(newSampleID);
  DrawBarGraph(newSampleID);
  DrawGauge(newSampleID);
  ShowMetadata(newSampleID);
  
}
function initDashboard() { 
      console.log("Initializing Dashboard"); 
      
      var selector =d3.select("#selDataset")

      d3.json("data/data_samples.json").then((data) => { 

        console.log(data); 
        var sampleNames = data.names; 
        sampleNames.forEach((sampleID)=>{ 
            selector.append("option")
                    .text(sampleID)
                    .property("value", sampleID);
        });

        var sampleID = sampleNames[0];

        DrawBarGraph(sampleID); 
        DrawBubbleChart(sampleID); 
        DrawGauge(sampleID); 
        ShowMetadata(sampleID); 

      });

}

  initDashboard();
