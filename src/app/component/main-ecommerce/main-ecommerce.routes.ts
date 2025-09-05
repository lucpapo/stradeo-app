import { Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PricingComponent } from './pricing/pricing.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductComponent } from './product/product.component';
import { WishlistComponent } from './wishlist/wishlist.component';

export default [
  {
    path: 'add-products',
    component: AddProductComponent,
    data: {
      title: "Add-Product",
      breadcrumb: "Add-product",
    }
  },
  {
    path: 'products',
    component: ProductComponent,
    data: {
      title: "Product",
      breadcrumb: "Product",
    }
  },
  {
    path: 'product-page',
    component: ProductPageComponent,
    data: {
      title: "Product Page",
      breadcrumb: "Product Page",
    }
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    data: {
      title: "Product List",
      breadcrumb: "Product List",
    }
  },
  {
    path: 'payment-detail',
    component: PaymentDetailsComponent,
    data: {
      title: "Payment Details",
      breadcrumb: "Payment Details",
    }
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    data: {
      title: "Recent Orders",
      breadcrumb: "Recent Orders",
    }
  },
  {
    path: 'cart',
    component: CartComponent,
    data: {
      title: "Cart",
      breadcrumb: "Cart",
    }
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    data: {
      title: "Wishlist",
      breadcrumb: "Wishlist",
    }
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: {
      title: "Checkout",
      breadcrumb: "Checkout",
    }
  },
  {
    path: 'pricing',
    component: PricingComponent,
    data: {
      title: "Pricing",
      breadcrumb: "Pricing",
    }
  },
] as Routes;
