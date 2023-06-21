---
title: Proxy에 대해 알아보기 (+ Reverse Proxy, Foward Proxy)
tag: proxy
date: 2023-06-21 12:25:31
description: 프록시에 대해 알아봅니다.
type: blog
---

<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [Proxy](#proxy)
  - [Proxy란?](#proxy란)
  - [Foward Proxy](#foward-proxy)
  - [Reverse Proxy](#reverse-proxy)
  - [Reverse Proxy 설정을 하는 이유](#reverse-proxy-설정을-하는-이유)
  - [리버스 프록시 설정은 어떻게 할까?](#리버스-프록시-설정은-어떻게-할까)
- [출처 및 참조](#출처-및-참조)

<!-- /TOC -->

---

[EC2 배포 포스트](https://www.im-alex.dev/posts/noPublished/aws-ec2)에 프록시를 함께 정리했더니 너무 길어져서 따로 분리한다..😂

## Proxy

처음에 프록시에 대해 알아봤을 때 이해가 잘 되지 않았던 부분이 많았기 때문에 프록시에 대해 정리해보고자 한다.

먼저 프록시에 대해 알아보고 포워드 프록시(정방향 프록시), 리버스 프록시(역방향 프록시)에 대해 알아보자.

### Proxy란?

> 프록시 서버는 리소스를 요청하는 클라이언트와 해당 리소스를 제공하는 서버 사이에서 중개자 역할을 하는 서버 응용 프로그램이다. 파일이나 웹 페이지와 같은 리소스에 대한 요청을 서버에 직접 연결하는 대신 클라이언트는 프록시 서버로 요청을 보낸다. ...프록시 서버를 사용하면 요청의 복잡성을 단순화 또는 제어하거나 부하 분산, 개인 정보 보호 또는 보안과 같은 추가 이점을 제공한다.

프록시는 요청하는 클라이언트와 리소스를 제공하는 서버 사이에서 중개자 역할을 한다고 했다. 이 말을 보고 위치를 유추해볼 수 있다.
**클라이언트 - 프록시 - 서버** 의 순서로 위치하게 된다. 포워드 프록시와 리버스 프록시의 차이는 프록시의 위치가 어느 쪽 앞에 위치하느냐에 따라 달라진다.

### Foward Proxy

포워드 프록시는 프록시 서버, 프록시라고 불린다. 보통 프록시라고 하는 것은 포워드 프록시를 말한다. (클라이언트에서 CORS를 해결하기 위해 프록시를 사용하는 것도 포워드 프록시를 사용하는 것이다.)

그림으로 나타내면 아래와 같다.

<figure>
  <img src="https://github.com/h-alex2/imgaes/assets/84281505/a81c8313-ef52-47e5-b0d2-ba197551603d" alt="proxy" />
  <figcaption align="center">

이미지 출처: [Creating a Forward Proxy Using Application Request Routing - Microsoft](https://learn.microsoft.com/en-us/iis/extensions/configuring-application-request-routing-arr/creating-a-forward-proxy-using-application-request-routing)

  </figcaption>
</figure>

포워드 프록시는 클라이언트 앞에 위치한다.

포워드 프록시는 클라이언트로부터 연결 요청을 수신하고 대상 웹 사이트로 전달하기 전에 요청이 유효한지 확인하기 위해 연결 요청을 확인한다. 클라이언트의 컴퓨터와 대상 웹 사이트 간의 직접적인 통신을 방지하기 위해 포워드 프록시 서버는 클라이언트의 요청을 수신하여 대상 사이트로 전달하고 대상 사이트에서 제공된 정보를 수신하여 클라이언트로 전달한다.

즉 요청을 서버로 바로 보내는 것이 아니라 프록시를 거쳐 보내는 것을 말한다.

### Reverse Proxy

<figure>
  <img width="851" alt="image" src="https://cf-assets.www.cloudflare.com/slt3lc6tev37/3msJRtqxDysQslvrKvEf8x/f7f54c9a2cad3e4586f58e8e0e305389/reverse_proxy_flow.png">
  <figcaption align="center">

이미지 출처: [역방향 프록시란? | 프록시 서버 설명 - Cloudflare](https://www.cloudflare.com/ko-kr/learning/cdn/glossary/reverse-proxy/)

  </figcaption>
</figure>

리버스 프록시는 하나 이상의 웹 서버 앞에 위치하여 클라이언트(브라우저) 요청을 해당 대상 서버에 전달하고, 대상 서버로부터 받은 응답을 클라이언트에게 전달하는 중개 역할을 한다. 이로서 어떤 클라이언트도 원본 서버와 직접 통신하지 못 하도록 한다.

서버만으로 클라이언트의 요청을 처리할 수 있는데 왜 프록시 설정을 해야 할까? 라는 의문이 들 수 있다. 이렇게 구성하는 이유에는 여러가지가 있다.

### Reverse Proxy 설정을 하는 이유

[역방향 프록시란? | 프록시 서버 설명 - Cloudflare](https://www.cloudflare.com/ko-kr/learning/cdn/glossary/reverse-proxy/),
[포워드 프록시(forward proxy) 리버스 프록시(reverse proxy) 의 차이](https://www.lesstif.com/system-admin/forward-proxy-reverse-proxy-21430345.html) 의 글을 참고했다.

1. 부하 분산 (로드 밸런서)

- 인기 있는 웹 사이트에서는 단일 원본 서버로 들어오는 모든 사이트 트래픽을 처리하지 못할 수 있다. 대신, 사이트에서는 동일한 사이트에 대한 요청을 모두 처리하는 서로 다른 서버 풀에 분산될 수 있다. 이 경우 리버스 프록시는 단일 서버에 과부하가 걸리는 것을 막기 위해 들어오는 트래픽을 여러 서버에 고르게 분산하는 부하 분산 솔루션을 제공할 수 있다. 서버가 완전히 실패하는 경우 다른 서버가 트래픽을 처리하도록 할 수 있다.

---

2. 공격으로 부터 보호

- 리버스 프록시를 사용하면 웹 사이트 또는 서비스에서 원본 서버의 IP 주소를 공개할 필요가 없다. 이로 인해 공격자가 DDos 공격과 같은 표적 공격을 활용하기가 훨씬 더 어려워진다.

---

3. 캐싱

- 리버스 프록시도 콘텐츠를 캐싱할 수 있으므로 성능이 향상된다.

---

4. 신뢰성 증대

- 리버스 프록시를 클러스터로 구성해 놓으면 가용성을 높일 수 있고 사용자가 증가하는 상황에 맞게 웹 서버나 WAS(웹 애플리케이션 서버 - 우리가 만드는 express 서버 같은 것..)를 유연하게 늘릴 수 있는 장점이 있다.

---

### 리버스 프록시 설정은 어떻게 할까?

프록시 설정은 웹 서버를 통해 할 수 있다. 많이 사용하는 웹 서버로는 nginX와 Apache가 있다.

```js
server {
  listen 80;
  listen [::]:80;
  server_name *.jaamtoast.click;
  location / {
      proxy_pass http://127.0.0.1:8000/api;
  }
}
```

이 코드는 nginX에서 리버스 프록시를 설정하는 코드의 일부이다. (nginX 코드 같은 경우는 찾아보면 굉장히 많이 나와있다.)

여기서 `127.0.0.1`은 자기 자신을 가리킨다. 즉 localhost다.  
이 코드는 간단하게 `*.jaamtoast.click`으로 오는 요청을 `http://localhost:8000/api`로 우회하겠다는 말이다. 이렇게 요청을 대상 서버에 전달하는 것이 리버스 프록시의 역할이다.

<figure>
  <img width="851" alt="image" src="https://github.com/h-alex2/imgaes/assets/84281505/fa6275b5-a25d-4b84-90e4-9d9d4e19538e">
  <figcaption align="center"> beanstalk의 경우 구성 - 업데이트, 모니터링 및 로깅 구성 설정에 가면 프록시 서버를 설정할 수 있는 곳이 있다. <br />Apache, Nginx가 바로 웹 서버이다. 기본 설정은 Nginx로 되어있다.
  </figcaption>
</figure>

beanstalk의 경우에도 프록시 설정이 이미 되어있다. 따로 설정하지 않는 한 건드릴 게 없다. 하지만 EC2의 경우 프록시 설정을 직접 해줘야 하기 때문에 프록시에 대해 알 필요가 있다.

여기서 beanstalk AWS 공식문서를 보자.

> Elastic Beanstalk는 NGINX 또는 Apache HTTPD를 역방향 프록시로 사용하여 애플리케이션을 포트 80의 Elastic Load Balancing 로드 밸런서에 매핑합니다. 기본값은 NGINX입니다. Elastic Beanstalk는 확장하거나 자체 구성으로 완전히 재정의할 수 있는 기본 프록시 구성을 제공합니다.

포트 80은 뭘까? 포트 80은 HTTP 포트를 말한다. 기본 포트로 들어오는 요청을 Elastic Load Balancing에 매핑한다는 말이다. 여기서 프록시의 역할이 드러난다. 중간에서 요청을 가로채 전달하는 역할을 하는 것 그게 바로 Reverse Proxy의 역할이다.

<details>
<summary>nginX vs Apache</summary>

예전에는 Apache를 많이 사용했지만 메모리의 부담 때문에 요새는 nginX를 많이 사용하고 있다.
Apache는 모든 요청에 대해 새 프로세스를 생성하는 방식인 멀티 프로세스 방식이다. nginX는 JavaScrpit처럼 non-Blocking 이벤트 기반 아키텍처를 사용한다. 이 방식의 차이 때문에 Apache는
트래픽이 증가함에 따라 많은 프로세스를 사용해야 한다는 단점이 있어 비용이 크게 증가하게 된다. 브라우저가 동적인 이펙트 등으로 크게 발전하게 되면서 많은 요청을 필요로 하게 됐고 이 방식에서 Apache로는 많은 비용 때문에 부담을 느껴 nginX의 수요가 증가했다고 한다.
nginX는 이벤트 기반 아키텍처 이기 때문에 각 연결에 대해 새 스레드나 프로세스를 생성하지 않고 유연하게 대처할 수 있다는 장점이 있다. Apache에 대해서는 위와 같이 단점만 있는 것은 아니고, 안정성 등 장점이 많다고 한다. 더 자세한 것은 [Nginx vs Apache: Web Server Showdown](https://kinsta.com/blog/nginx-vs-apache/) 여기를 참고..

</details>

## 출처 및 참조

- [Forward vs. Reverse Proxy: Benefits & Use Cases in 2023](https://research.aimultiple.com/forward-vs-reverse-proxy/)
- [Nginx vs Apache: Web Server Showdown](https://kinsta.com/blog/nginx-vs-apache/)
- [역방향 프록시란? | 프록시 서버 설명 - Cloudflare](https://www.cloudflare.com/ko-kr/learning/cdn/glossary/reverse-proxy/),
- [포워드 프록시(forward proxy) 리버스 프록시(reverse proxy) 의 차이](https://www.lesstif.com/system-admin/forward-proxy-reverse-proxy-21430345.html)
