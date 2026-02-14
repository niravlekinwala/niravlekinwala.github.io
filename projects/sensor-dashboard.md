---
title: "IoT Sensor Dashboard"
date: "2025-03-01"
description: "Real-time dashboard for visualizing data from loose networks of low-cost air quality sensors, featuring outlier detection and heatmaps."
tags: ["React", "D3.js", "WebSocket", "Node.js"]
---

# IoT Sensor Dashboard

A comprehensive dashboard for monitoring air quality networks in real-time.

## Tech Stack
- **Frontend**: React.js with D3.js for visualizations.
- **Backend**: Node.js WebSocket server for streaming data.
- **Database**: InfluxDB for time-series storage.

## Features
- **Heatmaps**: Spatiotemporal visualization of pollution hotspots.
- **Alerts**: Automated email/SMS alerts when thresholds are breached.

```javascript
// D3.js Heatmap rendering logic snippet
svg.selectAll()
  .data(data, function(d) {return d.group+':'+d.variable;})
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.group) })
  .attr("y", function(d) { return y(d.variable) })
  .style("fill", function(d) { return myColor(d.value)} )
```
