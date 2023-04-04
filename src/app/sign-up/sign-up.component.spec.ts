import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
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
    } );

    //Create a test for 'it disables the Sign Up button initially'
    it('disables the Sign Up button initially', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeTruthy();
    } );  

  }); //end of Layout describe
});
