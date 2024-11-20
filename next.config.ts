import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.ubuy.com.ar', 
            'i.ebayimg.com', 
            'media.adeo.com', 
            'www.asus.com', 
            'cdn-xiaomi.waugi.com.ar',
            'example.com',
            'audioimport.com.ar',
            'http2.mlstatic.com',
            'fullh4rd.com.ar',
            'd2eebw31vcx88p.cloudfront.net' ]
  },
};

export default nextConfig;