import Products from 'app/main/products/Products/Products';
import FusePageSimple from '@fuse/core/FusePageSimple';

function ProductsPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <Products />
                </div>
            }
        />
    );
}

export default ProductsPage;
