import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  length = 0;
  myPassword = '';
  useLetters = false;
  useNumbers = false;
  useSymbols = false;

  onChangeLength(event: Event) {
    const target = event.target as HTMLInputElement;
    const parsedValue = parseInt(target.value);

    if (!isNaN(parsedValue)) this.length = parsedValue;
  }

  onButtonClick() {
    this.myPassword = 'My Password';
    console.log('Status=Letters ' + this.useLetters);
    console.log('Status=Numbers ' + this.useNumbers);
    console.log('Status=Symbols ' + this.useSymbols);
    console.log('Status=Length  ' + this.length);
  }

  onChangeUseLetters() {
    this.useLetters = !this.useLetters;
  }
  onChangeUseNumbers() {
    this.useNumbers = !this.useNumbers;
  }
  onChangeUseSymbols() {
    this.useSymbols = !this.useSymbols;
  }
}
