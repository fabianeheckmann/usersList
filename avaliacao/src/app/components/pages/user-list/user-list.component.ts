import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from 'src/app/User';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentPage = 1;
  pageSize = 10;
  totalResults = 0;
  searchQuery: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.users = response.data;
        this.totalResults = response.total;
      },
      (error) => {
        console.error('Erro ao buscar usuários:', error);
      }
    );
  }

  pageIndexChanged(pageIndex: number) {
    this.currentPage = pageIndex;
    this.loadUsers();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  deleteUser(user: User | undefined) {
    if (user && user.id) {
      this.modalService.confirm({
        nzTitle: 'Confirmation',
        nzContent: `Are you sure you want to delete the user ${user.firstName}?`,
        nzOnOk: () => {
          if (user.id)
            this.userService.deleteUser(user.id).subscribe(
              () => {
                this.loadUsers();
                this.notification.success(
                  'Succcess',
                  `user ${user.firstName} successfully deleted`
                );
                this.router.navigate(['/user-list']);
              },
              (error) => {
                console.error('Error deleting user:', error);
              }
            );
        },
        nzOnCancel: () => {
          this.router.navigate(['/user-list']);
        },
      });
    }
  }

  editUser(user: User | undefined) {
    if (user && user.id) {
      this.router.navigate(['/edit-user', user.id]);
    }
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.totalResults) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  navigateToNewUser(){
    this.router.navigate(['/create-user']);
  }

  navigateToUserDetails(userId: string | undefined) {
    console.log(userId);
    if (userId !== undefined) {
      this.router.navigate(['/user', userId]);
    }
  }
}
