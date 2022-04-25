# To-Do-List

    1.먼저 form 형태를 만들어주고 input에서 text값이 변경 될 때 마다 input값을 state값으로 넣어 주기 위해 onChange API를 이용하여 함수를 설정해 값을 받아온다

    2.값이 변경될 때 마다 설정된 state값은 input안 value값에 넣어준다.

    3.form 내장 API인 onSubmit을 사용하여 값이 전송하기 전에 실행할 함수를 만들어 준다.

    4.onSubmit에 의하여 설정된 함수는 꼭 e.preventDefalut()로 이벤트를 막아준다. 왜냐하면 form HTML의 기본 동작이 Form을 전송하면 브라우저가 refresh가 되는거를 기본동작으로 하고 있기 때문이다.

    5.onSubmit에 의하여 설정된 함수는 input안에 value={state}값을 설정된 다른 초기값이 배열인 state값에 넣어준다.

    6. 해당 함수에서는 onSubmit 함수가 실행될 때 value값을 중복해서 넣어주기 위해서 spread Operator를 사용한다.(나머지 연산자)

    7. form 아래에는 렌더링 될 value값이 나와야 하기 때문에 map함수를 사용하여 렌더링 되게 만들어준다.

※내장 API onChange는 input에 값이 변경 될 때마다 설정한 함수가 실행되게 만든다.
※내장 API onSubmit은 form의 값을 전송하기 전에 어떤 작업을 하게 만들 수 있다.
