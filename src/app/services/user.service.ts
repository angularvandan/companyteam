import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUser } from '../shared/interfaces/user';

const TEAM_OF_USER='user_team'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  myBehaviorSubject = new BehaviorSubject<IUser[]>(this.getFromLocalStorage());

  team:IUser[]=[];

  constructor(private http:HttpClient) {

  }
  getUsers(){
    return this.http.get('https://companyteam-backend.onrender.com/users');
  }
  setToLocalStorage(user: any) {
    if(this.getFromLocalStorage.length){
      this.team=[...this.getFromLocalStorage()];
    }
    this.team.push(user);
    this.myBehaviorSubject.next(this.team);
    localStorage.setItem(TEAM_OF_USER, JSON.stringify(this.team));
  }
  private getFromLocalStorage() {
    const sellerJson = localStorage.getItem(TEAM_OF_USER);
    if (sellerJson) {
      return JSON.parse(sellerJson);
    }
    return [];
  }

}
