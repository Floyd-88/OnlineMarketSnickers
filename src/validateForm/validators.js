export default function useValidators() {
    //проверка на заполненное поле
  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? 'Поле ' + fieldName + ' не заполнено' : ''
  }
  //проверка на минимальное количество символов
  const minLength = (fieldName, fieldValue, min) => {
    return fieldValue.length < min ? `Поле ${fieldName} должно иметь минимум ${min} символов` : ''
  }
  //проверка на корректный электронный адрес
  const isEmail = (fieldName, fieldValue) => {
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !re.test(fieldValue) ? 'Введите корректный адрес электронной почты' : ''
  }
  //проверка на наличие только цифр в телефоне
  const isNum = (fieldName, fieldValue) => {
    let isNum = /^\d+$/.test(fieldValue);
    return !isNum ? "Введите коректный номер телефона" : "";
}
  //проверка на наличие только букв в имени
  const isName = (fieldName, fieldValue, min) => {
    let isName = /^[a-zA-Zа-яА-Я]+$/.test(fieldValue);
    if(!isName) {
        return "Введите коректное имя"
    } else {
        return fieldValue.length < min ? `Поле ${fieldName} должно иметь минимум ${min} символов` : ''
    }
}


  return { isEmpty, minLength, isEmail, isNum, isName }
}
