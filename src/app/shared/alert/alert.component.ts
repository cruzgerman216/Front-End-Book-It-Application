import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Input() alertMsg: string;

  constructor() {}

  ngOnInit(): void {}

  onCloseModal() {
    this.closeModal.emit();
  }
}
