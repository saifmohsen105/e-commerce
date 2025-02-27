import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckOutService } from '../../core/services/checkOut/check-out.service';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit {
  readonly activatedRoute = inject(ActivatedRoute);
  readonly checkOutService = inject(CheckOutService);
  idCart: string = '';
  checkOutForm: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
  });
  showData(): void {
    console.log(this.checkOutForm.value);
    this.checkOutService
      .checkOutSesstion(this.idCart, this.checkOutForm.value)
      .subscribe({
        next: (res) => {
          switch (res.status) {
            case 'success':
              open(res.session.url);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramater) => {
      this.idCart = paramater.get('id') as string;
    });
    this.getUserOrder()
  }
  getUserOrder() {
    this.checkOutService.getUserOrder(this.idCart).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
