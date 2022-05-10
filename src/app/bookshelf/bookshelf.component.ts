import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BookshelfService } from './bookshelf.service';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css'],
})
export class BookshelfComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: any;
  private modalCloseSub: Subscription;
  private bookSelectedSub: Subscription;

  constructor(
    private bookshelfService: BookshelfService,
    private cmpFacResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.bookSelectedSub = this.bookshelfService.bookSelected.subscribe(
      (book) => {
        const alertMsg = `Successfully removed ${book.title} from your personal library.`;
        this.removeBookAlert(alertMsg);
      }
    );
  }

  ngOnDestroy() {
    this.bookSelectedSub.unsubscribe();
  }

  removeBookAlert(msg: string) {
    // Create Component Factory
    const alertCmpFactory =
      this.cmpFacResolver.resolveComponentFactory(AlertComponent);

    // Access View Container and Clear it
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    // Create new Alert Component Instance and Set the Message from Arguments
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.alertMsg = msg;

    // Clear Alert Method
    const clearAlert = () => {
      this.modalCloseSub.unsubscribe();
      hostViewContainerRef.clear();
    };

    // Close the Modal and Clear the Alert
    this.modalCloseSub = componentRef.instance.closeModal.subscribe(() => {
      clearAlert();
    });

    // Close Modal and Clear Alert after 3 seconds
    setTimeout(() => {
      if (this.modalCloseSub) clearAlert();
    }, 3000);
  }
}
