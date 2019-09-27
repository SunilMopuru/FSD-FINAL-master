import {Component ,OnInit, EventEmitter, Output, Input } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ParentTask } from '../model/task-model';

@Component({
  selector: 'ngbd-modal-parent-task',
  templateUrl: './parentTask-modal.html'
})
export class NgbdParentTaskModal {
  @Input('allParent') public allParent: ParentTask[];  
  @Output('selectedParentTaskEvent') selectedParentTaskEvent = new EventEmitter<ParentTask>();
  closeResult: string;
  constructor(
    private modalService: NgbModal
    ) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-search-parent-task', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  select(parentTask : ParentTask)
  {
    this.selectedParentTaskEvent.emit(parentTask);
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