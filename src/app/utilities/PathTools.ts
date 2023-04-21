import { environment } from '../../environments/environment';

export const DomainName = environment.production ? 'https://dr.shop2city.ir' : 'https://localhost:44309';


//تعیین مسیر عکس
export const ImagePath = DomainName + '/images/products/origin/';
export const ImageGalleryPath = DomainName + '/images/product-galleries/';

