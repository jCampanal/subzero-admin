import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FormControls from './FormControls';
import FormHeader from './FormHeader';

const CategoryForm = () => {
    const methods = useForm();
    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                }}
                header={<FormHeader />}
                contentToolbar={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <h1>Some text for the header</h1>
                    </div>
                }
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <FormControls />
                    </div>
                }
            />
        </FormProvider>
    );
};

export default CategoryForm;
