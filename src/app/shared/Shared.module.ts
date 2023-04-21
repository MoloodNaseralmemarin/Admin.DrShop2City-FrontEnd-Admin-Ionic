import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';
import { NgxImageCompressService } from 'ngx-image-compress';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ImagePickerComponent
  ],
  declarations: [
    ImagePickerComponent
  ],
  providers: [
    NgxImageCompressService
  ]
})
export class SharedModule {
}
