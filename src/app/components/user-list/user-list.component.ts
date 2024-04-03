import { Component, ElementRef, OnInit } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users:IUser[]=[];
  forSearchUsers:IUser[]=[];
  searchByFilteredValue:IUser[]=[];

  userSearchByGender:string="";
  selectedAvailability: string = '';
  selectedDomain:string="";

  createTeamCheckVisible:boolean=false;
  teamDetailsStatus=false;
  selectedUsers: IUser[] = [];


  currentPage=1;
  constructor(private userService:UserService,private router:Router){

  }
  ngOnInit(): void {
    this.getAllUsers();
    //this is for show team details button
    this.userService.myBehaviorSubject.subscribe((data:any)=>{
      this.teamDetailsStatus=true;
    });
  }
  getAllUsers(){
    this.userService.getUsers().subscribe((users:any)=>{
      // console.log(users);
      this.users=[...users];
      this.forSearchUsers=[...users];
      this.searchByFilteredValue=[...users];

    });
  }
  //this is user for current page
  pageChanged(page:any){
    // console.log(page);
    this.currentPage=page;
  }
  searchUserName(data:HTMLInputElement){
    let value=data.value;
    this.userSearchByGender="";
    this.selectedAvailability="";
    this.selectedDomain='';
    // console.log(data);

    // search with first name and last name 
    let users=[...this.users];
    let name=value.split(" ");
    if(name[0]){
      users=users.filter(user=>{
        return user.first_name.toLowerCase().includes(name[0].toLowerCase());
      })
    }
    if(users && name[1]){
      users=users.filter(user=>{
        return user.last_name.toLowerCase().includes(name[1].toLowerCase());
      })
    }
    this.forSearchUsers=[...users];
    this.searchByFilteredValue=[...users];
  }
  filterUsersByGender(): void {
    if (this.userSearchByGender =='') {
      this.forSearchUsers = [...this.searchByFilteredValue];
    }
     else {
      
      this.forSearchUsers = this.searchByFilteredValue.filter(user => user.gender.toLowerCase() === this.userSearchByGender.toLowerCase());
    }
  }
  filterUsersByAvailability(): void {
    if (this.selectedAvailability === '') {
      this.forSearchUsers = [...this.searchByFilteredValue];
    } else {
      // Filter users based on the selected availability
      const availability = this.selectedAvailability === 'true';
      this.forSearchUsers = this.searchByFilteredValue.filter(user => user.available === availability);
    }
  }
  filterUsersByDomain(){
    if (this.selectedDomain =='') {
      this.forSearchUsers = [...this.searchByFilteredValue];
    }
     else {
      
      this.forSearchUsers = this.searchByFilteredValue.filter(user => user.domain.toLowerCase() === this.selectedDomain.toLowerCase());
    }
  }
  //this is used for show checkbox on user cart
  onCreateTeam(){
    this.createTeamCheckVisible=true;
  }
  //this is  used for hide checkbox on user cart
  onCancelTeam(){
    this.createTeamCheckVisible=false;
  }
  isUserSelected(user:IUser){
    // console.log('hi');
    
    return this.selectedUsers.includes(user);
  }
  //this method create team 
  toggleUserSelection(user: IUser) {
    let selectedDomain=user.domain;
    if(this.selectedUsers.find(findUser=>findUser.domain!=selectedDomain || findUser.available!=user.available)){
      return;
    }
    const index = this.selectedUsers.indexOf(user);
    if (index > -1) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(user);
    }
    //this condition show only specific domain and availablity
    if(this.selectedUsers.length){
      this.forSearchUsers=this.forSearchUsers.filter(findUser=>findUser.domain==selectedDomain && findUser.available==user.available)
    }
    else{
      this.forSearchUsers=[...this.users];
    }

    // console.log(this.selectedUsers);
  }
  onTeamSubmit(){
    this.userService.setToLocalStorage(this.selectedUsers);
    this.router.navigate(['/team-details']);
  }
  
}
