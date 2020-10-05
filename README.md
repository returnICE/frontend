# frontend


### Demo Page
http://ajoucapstoneweb.s3-website.ap-northeast-2.amazonaws.com/

### Demo Video
[<img src="https://img.youtube.com/vi/L88IHBbCNj0/maxresdefault.jpg" width="100%">](https://youtu.be/L88IHBbCNj0)

### 프로젝트 개요

‘구독 경제’란 신문처럼 매달 구독료를 지불하고 필요한 물건이나 서비스를 받아쓰는 경제 활동을 의미한다.  이러한 구독경제를 이용한 서비스들은 우리 주변에서 쉽게 찾아볼 수 있다. 무제한으로 영화, 드라마 등을 볼 수 있는 넷플릭스와 같은 구독 서비스부터 옷이나 이불을 정기적으로 세탁해 주는 서비스까지 구독 경제는 우리의 삶에 깊숙이 침투했다.

우리 주변에서도 이러한 구독 서비스들을 이용하는 사람을 쉽게 찾아볼 수 있다. 2019년 9월 디지털 콘텐츠 구독 서비스를 이용하고 있는 사람은 iOS와 Android Mobile App 이용자 기준으로 2,243만명으로 전체 모집단의 61.5%가 구독서비스를 이용하고 있는 것으로 나타났다. 

![1](https://user-images.githubusercontent.com/38278199/95105131-ab34df80-0771-11eb-8cc2-ec93933d9bdb.png)

<그림 1> 2019년 구독서비스 이용자 규모

 구독 경제 시장은 날이 갈수록 점점 커지고 있다. 글로벌 시장조사 업체 맥킨지&컴퍼니에 따르면 온라인 쇼핑몰 상위 500곳에 입점한 ‘구독 서비스’ 제공 업체를 조사한 결과 구독 경제 시장 규모는 매년 100%이상 성장했으며 이 중 가장 큰 업체의 매출은 2011년 5700만 달러에서 2016년 26억 달러로 뛰어 올랐다고 한다.  또한 글로벌 투자 기업 크레디트스위스에 따르면 구독경제 시장규모는 2000년 2150달러에서 2020년는 5300억 규모로 성장할 것으로 전망했다. 

![2](https://user-images.githubusercontent.com/38278199/95105164-b6880b00-0771-11eb-891b-868be85b875e.jpg)
<그림 2> 국가별 구독경제 시장 규모

 이러한 정황을 볼 때 구독 서비스는 점점 더 확장되어 마치 배달서비스처럼 우리의 삶에 녹아 들 것으로 예상된다.

---
### 사업화 가능성
![3](https://user-images.githubusercontent.com/38278199/95105206-c6075400-0771-11eb-8ea4-ed3049523424.png)
<그림 3> 비지니스 모델 캔버스
### 기술스택
![4](https://user-images.githubusercontent.com/38278199/95105211-c99adb00-0771-11eb-9085-37d495689aae.png)
- JQuery : HTML DOM구조를 손쉽게 조작하기 위한 javascript 라이브러리이다. bootstrap 적용과 I`mport 결제모듈을 쉽게 적용하기 활용하였다.
- JavaScript : 웹 개발에서 사용하는 프레임워크 Node.js, Vue.js 를 사용하기 위한  programming 언어이다.
- Node.js : 네트워크 애플리케이션 개발에 사용되는 소프트웨어 플랫폼이다. 클라이언트와의 비동기 REST API 통신을 제공하기 위해 사용하였다. 
- HTML5 : HTML의 완전한 5번째 버전으로 월드 와이드 웹의 핵심 마크업 언어이다. 웹 브라우저의 표준 마크업 언어이므로 사용하였다. 
- MySQL : 오픈 소스의 관계형 데이터베이스 관리 시스템이다. ERD를 통한 DB모델링이 쉽고, 확실한 기저 관계정의를 통한 데이터의 완전성을 위하여 사용하였다.
- Amazon EC2 : 사용자가 가상 컴퓨터를 임대 받아 그 위에 컴퓨팅 서버를 올리기 위하여 사용하였다. 빠른 개발과 확장성, 또 비교적 낮은 진입장벽을 가지고 있기 때문에 사용하였다.
- Amazon S3 : 아마존 웹 서비스에서 제공하는 온라인 스토리지 웹 서비스이다. 콘텐츠 저장 및 배포가 용이하고 관리가 쉬워 사용하였다.
- Vue.js : 웹 애플리케이션의 사용자 인터페이스를 만들기 위해 사용하는 오픈 소스 점진적인 자바스크립트 프레임워크이다. 학습 곡선이 낮고, 컴포넌트 단위로 유지보수가 간편하여 사용하였다.
- Android SDK : 안드로이드 어플리케이션 개발을 위한 소프트웨어 라이브러리 모음이다.
- ExpressJS : Node.js를 위한 웹 프레임워크이다. REST API 통신을 할 때, 미들웨어로써 클라이언트와의 통신처리를 위하여 사용하였다.
- CSS 3 : 웹 문서의 전반적인 스타일을 미리 저장해 둔 스타일시트이다.
- Amazon RDS : 아마존 웹 서비스가 서비스하는 분산 관계형 데이터베이스이다. 쉽고 빠른 구성과 구축 및 배포가 용이하기 때문에 사용하였다.
- Kotlin : 안드로이드 앱 개발언어이다. 간결한 문법과 비교적 배우기 쉬워 사용하였다.
- Sequelize : Node.js 기반의 라이브러리로 mysql을 다루기 위한 ORM(Object-Releational-Mapping)이다. raw Query문을 사용하지 않고 js를 이용하여 데이터를 핸들링하기위해 사용하였다. 
- Bootstrap Vue : Bootstrap을 Vue.js에서 사용할 수 있도록 만든 패키지이다. 반응형 웹페이지의 개발을 위하여 사용하였다.

![5](https://user-images.githubusercontent.com/38278199/95105214-ca337180-0771-11eb-94c7-a3643550580f.png)
- Postman : 개발한 API를 테스트하고, 테스트 결과를 공유하여 API 개발의 생산성을 높여주는 플랫폼이다. 크롬 확장프로그램으로 접근이 용이하고 사용법이 간편하여 사용하였다.
- Google Maps : 구글에서 제공하는 지도 서비스이다. 안드로이드에서 적용하기 쉬운 api를 제공한다. 
- JSON Web Token : JSON 기반 액세스 토큰을 만들기위한 인터넷 표준이다. 사용자의 state를 서버에서 만들고 클라이언트에서 저장하여 서버의 부하를 줄인 인증 및 인가방법이다.
- Retrofit : Square에서 제공하고 있는 Http 통신을 위한 라이브러리다. 안드로이드에서 서버와 http통신을 지윈 하기 위해 사용하였다.
- Firebase Cloud Messaging : 서버에서 클라이언트 어플리케이션으로 알림을 안정적으로 보낼 수 있는 교차 플랫폼 메시징 솔루션이다. 연동이 간단하고 무료클래스에서도 사용이 간단하며 유실없이 안정적이기 때문에 사용하였다.
- I’mport : PC/Mobile 구분해 작업할 필요없이 하나의 소스코드로 pc/mobile/in-app결제가 가능한 결제 모듈이다. 정기결제가 가능하고 javascript API를 지원하여 개발이 용이하다.
- MySQL WorkBench : SQL 개발과 관리, 데이터베이스 설계, 생성 그리고 유지를 위한 단일 개발 통합 환경을 제공하는 비주얼 데이터베이스 설계 도구이다. DB 관리를 위한 GUI를 제공받고 ERD 설계를 하기위해 사용하였다.

![6](https://user-images.githubusercontent.com/38278199/95105216-cacc0800-0771-11eb-970d-308e8b831275.png)
- Github: 효율적인 git 활용과 관리를 위해 사용한 Git 저장소이다. 
- Git: 코드 분산형 관리 툴인 형상 관리 도구이다. 분산형 관리로 자유롭게 코드를 변경하고 통합하며 관리한다. 
- Visual Studio Code : 소스 코드 편집기 이다. Git 관리 ESLint 관리, Terminal 지원 등의 확장기능지원을 통해 개발속도를 올릴 수 있다.
- Webpack : javascript 모듈화를 지원하는 도구이다. 여러 개의 loader를 통한 최신 ES버전을 적용할 수 있도록 돕는다
- Android Studio : 안드로이드 공식 개발 툴이다. 인텔리전스한 코드 에디터로서 코드 템플릿이나 가상머신을 지원합니다. 
- Babel : javascript 컴파일러로서, 최신의 JS코드를 이전 코드로 변환 가능하게 해주는 개발 도구이다. ES6 모듈의 코드를 사용할 수 있도록 만들어준다. 
- ESLint: javascript 개발시에 사용되는 정적 타입 분석 도구이다. 코딩 컨벤션을 제공해주어 standard-javascript-style로 코딩스타일을 통일하였다.
- Travis CI : github에서 진행되는 오픈소스 프로젝트를 위한 지속적인 통합 서비스이다. 매번 서비스를 배포하고 빌드 테스트를 자동화 한다. 

### SW 구조
![8](https://user-images.githubusercontent.com/38278199/95105228-cd2e6200-0771-11eb-9ba5-e49c4374f90f.png)

### SOFTCON
![판넬-SW캡스톤-팀명-1](https://user-images.githubusercontent.com/38278199/95114786-6ca62180-077f-11eb-9f1a-5d1c9dc27c2b.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
