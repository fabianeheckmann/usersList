import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from 'src/app/User';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userId: string | null = null;
  user: User = {
    title: '',
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    phone: '',
    picture: '',
    location: {},
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      if (this.userId !== null) {
        this.userService.getUserById(this.userId).subscribe(
          (user) => {
            this.user = user;
          },
          (error) => {
            this.notification.error('fetching user information', error);
          }
        );
      }
    });
  }

  updateUserData() {
    if (this.userId) {
      this.userService.updateUser(this.userId, this.user).subscribe(
        (updatedUser) => {
          this.notification.success('succes', 'user updated successfully');
          this.router.navigate(['/user', this.userId]);
        },
        (error) => {
          this.notification.error(error, 'Error updating user data');
        }
      );
    }
  }

  navigateToUserList() {
    this.router.navigate(['/user-list']);
  }
}
