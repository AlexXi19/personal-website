---
title: My Notes for ML Infra
date: '2022/12/3'
layout: blog
live: false
---

# ML Systems

## Resources

[Designing Machine Learning Systems](https://www.amazon.com/Designing-Machine-Learning-Systems-Production-Ready/dp/1098107969/ref=asc_df_1098107969/?tag=hyprod-20&linkCode=df0&hvadid=564675582183&hvpos=&hvnetw=g&hvrand=6171414979611311806&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&Ahvlocphy=1013585&hvtargid=pla-1688018801992&psc=1)

[Deep learning serving](https://blog.mapotofu.org/blogs/deep-learning-serving/)

# ML Serving

### My Questions

- ML Model load balancing
- How to autoscale

### Serving Challenges

- Model warm up time

## Notes with Allen and Keming - Jan 16

### Allen

Using kubernetes for ML serving. Benefits are better observability, distributed tracing, pod failure retry etc.

### Keming

ML Serving with images challenges:

Images are too big, takes up too much memory bandwidth and io width.

Better serialization and use in memory file transfer with apache arrow library

2 routes for serving:

1 model per container/gpu, can use something like python multiprocess to replicate models.

Multiple models / server

Machine Learning Service load balancing is better based on the request number compared to CPU/GPU utilization.

## Relevant Projects

[Mosec](https://github.com/mosecorg/mosec)

[Cog](https://github.com/replicate/cog)

[Ray Serve](https://docs.ray.io/en/latest/serve/index.html)

[TensorFlow Serving](https://github.com/tensorflow/serving)

[Cortex](https://github.com/cortexlabs/cortex)

[Nvidia Triton](https://github.com/triton-inference-server/server)

Features: 
- High performance serving framework
- Multi framework backend support 
- Cloud Native 
  - Good kubernetes support
  - Easy to scale
- Model orchestration with management service.
 


## Notes

## Random Thoughts

# ML Ops
