---
title: My Notes for Kubernetes
date: '2022/12/3'
layout: blog
live: false
---

# Some random notes for Kubernetes

## Notes

Kubernetes weakens the idea of instances and instead has users focus on the concept of pods.

Declarative language.

## Learning Resources

https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

https://devopscube.com/kubernetes-tutorials-beginners/

https://www.weave.works/blog/deploying-an-application-on-kubernetes-from-a-to-z

## Building

Building a simple web service with ingress and load balancing.

### Sync files between dev pod and local development

Syncs file between your local directory and a kubernetes pod.

The kubernetes pod has 2 containers, one for the remote environment and one for the [syncthing](https://syncthing.net/) process. A syncthing configuration in injected into the appropriate file directory via configmap. The remote syncthing and local syncthing processes communicate via port forwarding/ssh tunnel.

Project references:

- [ksync](https://ksync.github.io/ksync/)
- [okteto](https://github.com/okteto/okteto)

Design Document and Discussions:

https://github.com/tensorchord/envd-server/issues/102

Pull requests:

https://github.com/tensorchord/envd-server/pull/170

https://github.com/tensorchord/envd/pull/1416

## Service Discovery

https://www.densify.com/kubernetes-autoscaling/kubernetes-service-discovery
