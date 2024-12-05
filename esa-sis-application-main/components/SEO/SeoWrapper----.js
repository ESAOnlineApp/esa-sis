/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: components\SEO\SeoWrapper.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import { PageSEO } from 'next-seo';

// const SeoWrapper = ({ title, description, imageURL, URL }) => {
export default function SeoWrapper({ title, description, imageURL, URL }) {
  <>
    <PageSEO
      title={title}
      description={description}
      openGraph={{
        type: 'website',
        locale: 'en_US',
        url: URL,
        title,
        description,
        images: [
          {
            url: imageURL,
            alt: title,
          },
        ],
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
    {/* <SEO
      title={title}
      description={description}
      openGraph={{
        type: 'website',
        locale: 'en_US',
        url: `https://www.example.com${router.asPath}`,
        title,
        description,
        images: [
          {
            url: `https://www.example.com${image}`,
            alt: title,
          },
        ],
      }}
    /> */}
  </>;
}

// export default SeoWrapper;
