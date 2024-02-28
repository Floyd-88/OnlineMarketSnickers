import { reactive } from "vue";
import useValidators from '@/validateForm/validators'
const { isEmpty, minLength, isEmail, isNum, isName } = useValidators();

const errors = reactive({});
export default function useFormValidation() {
    const validateField = (fieldName, fieldValue) => {
        errors[fieldName] = isEmpty(fieldName, fieldValue)
     }
    const validateNameField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isName(fieldName, fieldValue, 3)
     }
     const validateLoginField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 2)
     }
     const validateEmailField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue)
    }
     const validatePhoneField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isNum(fieldName, fieldValue)
    }
    const validatePasswordField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 6)
    }

    return { errors, validateNameField, validateLoginField, validateEmailField, validatePasswordField, validatePhoneField, validateField }
}

