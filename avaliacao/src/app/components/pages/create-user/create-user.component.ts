import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from 'src/app/User';
import { UserService } from 'src/app/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  btnText = 'Resgister';

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  navigateToScreenList(user: User) {
    this.router.navigate(['/']);
  }

  showScreenSelectionModal(user: User) {
    this.modalService.create({
      nzTitle: 'Choose Next Screen',
      nzContent: 'Where do you want to go next?',
      nzClosable: false,
      nzFooter: [
        {
          label: 'Users list',
          onClick: () => {
            this.navigateToScreenList(user);
            this.modalService.closeAll();
          },
        },
      ],
    });
  }

  async createHandler(user: User) {
    const formData = new FormData();

    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('title', user.title);
    formData.append('picture', user.picture);

    this.userService.createUser(user).subscribe(
      (response) => {
        this.notification.success('Success', 'User created'), response;
        this.showScreenSelectionModal(user);
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
}
