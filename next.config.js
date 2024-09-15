/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   // this is technically deprecated but works perfectly.
  //   // if you'd like to see the remotePatterns version, I'm happy to merge a PR
  //   domains: [
  //     "localhost",
  //     "powerpharma.up.railway.app",
  //   ],
  // },
  images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "digitalhippo-production.up.railway.app",
			},
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
			},
		],
	},
};

module.exports = nextConfig;
