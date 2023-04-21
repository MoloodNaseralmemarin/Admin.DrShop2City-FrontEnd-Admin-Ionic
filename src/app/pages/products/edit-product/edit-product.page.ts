import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditProductViewModel } from '../../../DTOs/Products/EditProductViewModel';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  editProduct: EditProductViewModel = null;
  editForm: FormGroup = null;
  selectedImage = '';

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController:AlertController
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.productId !== null && params.productId !== undefined) {
        this.productsService.getProductForEdit(parseInt(params.productId, 0)).subscribe(res => {
          if (res.status === 'Success' ) {
            this.editProduct = res.data;
            this.editForm = new FormGroup({
              productName: new FormControl(
                this.editProduct.productName,
                [
                  Validators.required,
                  Validators.maxLength(100)
                ]
              ),
              price: new FormControl(this.editProduct.price,
                [
                  Validators.required,
                ]),
              shortDescription: new FormControl(this.editProduct.shortDescription,
                [
                  Validators.required,
                  Validators.maxLength(100)
                ]),
              description: new FormControl(this.editProduct.description,
                [
                  Validators.required,
                ]),
              isExists: new FormControl(this.editProduct.isExists,
                [
                  Validators.required,
                ]),
              isSpecial: new FormControl(this.editProduct.isSpecial,
                [
                  Validators.required,
                ]),
            });
          } else {
            if(res.status=='NoAccess'){
              this.alertController.create({
                header:'اخطار',
                message:'شما به این بخش دسترسی ندارید',
                buttons:['باشه']
              }).then(alertEl=>{
                alertEl.present();
                this.router.navigate(['/products']);
              });
            }
          }
        });
      }
    });
  }

  submitEditForm() {
    if (this.editForm.valid) {
      const editedProduct = new EditProductViewModel(
        this.editProduct.id,
        this.editForm.controls.productName.value,
        this.editForm.controls.price.value,
        this.editForm.controls.shortDescription.value,
        this.editForm.controls.description.value,
        this.editProduct.currentImage,
        this.editForm.controls.isExists.value,
        this.editForm.controls.isSpecial.value,
        this.selectedImage
      );
      this.productsService.editProduct(editedProduct).subscribe(res => {
        if (res.status === 'Success') {
          this.router.navigate(['/products']);
        }
      });
    } else {
      this.editForm.markAsTouched();
    }
  }

  changeImage(event: any) {
    this.selectedImage = event;
  }
}
