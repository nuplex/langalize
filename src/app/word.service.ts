import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http'

import { Word } from './word'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class WordService {
  //make sure to include http at start of url

  private ADD_URL = 'http://localhost:12345/api/add';
  private UNSOLVED_URL = 'http://localhost:12345/api/get_unsolved';
  private SOLVED_URL = 'http://localhost:12345/api/get_solved';
  private SOLVE_URL ='http://localhost:12345/api/solve';
  private DELETE_URL = 'http://localhost:12345/api/delete';

  public NAVER_URL = 'http://endic.naver.com/search.nhn?sLn=kr&searchOption=all&query=';

  constructor(private http: Http){}

  addWord(word: Word): Promise<Word> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http
      .post(this.ADD_URL, JSON.stringify({ word: word }), {headers: headers})
      .toPromise();
  }

  getUnsolved(callback): Promise<Object[]> {
    return this.http
      .get(this.UNSOLVED_URL)
      .toPromise()
      .then(function(response){
        var res = (JSON.parse(JSON.stringify(response)));
        var words = (JSON.parse(res._body)).result;
        callback(words);
      });
  }

  getSolved(callback): Promise<Object[]> {
    return this.http
      .get(this.SOLVED_URL)
      .toPromise()
      .then(function(response){
        var res = (JSON.parse(JSON.stringify(response)));
        var words = (JSON.parse(res._body)).result;
        callback(words);
      });
  }

  solve(text: string, answer: string): Promise<Object> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http
      .post(this.SOLVE_URL, JSON.stringify({text: text, answer: answer}), {headers: headers})
      .toPromise();
  }

  del(text: string){
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http
      .post(this.DELETE_URL, JSON.stringify({text: text}), {headers: headers})
      .toPromise();
  }

}
