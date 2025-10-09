/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // permite ejecutar en servidor Node (clave para producción)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // evita dependencias adicionales de imagen
  },
  poweredByHeader: false, // seguridad
  reactStrictMode: true,
  compress: true, // activa compresión gzip
}

export default nextConfig
