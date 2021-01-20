import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../group/group-services/group.service';
import { Users } from '../login/models/Users.model';
import { UserServiceService } from '../UserServices/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewChecked {

  public id!: number;
  public users: Users[] = []; 
  public secretSanta: string = '';
  public secretSantaId: number = 0;
  public ssFail: boolean = false;

  private currentUser: Users = new Users();

  constructor(
    private router: ActivatedRoute,
    private userService: UserServiceService,
    private groupService: GroupService
    ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    this.router.params.subscribe(params => {
      this.id = +params['id'];

      this.userService.getGroupUsers(this.id).subscribe(users => {
        if (users !== null) {
          this.users = users;
          const selectedUser = this.users.filter(x => x.secretSanta === this.currentUser.id );

          if (selectedUser.length > 0 && selectedUser[0].secretSanta) {
            this.secretSanta = selectedUser[0].firstName + ' ' + selectedUser[0].lastName;
            this.secretSantaId = selectedUser[0].id;
            
          }
        }
      });
    });

    this.groupService.searchGroup$.subscribe(data => {
      this.SearchUsers(data);
    });
  }

  ngAfterViewChecked() {
    this.highlightSelected();
  }

  private SearchUsers(searchStr: string): void {
    const users = document.querySelectorAll('.list-group-item');

    if(!searchStr || searchStr === undefined){
      users.forEach(node => {
        node.removeAttribute('hidden');
      });
    } else {
      users.forEach(node => {
        if(node.innerHTML.toString().includes(searchStr) === false) {
          node.setAttribute('hidden', 'true');
        }
      });
    }
  }

  private highlightSelected(): void {
    document.querySelectorAll('.list-group-item').forEach(node => {
      if(node.getAttribute('id') === this.secretSantaId.toString()) {
        const classes = node.getAttribute('class');
        node.setAttribute('class', 'selected-user ' + classes);
      }
    });
  }

  public GetSecretSanta(): void {
    this.ssFail = false

    const availableUsers = this.users.filter(x => x.secretSanta === 0 && x.id !== this.currentUser.id);
    const ranNum = Math.round(Math.floor(Math.random() * availableUsers.length));
    const ranUser = availableUsers[ranNum];

    if(ranNum > -1) {
      this.secretSanta = ranUser.firstName + ' ' + ranUser.lastName;
      this.secretSantaId = ranUser.id;

      this.highlightSelected();

      this.userService.setSecretSanta(ranUser.id, this.id, this.currentUser.id).subscribe(data => {
        if(data[0] < 1) {
          this.secretSanta = '';
          this.secretSantaId = 0;
          this.ssFail = true;
        }
      });
    } else {
      this.ssFail = true;
    }
  }
}
