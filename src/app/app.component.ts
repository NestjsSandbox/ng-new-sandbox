import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  randomText = faker.lorem.sentence().trim().substring(0, 5);
  enteredText = '';




  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.enteredText = target.value;
    console.log('result = ' + this.enteredText);

  }
}
