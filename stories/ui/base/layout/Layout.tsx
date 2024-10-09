import { Footer } from "../../section/footer/Footer";
import React, { ReactNode } from 'react';

import dt from './layout-data.json'
import { Navigation } from "../navigation/Navigation";
import { Meta } from "../Meta";

type SchemaData = {
  menu?: any;
  footer?: any;
  general?: any;
  subscribe?: any;
}

interface LayoutProps {
  data?: SchemaData;
  children?: ReactNode;
}

export const Layout = ({ data, children }: LayoutProps) => {
  const menu = data?.menu || dt?.menu;
  const footer = { ...dt?.footer, ...data?.footer };
  
  return (
    <>
      <Meta seo={data?.general} />
      <div className="min-h-screen">
        <Navigation menu={menu} />
        {children}
        <Footer
          data={footer}
          custom={{ gtm_reference: "footer", subscribe: data.subscribe }}
        />
      </div>
    </>
  );
};
