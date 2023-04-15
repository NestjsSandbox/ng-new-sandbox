import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [HttpClientTestingModule, SharedModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Layout', () => {
    it('has Sign up header', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const h1 = signUp.querySelector('h1');
      expect(h1?.textContent).toBe('Sign Up');
    });

    it('has username input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="username"]');
      const input = signUp.querySelector('input[id="username"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Username');
    });

    it('has email input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="email"]');
      const input = signUp.querySelector('input[id="email"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Email');
    });

    it('has password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="password"]');
      const input = signUp.querySelector('input[id="password"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Password');
    });

    it('has password type for password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;
      expect(input?.type).toBe('password');
      //Another option is:
      //expect(input?.getAttribute('type')).toBe('password');
    });

    it('has confirm-password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="confirmPassword"]');
      const input = signUp.querySelector('input[id="confirmPassword"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Confirm Password');
    });

    // Now create a test for 'has confirm password type for password input'

    it('has password type for confirm-password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector(
        'input[id="confirmPassword"]'
      ) as HTMLInputElement;
      expect(input?.type).toBe('password');
    });

    // Create a test for the 'has a Sign Up button' test
    it('has a Sign Up button', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.textContent).toContain('Sign Up');
    });

    //Create a test for 'it disables the Sign Up button initially'
    it('disables the Sign Up button initially', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeTruthy();
    });
  }); //end of Layout describe

  describe('Interactions', () => {
    let httpTestingController: HttpTestingController;
    let button: any; //HTMLButtonElement | null;
    let signUp: HTMLElement;

    const setupForm = async () => {
      httpTestingController = TestBed.inject(HttpTestingController);

      signUp = fixture.nativeElement as HTMLElement;
      await fixture.whenStable();

      const username = signUp.querySelector(
        'input[id="username"]'
      ) as HTMLInputElement;
      username.value = 'test-username';
      username.dispatchEvent(new Event('input'));

      const email = signUp.querySelector(
        'input[id="email"]'
      ) as HTMLInputElement;
      email.value = 'test@email.com';
      email.dispatchEvent(new Event('input'));

      const password = signUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;
      password.value = '1234';
      password.dispatchEvent(new Event('input'));

      const confirmPassword = signUp.querySelector(
        'input[id="confirmPassword"]'
      ) as HTMLInputElement;
      confirmPassword.value = '1234';
      confirmPassword.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      button = signUp.querySelector('button');
    }; //end of setupForm()

    it('enables the Sign Up button when password and password-confirm have same value', async () => {
      await setupForm();
      expect(button?.disabled).toBeFalsy();
    }); //end it enables Sign Up button when password === confmirmpPassword

    it('sends username, email & password to backend when calling API', async () => {
      await setupForm();
      button?.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      const reqBody = req.request.body;

      expect(reqBody).toEqual({
        username: 'test-username',
        password: '1234',
        email: 'test@email.com',
      });
    }); //end of it sends username, email & password to backend when calling API

    /**
     * In the following test, the button is clicked twice to simulate a scenario
     * where the user clicks on the button to submit the form, and during the API call,
     * they mistakenly click on the button again.
     * This can happen due to slow internet connectivity.
     * To prevent such situations, it's a good practice to disable the submit button
     * while the API call is in progress.
     */
    it('disables the Sign Up button when there is an ongoing api call', async () => {
      await setupForm();
      button?.click(); //This will accept the form and make the call
      fixture.detectChanges(); //This makes sure the UI is updated to reflect the change caused by the click
      button?.click(); //This will try to click the button again, but it should be disabled
      httpTestingController.expectOne('/api/1.0/users'); //Now we make the call
      expect(button?.disabled).toBeTruthy();
    }); //end of it disables the Sign Up button when there is an ongoing api call

    it('displays spinner after click on submit', async () => {
      await setupForm();
      expect(signUp.querySelector('span[role="status"]')).toBeFalsy();
      button?.click();
      fixture.detectChanges();
      expect(signUp.querySelector('span[role="status"]')).toBeTruthy();
    }); //end of it displays spinner when there is an ongoing api call

    it('displays account activation message after successful sign up', async () => {
      await setupForm();
      expect(signUp.querySelector('.alert-success')).toBeFalsy();
      button?.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      req.flush({}); // returnS a 200 OK response
      fixture.detectChanges();
      const message = signUp.querySelector('.alert-success');
      expect(message?.textContent).toContain(
        'Account activation link has been sent to your email'
      );
    }); //end of it displays account activation message after successful sign up

    it('hides sign up form after successful sign up', async () => {
      await setupForm();
      expect(
        signUp.querySelector('div[data-testid="form-sign-up"]')
      ).toBeTruthy();
      button?.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      req.flush({}); // returns a 200 OK response
      fixture.detectChanges();
      expect(
        signUp.querySelector('div[data-testid="form-sign-up"]')
      ).toBeFalsy();
    });
  }); //end of Interactions describe

  describe('Validation', () => {
    const genericTestValidation = (testParams: {
      itTitle: string;
      testid: string;
      inputId: string;
      inputValue: string;
      errorText: string;
    }) => {
      it(testParams.itTitle, async () => {
        const signUp = fixture.nativeElement as HTMLElement;

        expect(signUp.querySelector(`div[data-testid="${testParams.testid}"]`))
          .toBeNull;

        const genericInput = signUp.querySelector(
          `input[id="${testParams.inputId}"]`
        ) as HTMLInputElement;

        genericInput.value = testParams.inputValue;
        genericInput.dispatchEvent(new Event('input'));
        genericInput.dispatchEvent(new Event('blur'));

        fixture.detectChanges();

        const validationElement = signUp.querySelector(
          `div[data-testid="${testParams.testid}"]`
        );
        expect(validationElement?.textContent).toContain(testParams.errorText);
      });
    }; // end of genericTestValidation()

    genericTestValidation({
      itTitle: 'displays username required error when username is empty',
      testid: 'username-validation',
      inputId: 'username',
      inputValue: '',
      errorText: 'Username is required',
    });

    genericTestValidation({
      itTitle: 'displays length error when username is less than 4 chars',
      testid: 'username-validation',
      inputId: 'username',
      inputValue: 'abc',
      errorText: 'Username must be at least 4 characters long',
    });

    genericTestValidation({
      itTitle: 'displays email required error when email is empty',
      testid: 'email-validation',
      inputId: 'email',
      inputValue: '',
      errorText: 'Email is required',
    });

    genericTestValidation({
      itTitle: 'dispaly invalid email format when email wrong format',
      testid: 'email-validation',
      inputId: 'email',
      inputValue: 'wrong#email-format',
      errorText: 'Email format is invalid',
    });

    genericTestValidation({
      itTitle: 'displays password required error when password is empty',
      testid: 'password-validation',
      inputId: 'password',
      inputValue: '',
      errorText: 'Password is required',
    });

    genericTestValidation({
      itTitle: 'displays password rules error when password is wrong',
      testid: 'password-validation',
      inputId: 'password',
      inputValue: 'abc',
      errorText:
        'Password must have at leaset : 1 Uppercase, 1 lowercase and 1 number',
    });

    //======================================
    // I keep this version below for reference
    //======================================
    // it('displays username required error when username is empty', async () => {
    //   const signUp = fixture.nativeElement as HTMLElement;

    //   expect(signUp.querySelector('div[data-testid="username-validation"]'))
    //     .toBeNull;

    //   const usernameInput = signUp.querySelector(
    //     'input[id="username"]'
    //   ) as HTMLInputElement;
    //   //usernameInput.value = '';
    //   usernameInput.dispatchEvent(new Event('focus'));
    //   usernameInput.dispatchEvent(new Event('blur'));
    //   fixture.detectChanges();

    //   const validationElement = signUp.querySelector(
    //     'div[data-testid="username-validation"]'
    //   );
    //   expect(validationElement?.textContent).toContain('Username is required');
    // }); //end of it displays username required error when username is empty

    // it('displays length error when username is less than 4 chars', async () => {
    //   const signUp = fixture.nativeElement as HTMLElement;

    //   expect(signUp.querySelector('div[data-testid="username-validation"]'))
    //     .toBeNull;

    //   const usernameInput = signUp.querySelector(
    //     'input[id="username"]'
    //   ) as HTMLInputElement;

    //   usernameInput.value = 'abc';
    //   usernameInput.dispatchEvent(new Event('input')); //The input event does 2 things: 1. It updates the value of the input field and 2. And it causes a focus event to be fired on the input field
    //   usernameInput.dispatchEvent(new Event('blur'));

    //   fixture.detectChanges();

    //   const validationElement = signUp.querySelector(
    //     'div[data-testid="username-validation"]'
    //   );
    //   expect(validationElement?.textContent).toContain(
    //     'Username must be at least 4 characters long'
    //   );
    // }); //end of it displays username required error when username is empty
  }); //end of Validation describe
}); //end describe('SignUpComponent'
