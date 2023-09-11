import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from 'src/app/User';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
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
    private userService: UserService,
    private router: Router,
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
            if (error.error) {
              if (error.error.data) {
                const errorData = error.error.data;
                if (errorData.email) {
                  this.notification.error(errorData.email, 'Email Error');
                }
                if (errorData.title) {
                  this.notification.error(errorData.title, 'Title Error');
                }
              } else {
                this.notification.error(error.error, 'Error');
              }
            } else {
              this.notification.error('Unknown error', 'Error');
            }
          }
        );
      }
    });
  }

  editUser(user: User | undefined) {
    if (user && user.id) {
      this.router.navigate(['/edit-user', user.id]);
    }
  }

  navigateToUserList() {
    this.router.navigate(['/']);
  }
}
