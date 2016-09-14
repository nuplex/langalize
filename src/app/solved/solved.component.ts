import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Word} from "../word";
import { WordService } from "../word.service"

@Component({
  selector: 'app-solved',
  templateUrl: 'solved.component.html',
  styleUrls: ['solved.component.css']
})
export class SolvedComponent implements OnInit {

  words: Word[];

  constructor(
    private wordService: WordService,
    private router: Router
  ) { }

  ngOnInit() {
    this.wordService.getSolved((function(data){
      var actualWords = [];
      var i = 0;
      for(i; i < data.length; i++){
        actualWords.push(new Word(data[i].text, data[i].answer, true));
      }
      this.words = actualWords;
    }).bind(this)); //makes it so this is defined as THIS object
    //this is basically this-escapment causing this to be undefined
  }

  del(text){
    this.wordService.del(text).then(() => location.reload());
  }

}
