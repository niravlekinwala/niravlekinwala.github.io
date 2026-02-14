---
title: "Regional Dispersion Simulation"
date: "2025-02-01"
description: "High-performance simulation of pollutant dispersion in urban environments using OpenFOAM and custom C++ solvers."
tags: ["C++", "OpenFOAM", "CFD", "HPC"]
---

# Regional Dispersion Simulation

This project leverages OpenFOAM to simulate the dispersion of pollutants in complex urban terrains.

## Methodology
- **Mesh Generation**: Using snappyHexMesh for high-quality grids around buildings.
- **Solver**: Custom solver based on `scalarTransportFoam`.
- **Parallel Processing**: MPI implementation for running on HPC clusters.

## Applications
Used for assessing the impact of industrial emissions on nearby residential areas.

```cpp
// Custom boundary condition example
scalarField& field = patchField();
forAll(field, facei) {
    if (pos[facei].z() < height) {
        field[facei] = sourceTerm;
    }
}
```
