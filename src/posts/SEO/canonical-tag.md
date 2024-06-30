---
title: 케노니컬 태그
description: Local Storage는 5MB. 쿠키는 4KB!
tag: SEO
date: 2024-06-30 17:12:40
---

## 케노니컬 태그(Canonical Tag)란?

> 대표(canonical) 주소란 사람들에게 알리고자 하는 주소이며 호스팅 업체나 플랫폼에 상관없이 바뀌지 않는 고유 주소를 의미합니다.
> 출처: [네이버 웹마스터 가이드 - 웹 사이트를 만들 때](https://searchadvisor.naver.com/guide/seo-basic-create)


- 여러 페이지를 세세히 구분하지 못하는 검색엔진 크롤러에게 검색되길 원하는 하나의 대표적인 URL 주소를 알려주는 역할을 한다.
- 캐노니컬 링크 요소는 웹 마스터의 SEO 작업 중, 중복 콘텐츠 이슈를 해소하기 위해 웹 페이지의 "공식" 혹은 "선호" URL을 지정할 수 있는 HTML 요소이다.
  - 쿼리가 있는 URL과 없는 URL은 다른 URL로 취급된다.
- `<head>` 태그 내에 들어간다.




## alternate
- 대체 페이지를 정의할 수 있다.
- 데스크탑 페이지, 모바일에서 보여질 페이지가 다를 때
```html
<!-- 데스크탑 버전 -->
<link rel="alternate" media="only screen and (min-width: 640px)" href="http://example.com/desktop-page.html" />

<!-- 모바일 버전 -->
<link rel="alternate" media="only screen and (max-width: 639px)" href="http://example.com/mobile-page.html" />
```
  - 데스크탑에서는 `rel="alternate` 속성을, 모바일에서는 `rel="canonical"` 속성을 사용해 검색 엔진이 두 페이지가 동일한 콘텐츠를 제공한다는 것을 이해할 수 있다.

- 다국어 페이지 속성이 정의되어 있을 떄(hreflang 속성이 정의되어 있을 때)
```html
<link rel="alternate" hreflang="es" href="http://example.com/es/" />
<link rel="alternate" hreflang="fr" href="http://example.com/fr/" />
```


### 참고 링크
- [Link types](https://developer.mozilla.org/ko/docs/Web/HTML/Attributes/rel)
- [rel="canonical" 및 다른 메서드로 표준 URL을 지정하는 방법](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=ko&visit_id=638553323567536809-4144227550&rd=1)