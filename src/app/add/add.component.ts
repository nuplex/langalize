import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import {WordService} from '../word.service'
import {Word} from "../word";

@Component({
  selector: 'app-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private router: Router,
    private wordService: WordService
  ) { }

  ngOnInit() {}

  model = new Word("", "", false);

  add(){
    this.wordService
      .addWord(this.model).then(() => this.router.navigate(['/unsolved']));
    this.model.text = "";
  }

}
