import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../group/group-services/group.service';
import { Users } from '../../login/models/Users.model';
import { Items } from '../Modal/Items.modal';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.scss']
})
export class UserWishlistComponent implements OnInit {

  public itemList: Items[] = [];

  private currentUser: Users = new Users();
  private santaId: number = 0;

  constructor(
    private router: ActivatedRoute,
    private ItemsService: ItemsService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    this.router.params.subscribe(params => {
      this.santaId = +params['id'];

      this.ItemsService.GetItemsById(this.santaId).subscribe((data:Items[]) => {
        if (data !== null) {
          this.itemList = data;
        }
      })
    });
  }

}
