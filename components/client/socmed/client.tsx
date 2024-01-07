'use client';

import { useState } from 'react';

import { FormProps, SocmedForm } from '../socmed-form';
import { SocmedList } from './socmed-list';
import { Button } from '@/components/ui/button';

export type SocmedType = {
  id: string;
  siteName: string;
  siteUrl: string;
  imageUrl: string;
};

interface SocMedClientProps extends FormProps {
  data: SocmedType[];
}

export const SocMedClient: React.FC<SocMedClientProps> = ({ data, initialData }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SocmedList data={data} initialData={initialData} />

      {open ? null : (
        <Button
          variant="green"
          onClick={() => setOpen(true)}
          className="flex w-max min-w-max ml-auto !mt-8 border-[1px] border-transparent"
        >
          Add New
        </Button>
      )}
      {open && <SocmedForm initialData={initialData} setOpen={setOpen} open={open} />}
    </>
  );
};
