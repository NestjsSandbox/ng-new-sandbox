import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [HttpClientTestingModule, SharedModule, FormsModule],
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
    };

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
}); //end describe('SignUpComponent'
