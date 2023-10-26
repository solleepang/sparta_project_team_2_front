window.onload = () => {
    console.log("회원가입 페이지 연결 완료")
}

async function handleSignup() {
    const username = document.getElementById("username_input").value;
    const nickname = document.getElementById("nickname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const image = document.getElementById("image");
  
    console.log(username, nickname, email, password, password2);
  
    //각 유효성 검사 에러메세지 변수값
    const usernameError = document.getElementById("username-error");
    const nicknameError = document.getElementById("nickname-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const password2Error = document.getElementById("password2-error");
  
    //innertext를 먼저 초기화를 시켜놓고 각 에러 변수의 메세지를 추가하고 지정함
    usernameError.innerText = "";
    nicknameError.innerText = "";
    emailError.innerText = "";
    passwordError.innerText = "";
    password2Error.innerText = "";
  
    // 필드 값 자정해주고 필드 비어있을경우 에러 메세지 발생
    const usernameValue = username;
    const nicknameValue = nickname;
    const emailValue = email;
    const passwordValue = password;
    const password2Value = password2;
  
    if (!usernameValue) {
      usernameError.innerText = "이름을 입력하세요.";
      return;
    }
    if (!nicknameValue) {
        usernameError.innerText = "활동명을 입력하세요.";
        return;
      }
    if (!emailValue) {
      emailError.innerText = "이메일을 입력하세요.";
      return;
    }
    if (!passwordValue) {
      passwordError.innerText = "비밀번호를 입력하세요.";
      return;
    }
    if (!password2Value) {
      password2Error.innerText = "비밀번호 확인을 입력하세요.";
      return;
    }
  
    // 비밀번호가 일치하지 않을 때
    if (password !== password2) {
      password2Error.innerText = "비밀번호가 일치하지 않습니다.";
      return;
    }
  
    //form data 사용하여 서버로 전송
    const formData = new FormData();
    formData.append("username", username);
    formData.append("nickname", nickname);
    formData.append("email", email);
    formData.append("password", password);
  
    // 프로필 이미지가 선택되었을 때만 FormData에 추가
    //존재하면 프로필 이미지를 FormData에 추가, 아니면 FormData에는 해당 필드를 추가하지 않도록 변경
    if (image.files[0]) {
      formData.append("image", image.files[0]);
    }
  
    const response = await fetch("http://127.0.0.1:8000/user/signup/", {
      method: "POST",
      body: formData,
    });
  
    if (response.status === 201) {
      // 회원가입 성공
      alert("회원가입이 성공적으로 완료되었습니다.");
      window.location.href = "/user/login.html";
    } else if (response.status === 400) {
      // 유효성 검사 실패 시 오류 메시지를 받아와 화면에 표시
      const errorData = await response.json();
  
      if (errorData.message) {
        // username 중복 에러 메시지가 있다면 표시
        if (errorData.message.username) {
          usernameError.innerText = errorData.message.username[0];
        }
  
        // password 유효성 에러 메시지가 있다면 표시
        if (errorData.message.password) {
          const passwordErrors = errorData.message.password;
          const passwordErrorMessage = passwordErrors.join("\n"); // 여러 오류 메시지를 개행으로 연결
          passwordError.innerText = passwordErrorMessage;
        }
  
        // email 에러 중복 메시지가 있다면 표시
        if (errorData.message.email) {
          emailError.innerText = errorData.message.email[0];
        }
      }
    }
  }

