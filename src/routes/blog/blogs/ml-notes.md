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

- ML Serving framework with Rust http server and python _backend_
- Rust server is only an ingress, does not handle any logic and sends raw bytes to the python workers via channels

[Cog](https://github.com/replicate/cog)

[Ray Serve](https://docs.ray.io/en/latest/serve/index.html)

[TensorFlow Serving](https://github.com/tensorflow/serving)

[Cortex](https://github.com/cortexlabs/cortex)

- Autoscaling with kubernetes on EKS.

[Nvidia Triton](https://github.com/triton-inference-server/server)

Features:

- High performance serving framework
- Multi framework backend support
- Cloud Native
  - Good kubernetes support, integration with [kserve](https://github.com/kserve/kserve)
    - Kserve is a **model inference platform** for machine learning use cases on kubernetes.
  - Easy to scale
- Model orchestration with management service.

## Notes

## Random Thoughts

# ML Ops

### MLOps validation server

The purpose of this section is for notes related to building a model testing and validation server to provide more confidence for the model deployment process.

#### Problems to solve:

- Lots of back and forth between the ML team and the Serving team to deploy the models
  - Serving team needs to _put the model together_ for deployment
  - Serving team needs to manually test the model to gain confidence for model deployment

#### Goals

- Reduce the ML engineer's reliance on the serving team for deploying ML models
- Provide confidence in the following areas for model deployment
  - The model is able to function correctly (on Triton)
  - The model's performance remains the same and is not affected by things like dependencies, configurations, etc.
- Gain insight on production inference latency or model performance
- Provide a production-like environment or configurable deployment setup.

#### Secondary goals

- Use kubernetes with the goal of gaining insight on productionizing model serving on Triton via kubernetes.
- Start the idea of tracking model (predict) performance.
- On migration, have canaries deployments receive real traffic as a part of model validation.

#### Ideas

- Model validation scheduling queue
- Provide model validation status and reports (perhaps via a webpage or webhooks)
- Either create general load/performance testing datasets (e.g. image model testing, text model testing etc.) or create model specific testing datasets, provided by the ML team.

#### Questions

- Does the client proxy need to be brought into the conversation?
  - We are testing for inference latency so bringing in the client proxy can create a more holistic test?

#### Actionable tasks

- Questions for the model serving team
  - When the ML team asks requests to productionize an ML model,
  - What are some of the parities that you've seen when manually testing the model in a dev environment and deploying it.
- Questions for the ML team.
  - What are the current tooling to test model deployment and model performance?
  - What can or can't you do with the current tooling for the model deployment process.

#### Design
