import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../login/models/Users.model';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.scss']
})
export class UserWishlistComponent implements OnInit {

  private currentUser: Users = new Users();
  private santaId: number = 0;

  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    this.router.params.subscribe(params => {
      this.santaId = +params['id'];
    });
  }

}
