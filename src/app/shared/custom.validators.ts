import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    static emailDomain(domainName: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const email: string = control.value;
            const domain = email.substring(email.lastIndexOf('@') + 1);
            if (email === '' || domain.toLowerCase() === domainName.toLocaleLowerCase()) {
                return null;
            } else {
                return { 'emailDomain': true };
            }
        };
    }

    static panFormat(control: AbstractControl): { [key: string]: any } | null {
        const pan: string = control.value;

        var regpan = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;

        if (regpan.test(pan)) {
            return null;
        } else {
            return { 'panFormat': true };
        }
    }
}