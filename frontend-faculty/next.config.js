/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_ENDPOINT:
      "http://educonnect-env.eba-p5y9t5fc.us-west-2.elasticbeanstalk.com/",
  },
};

module.exports = nextConfig;
