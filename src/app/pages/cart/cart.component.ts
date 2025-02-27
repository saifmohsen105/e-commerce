import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/cart/cart.service';
import { LoadingComponent } from '../../shared/components/ui/loading/loading/loading.component';
import { ICartDetails } from '../../shared/interfaces/icart-details';
import { CustomSlicePipe } from '../../shared/pipes/customSlice/custom-slice.pipe';

@Component({
  selector: 'app-cart',
  imports: [
    FormsModule,
    LoadingComponent,
    CommonModule,
    CustomSlicePipe,
    RouterLink,
],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  readonly cartService = inject(CartService);
  cartDetails: ICartDetails = {} as ICartDetails;
  isLoading: boolean = true;
  isEmpty: boolean = true;
  ngOnInit(): void {
    this.getCartData();
  }
  getCartData() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.isEmpty = res.numOfCartItems > 0 ? false : true;
        this.isLoading = false;
        this.cartDetails = res.data;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // function remove product
  removeCart(id: string): void {
    this.cartService.deleteSpecificCart(id).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // library sweets alert deleted
  deleteProduct(productId: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'bg-green-500 text-white px-5 py-2 ms-3',
        cancelButton: 'px-5 py-2 bg-red-500 text-white',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this product!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.removeCart(productId);
          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            text: 'The product has been removed from your cart.',
            icon: 'success',
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your product is still in the cart.',
            icon: 'error',
          });
        }
      });
  }

  updateCount(id: string, newCount: number) {
    this.cartService.updateCountProduct(id, newCount).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
