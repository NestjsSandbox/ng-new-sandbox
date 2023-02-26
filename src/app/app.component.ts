import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-practice';
  posts = [
    {
      title: 'Green Tree',
      imageUrl: 'assets/images/tree.jpeg',
      username: 'nature',
      content: 'Saw this awseom tree during my hile today.',
    },
    { 
      title: 'Snowy Mountain',
    imageUrl: 'assets/images/mountain.jpeg',
    username: 'mntn1',
    content: 'Mountain content.', },

    { 
      title: 'Biking',
    imageUrl: 'assets/images/biking.jpeg',
    username: 'bike22',
    content: 'I biked today.', },
  ];



}
