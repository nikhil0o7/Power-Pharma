import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductReelMfg from '@/components/ProductReelMfg';
// import { trpc } from '@/trpc/client';

interface PageProps {
    params: {
        mfg_name: string;
        category: string;
    }
}

    // const { data: manufac } = trpc.manufacturers.useQuery({ limit: 1, id: mfg });
    // const { data: categ } = trpc.categories.useQuery({ limit: 1, id: product });

    // const manufacturer = manufac?.[0];
    // const product_category = categ?.[0];


const ManufacturerProductsPage = async ({ params }: PageProps) => {
    const product_category = decodeURIComponent(params.category);
    const manufacturer = decodeURIComponent(params.mfg_name);

    const sort = 'desc';

    return (
        <MaxWidthWrapper>
            <ProductReelMfg
                title={`Browse ${manufacturer} Products`}
                subtitle={`Category: ${product_category}`}
                query={{
                    manufacturer,
                    product_category,
                    limit: 1000,
                    sort:
                        sort === 'desc' || sort === 'asc'
                            ? sort
                            : undefined,
                }}
            />
        </MaxWidthWrapper>
    )
}

export default ManufacturerProductsPage