const form = document.querySelector(".form");
form.addEventListener("submit", formSend);

async function formSend(e) {
	e.preventDefault();

	let formData = new FormData(form);

	let xhr = new XMLHttpRequest();

	xhr.open("POST", "sendmail.php", true)
	if (validateForm(form)){
		xhr.send(formData)
	}

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				console.log('Отправлено');
				form.reset()
				window.location.href = "sucess-send.html";
			}
		}
	}

}


// Сообщение об ошибке
function setError(input, errormsg) {
	const formGroup = input.parentElement;
	const inputAlert = formGroup.querySelector(".input-alert");
	formGroup.className = "form-group error";
	inputAlert.innerText = errormsg;
}

// Успешное сообщение
function setSuccess(input) {
	const formGroup = input.parentElement;
	formGroup.className = "form-group success";
}

// Валидация Email
function validEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

// Проверка валидности формы
function validateForm(form) {
	if (form.name.value.trim() === "") {
		setError(form.name, "Обязательное поле");
		return false;
	} else {
		setSuccess(form.name);
	}

	if (form.email.value.trim() === "") {
		setError(form.email, "E-mail не может быть пустым");
		return false;
	} else if (!validEmail(form.email.value.trim())) {
		setError(form.email, "Некорректный e-mail");
		return false;
	} else {
		setSuccess(form.email);
	}

	if (form.message.value.trim() === "") {
		setError(form.message, "Обязательное поле");
		return false;
	} else {
		setSuccess(form.message);
	}

	console.log("checkbox checked is ", form.agree.checked);
	if (!form.agree.checked) {
		document.querySelector('#agree_chk_error').style.visibility = 'visible';
		return false;
	}
	else {
		document.querySelector('#agree_chk_error').style.visibility = 'hidden';
	}

	return true;
}

// загрузчик текстовых файлов

let upload = document.getElementById('upload')
let outputBx = document.getElementById('outboxBx')

upload.addEventListener("change", () => {
	let fr = new FileReader()
	fr.readAsText(upload.files[0])
	fr.onload = function () {
		outboxBx.innerHTML = fr.result
	}
})