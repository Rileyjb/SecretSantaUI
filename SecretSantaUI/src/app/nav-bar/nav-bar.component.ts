import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../group/group-services/group.service';
import { Users } from '../login/models/Users.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() page: string = '';

  public user: Users = new Users;
  public searchStr: string = '';
  

  constructor(
    private router: Router,
    private groupService: GroupService
  ) { 
   
  }

  ngOnInit(): void {
    
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}').firstName;
  }

  public Search(): void {
    this.groupService.GroupSearch(this.searchStr!);
  }

  public Logout(): void {
    localStorage.clear();
    this.router.navigate(['#']);
  }

}
