import Categories from 'app/main/categories/Categories';
import FusePageSimple from '@fuse/core/FusePageSimple';

function CategoriesPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <Categories />
                </div>
            }
        />
    );
}

export default CategoriesPage;
