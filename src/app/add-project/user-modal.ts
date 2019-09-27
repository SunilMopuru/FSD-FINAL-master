import {Component ,OnInit, EventEmitter, Output, Input } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/user-model';

@Component({
  selector: 'ngbd-modal-user',
  templateUrl: './user-modal.html'
})
export class NgbdModalBasic {
  @Input('userList') public userList: User[];  
  @Output('selectedUserEvent') selectedUserEvent = new EventEmitter<User>();
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    ) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-search-user', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  select(user : User)
  {
this.selectedUserEvent.emit(user);
this.modalService.dismissAll();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}