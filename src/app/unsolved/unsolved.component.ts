import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Word } from "../word";
import { WordService } from "../word.service"

@Component({
  selector: 'app-unsolved',
  templateUrl: 'unsolved.component.html',
  styleUrls: ['unsolved.component.css']
})
export class UnsolvedComponent implements OnInit {
  words: string[];
  currSolved: string;

  constructor(
    private wordService: WordService,
    private router: Router
  ) { }

  ngOnInit() {
    this.wordService.getUnsolved((function(data){
      var actualWords = [];
      var i = 0;
      for(i; i < data.length; i++){
        actualWords.push(data[i].text);
      }
      this.words = actualWords;
    }).bind(this)); //makes it so this is defined as THIS object
    //this is basically this-escapment causing this to be undefined
  }

  model = new Word("", "", false);

  toggleSolve(text) {
    if(this.model.text != text){
      this.model.text = text;
      this.currSolved = this.model.text;
    } else {
      if (this.currSolved == null) {
        this.currSolved = this.model.text;
      } else {
        this.currSolved = null;
      }
    }
  }

  solve(){
    this.wordService.solve(this.model.text, this.model.answer).then(() => this.router.navigate(['/solved']));
    this.currSolved = null;
    this.model = new Word("", "", false);
  }

  del(text){
    this.wordService.del(text).then(() => location.reload());
  }

  searchNaver(text){
    window.open(this.wordService.NAVER_URL+text);
  }
}
