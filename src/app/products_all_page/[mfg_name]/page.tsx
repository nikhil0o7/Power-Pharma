import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductReelMfg from '@/components/ProductReelMfg';
import ProductReelMfgAll from '@/components/ProductReelMfgAll';
import { trpc } from '@/trpc/client';
// import { trpc } from '@/trpc/client';

interface PageProps {
    params: {
        mfg_name: string;
        category: string;
    }
}


const ManufacturerProductsPage = async ({ params }: PageProps) => {
    const product_category = decodeURIComponent(params.mfg_name);
    const sort = 'desc';

    return (
        <MaxWidthWrapper>
            <ProductReelMfgAll
                title={`Browse ${product_category} Products`}
                subtitle={`Category: All`}
                query={{
                    product_category,
                    limit: 100,
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