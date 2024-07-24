# 유효성 검사 라이브러리

정규 표현식을 사용하여 데이터를 검증하는 간단하고 유연한 JavaScript 라이브러리입니다. 이 라이브러리는 체이닝, 사용자 정의 에러 핸들링, 그리고 일반적인 검증 요구 사항을 위한 미리 정의된 정규 표현식 상수를 지원합니다.

## 주요 기능

-   **체이닝**: 파이프라인 방식으로 검증 규칙을 설정할 수 있습니다.
-   **사용자 정의 에러 핸들링**: 특정 검증에 대해 사용자 정의 에러 핸들링 함수를 정의할 수 있습니다.
-   **미리 정의된 정규 표현식 상수**: 이메일 및 강력한 비밀번호와 같은 일반적인 검증을 위한 미리 정의된 정규 표현식을 사용할 수 있습니다.
-   **유연한 구성**: 각 데이터 항목에 대해 여러 개의 정규 표현식 검사를 추가하고, 각 검사에 대해 에러 핸들링을 지정할 수 있습니다.

## 설치

이 라이브러리를 프로젝트에서 사용하려면 소스 코드를 프로젝트에 복사하거나 빌드 프로세스의 일부로 포함시키면 됩니다. 의존성은 없습니다.

## 사용 방법

### 라이브러리 가져오기

ES6

```javascript
import { createValidator, REGEX } from "valid-pipe";
```

CDN

```javascript
<script src='https://unpkg.com/valid-pipe@1.0.0/valid-pipe.js'></script>
```

NPM

```javascript
npm i valid-pipe
```

### 예제

```javascript
// 검증기 인스턴스 생성
const isValid = createValidator()
    .setData("test@example.com", REGEX.EMAIL)
    .setData("Password@123", REGEX.PASSWORD_STRONG, (data, regex) =>
        console.error(
            `비밀번호는 대문자, 숫자, 특수 문자를 포함해야 합니다: ${data}`
        )
    )
    .addTest(REGEX.MIN_LENGTH_8, (data) =>
        console.error(`비밀번호는 8자 이상 기입해주세요.: ${data}`)
    )
    .check(); // 모든 데이터에 대해 검증 수행

// 결과 출력
console.log(isValid); // true 또는 false 반환
```

### API

-   **`createValidator()`**: 새로운 검증기 인스턴스를 생성합니다.
-   **`setData(data, ...regexAndCallbacks)`**: 데이터와 검증 규칙을 설정하며, 선택적으로 에러 콜백 함수를 추가할 수 있습니다.
    -   `data`: 검증할 데이터입니다.
    -   `...regexAndCallbacks`: 정규 표현식과 선택적 에러 콜백 함수입니다.
-   **`addTest(regex, errorCallback)`**: 마지막 데이터 세트에 추가적인 검증 규칙을 추가합니다.
    -   `regex`: 검증할 정규 표현식입니다.
    -   `errorCallback`: 선택적 에러 콜백 함수입니다.
-   **`check()`**: 검증을 수행하고 모든 검증이 통과하면 `true`, 그렇지 않으면 `false`를 반환합니다.

### 미리 정의된 정규 표현식 상수

-   **`REGEX.EMAIL`**: 이메일 주소를 검증하기 위한 정규 표현식입니다.
-   **`REGEX.PASSWORD_STRONG`**: 강력한 비밀번호를 검증하기 위한 정규 표현식입니다. 대문자, 숫자, 특수 문자를 포함하도록 요구합니다.

### 에러 콜백 함수

사용자 정의 에러 콜백 함수를 정의하여 검증 오류를 처리할 수 있습니다. 기본적으로 라이브러리는 콘솔에 오류를 로그합니다. 콜백 함수는 다음 매개변수를 받습니다:

-   `data`: 검증에 실패한 데이터입니다.
-   `regex`: 데이터가 일치하지 않은 정규 표현식입니다.

### 기여

이 프로젝트에 기여하려면 문제를 제기하거나 풀 리퀘스트를 제출하거나 개선 사항을 제안해 주세요.

### 라이센스

이 프로젝트는 MIT 라이센스에 따라 라이센스가 부여됩니다.
