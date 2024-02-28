import { computed } from "vue";

export default function useSubmitButtonState(formInput, errors) {

    const isSignupButtonDisabled = computed(() => {
        let disabled = true;
        for (let prop in formInput) {
            if (!formInput[prop] || errors[prop]) {
                disabled = true;
                break;
            }
            disabled = false;
        }
        return disabled;
    });

    return { isSignupButtonDisabled }
}