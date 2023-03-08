---
title: ec2
tag: aws, ec2
date: 2023-03-08 19:22:01
published: false
---

## ECS Elastic Container Service

- Container 기반의 컴퓨팅 플랫폼
- aws의 컨테이너 오케스트레이션 서비스

## EKS Elastic Container Service

## EC2

- ecs cluster는 Controle plane과 같으며, 소속되어 있는 모든 컨테이너의 라이프 사이클을 관리하는 역할
- ECS Cluster는 기본적으로 각각의 컨테이너를 관리하기 위한 모든 서비스가 탑재되어 있다.
- 컨테이너는 VM에서 동작하며, VM이란 EC2 인스턴스를 말한다.

  - EC2는 컨테이너는 호스팅하는 역할을 하며, ECS Cluster와 연결되어 함께 동작한다.
  - EC2에는 Docker Runtime, Container Runtime이 있다.

  ECS with EC2를 정리하자면, EC2를 생성해야 하고, 그것을 ECS Cluster에 연결해야 하며, 새로운 컨테이너를 생성한다면 EC2 인스턴스에 충분한 리소스가 남아 있는지를 고려하고, 또한 OS 및 Docke Runtime, ECS Agent도 관리해야 한다. 물론 이 작업을 위해 유저는 그에 맞는 권한이 있는 있어야 한다. 즉, ECS with EC2는 ECS Cluster가 컨테이너 서비스를 관리해주지만 VM의 경우 사용자가 직접 신경 써줘야 하는 부분이 있다는 것이다.

하지만 이런 인프라 관리마저도 AWS에 맡기고 싶다면(컨테이너 라이프사이클, 인프라 호스팅)? 이 경우, EC2 인스턴스의 대체품으로 AWS Fargate를 고려해 볼 수 있다. Fargate는 이용하면 EC2처럼 프로비저닝 작업은 필요 없다. Fargate는 어떻게 동작할까?

- 쿠버네티스는 AWS EC2 인스턴스의 클러스터에 설치할 수 있음
