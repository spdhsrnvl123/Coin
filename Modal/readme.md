# modal 창 만들기

## 요점 : 부모컴포넌트에서 true,false값을 판단하는 state값을 만들어 버튼을 누를 때 마다 state값이 변경되는 함수를 만든다. state값을 자식컴포넌트에 props값으로 전달하여 이 자식 컴포넌트는 props를 이용하여 렌더링 될 요소에 조건식을 만들어준다.

## CSS

1. 버튼을 누르기 전에는 React에서 false값이어야 하니까 모달창을 안보이게 해준다 -> display:none
2. 버튼을 눌렀을 때는 React에서 true값이어야 하니까 모달창이 보여야된다. 기본 모달창과 함께 사용할 클래스 값을 만들어준다
   ->display:flex or display:block

## React

1. 부모 컴포넌트에서는 true값과 false값을 자식 컴포넌트에 props로 전달해 줄 state값을 만든다.
2. 자식컴포넌트에서는 클래스 조건식과 요소 조건식을 만든다.
