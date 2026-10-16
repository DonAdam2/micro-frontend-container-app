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
  /*remote apps hosted in the current app (key = remote app name defined in its ModuleFederationPlugin)
  to add a new remote app, add it here then use it with <RemoteComponent remote="remote_name/ExposedModule" />*/
  remotes: {
    inner_app: {
      devUrl: 'http://localhost:3001',
      prodUrl: 'http://localhost:8081',
    },
  },
  metaInfo: {
    //max 60 (recommended)
    title: 'Container app',
    //max 150 (recommended)
    description: 'description',
    url: 'https://example.com',
    keywords: 'add you keywords',
  },
};
