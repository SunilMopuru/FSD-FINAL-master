import {Component ,OnInit, EventEmitter, Output, Input } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../model/project-model';

@Component({
  selector: 'ngbd-modal-project',
  templateUrl: './project-modal.html'
})
export class NgbdProjectModal {
  @Input('allProject') public projectList: Project[];  
  @Output('selectedProjectEvent') selectedProjectEvent = new EventEmitter<Project>();
  closeResult: string;
  constructor(
    private modalService: NgbModal
    ) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-search-project', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  select(project : Project)
  {
    this.selectedProjectEvent.emit(project);
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