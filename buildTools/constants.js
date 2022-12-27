const protocol = process.env.HTTPS?.trim() === 'true' ? 'https' : 'http';

module.exports = {
  port: 3000,
  devServer: `${protocol}://localhost`,
  rootDirectory: 'src',
  publicDirectory: 'public',
  outputDirectory: 'dist',
  environmentsDirectory: 'environments',
  jsSubDirectory: 'js/',
  cssSubDirectory: 'css/',
  isCssModules: false,
  remoteDevUrl: 'http://localhost:3001',
  remoteProdUrl: 'http://localhost:8081',
  metaInfo: {
    //max 60 (recommended)
    title: 'Container app',
    //max 150 (recommended)
    description: 'description',
    url: 'https://example.com',
    keywords: 'add you keywords',
  },
};
