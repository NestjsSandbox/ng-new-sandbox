import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [HttpClientTestingModule],
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
      expect(button?.textContent).toBe('Sign Up');
    });

    //Create a test for 'it disables the Sign Up button initially'
    it('disables the Sign Up button initially', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeTruthy();
    });
  }); //end of Layout describe

  describe('Interactions', () => {
    it('enables the Sign Up button when password and password-confirm have same value', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const password = signUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;

      const confirmPassword = signUp.querySelector(
        'input[id="confirmPassword"]'
      ) as HTMLInputElement;

      password.value = '123456789';
      password.dispatchEvent(new Event('input'));

      confirmPassword.value = '123456789';
      confirmPassword.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeFalsy();
    }); //end it enables Sign Up button when password === confmirmpPassword

    it('sends usernam, email & password to backen when calling API', () => {
      //const spy = spyOn(window, 'fetch');
      let httpTestingController = TestBed.inject(HttpTestingController);

      const signUp = fixture.nativeElement as HTMLElement;
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

      const button = signUp.querySelector('button');
      button?.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      const reqBody = req.request.body;

      expect(reqBody).toEqual({
        username: 'test-username',
        password: '1234',
        email: 'test@email.com',
      });
    }); //end of it sends username, email & password to backend when calling API
  }); //end of Interactions describe
}); //end describe('SignUpComponent'
