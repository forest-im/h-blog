---
title: Cross Origin Resource Sharing(CORS)
tag: HTTP, CORS
date: 2023-01-04 17:35:09
---

## 동일 출처 정책(same origin policy) & 교차 출처 리소스 공유(cors)

<table>
  <th></th>
  <th></th>
  <tr>
    <td>동일 출처 정책(same origin policy)</td>
    <td>
      <li>불러온 문서나 스크립트가 다른 출처에서 가져온 리소스와 상호작용하는 것을 제한하는 중요한 보안 방식</li>
      <li>자신과 동일한 도메인만 서버로부터 데이터를 요청하여 받을 수 있도록 하는 정책</li>
    </td>
  </tr>
  <tr>
    <td>교차 출처 리소스 공유(cross origin resource sharing)</td>
    <td>
      <li>추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제</li>
      <li>클라이언트에서 서버로 액세스하기 직전까지의 권한 확인 프로토콜</li>
    </td>
  </tr>
</table>

## CORS를 사용하는 이유

보안 상의 이유로, 브라우저는 도메인이 다르면 HTTP요청을 제한한다. 즉 웹 애플리케이션은 자신의 출처와 동일한 리소스만 불러올 수 있으며, 다른 출처의 리소스를 불러오려면 그 출처에서 올바른 CORS 헤더를 포함한 응답을 반환해야 한다.

### Origin

요청이 시작된 서버의 위치를 나타내는 문구
![origin](https://github.com/h-alex2/h-blog/blob/1cf947cbb3e0b2ccf47f26c7cb24d9408d4cea3f/public/posts/cors-01.png?raw=true)

- 두 URL의 프로토콜, 포트(명시한 경우), 호스트가 모두 같아야 동일한 출처

