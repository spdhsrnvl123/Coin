# React 문법
### JSX

JavaSript + XML

- JavaScript에 HTML 태그를 끼얹은 문법
- HTML 태그 안에서 중괄({ })를 사용해서 Javascript문법을 사용할 수 있다.

`const count = 1;`

`const title = <h1>{count} 번째 고양이 </h1>`

※ 위 title변수에 담은 h1 태그는 리액트 엘리먼트라고 부른다.

### Babel

최신 문법을 브라우저가 이해할 수 있는 JavaScript로 통역

- 브라우저는 JSX를 이해하지 못한다.
- Babel 이라는 통역사로 JSX → Javascript

Ex)

React : const title = <h1>안녕</h1>
브라우저 : 뭐라고?
Babel : const title = React.createElement(’h1’,null,’안녕’)이래요
브라우저 : 아하!

### 리액트 코드 브라우저에 그리기

빈 HTML 공간에 React 때려박기

[HTML]
`<div id = “app”></div>`

[React]
`const target = document.querySelector(”#app”)
const myButton = <button>버튼</button>`

`ReactDOM.render(myButton,target)`

### component

여기저기 재사용 가능한 UI 코드 조각

`<Card emoji = {dog} title = ”멍멍” />
<Card emoji = {cat} title = “야옹” >`

`function Card(props){`

`return(`

`<div>`

`{props.emoji}`

`<h2>{props.title}</h2>`

`</div>`

`)`

`}`

### 스타일링

리액트에 CSS 끼얹기

- CSS 클래스 : className
- 인라인 스타일링 : style = {{스타일속성 : 스타일값}}

<div className = “danger”>위험</div>
<div style = {{color : ‘red’}}>위험</div>

### 이벤트

사용자 이벤트(클릭,스크롤 등) 다루기

일반 자바스크립트 이벤트 목록과 동일하지만 중간에 대문자로 쓰면 된다.

- onclick → onClick
- onsubmit → onSubmit

`function handleClick(event){`

`console.log(”클릭했습니다”)`

`}`

`<button onClick = {handleClick}>제출</button>`

### 상태

컴포넌트 안에서 자유롭게 변경할 값이 필요할 때

- useState 함수로 상태를 추가할 수 있다.
- const [상태명 , 상태변경함수명] = React.useState(초기값)
- 컴포넌트 안에서 만들 수 있다.

`const [counter , setCounter] = React.useState(1)`

`function 카운터증가(){`

`setCounter(counter + 1);`

`}`

return <button onClick = {카운터증가}>카운터는 {counter}</button>

### 리스트

배열로 반복되는 UI그리기

- 웹사이트를 만들 때 정말 많이 쓴다.
- 배열에서 map을 돌면서 리액트 UI를 반환한다.

`const favorites = [”이미지1”,”이미지2”,”이미지3”]`

`<ul>`

`{favorites.map(image ⇒ <img src ={image} />)}`

`</ul>`

### 폼

사용자 입력 다루기

- 사용자 입력값을 직접 다루기 위해 value를 상태로 관리한다.

`const [value,setValue] = React.useState('초기값이에요')
function onValueChange(e){
setValue(e.target.value);
}
<form onSubmit = {handleSubmit}>
<input value={value} onChange={onValueChange} />
<button type="submit">제출</button>
</form>`

### 로컬스토리지(리액트 문법이 아니다,브라우저 기능이다)

브라우저에 데이터 저장하기

- 간단한 데이터 저장이 필요할 땐 localStorage를 쓴다.
- 7일까지 저장기능 - webkit관련 브라우저

localStorage.setItem(’이름’,’유림’)

localStorage.getItem(’이름’) //유림

## **create-react-app**

리액트 초기 개발에 필요한 모든 것을 자동으로 해준다.

1. 간단한 앱 껍데기
2. 리액트 라이브러리 셋업(개발용/프로덕션용)
3. 웹팩 셋업
1.라이브 서버
2.저장할때마다 JSX -> JS
4. 테스트 셋업
5. 빌드 셋업
1. JS로 변환, 코드 용량 최소화, 프로덕션 라이브러리 설정 등
