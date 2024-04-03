import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit{

  allTeam:any;
  allTeamUser:IUser[]=[];

  showUserStatus:boolean=true;

  constructor(private userService:UserService){

  }
  ngOnInit(): void {
      this.userService.myBehaviorSubject.subscribe((data:any)=>{
        this.allTeam=data;
        console.log(data);
    })
  }
  allTeamUsers(user:IUser[]){
    this.allTeamUser=user;
    this.showUserStatus=false;
  }

}
